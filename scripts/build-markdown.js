// Generates a .md sibling for each page's .html, for agents that send
// Accept: text/markdown (see nginx-agents.conf). Mirrors the shape of
// Cloudflare's "Markdown for Agents": YAML frontmatter, cleaned body
// markdown, then any JSON-LD blocks fenced at the end.
'use strict';

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const ROOT = path.join(__dirname, '..');
const SITE_URL = 'https://www.anteam.ai';

const SKIP_FILES = new Set(['contact.php']);
const STRIP_SELECTORS = [
  'nav', 'footer', 'form', 'script', 'style', 'svg', 'button',
  '#mobile-nav', '#toast', '#reading-progress', 'noscript', 'link',
  '[aria-hidden="true"]',
];

function yamlEscape(str) {
  return String(str || '').replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function absoluteUrl(href, base) {
  try {
    return new URL(href, base).toString();
  } catch {
    return href;
  }
}

// Minimal inline-markup serializer for the limited tag set this site uses.
function inline($, el, baseUrl) {
  const node = $(el);
  let out = '';
  node.contents().each((_, child) => {
    if (child.type === 'text') {
      out += child.data.replace(/\s+/g, ' ');
      return;
    }
    if (child.type !== 'tag') return;
    const tag = child.tagName;
    const inner = inline($, child, baseUrl);
    if (tag === 'a') {
      const href = absoluteUrl($(child).attr('href') || '', baseUrl);
      out += `[${inner.trim()}](${href})`;
    } else if (tag === 'strong' || tag === 'b') {
      out += `**${inner.trim()}**`;
    } else if (tag === 'em' || tag === 'i') {
      out += `*${inner.trim()}*`;
    } else if (tag === 'br') {
      out += ' ';
    } else if (tag === 'sub' || tag === 'sup') {
      out += inner;
    } else if (tag === 'img') {
      out += ($(child).attr('alt') || '').trim();
    } else if (tag === 'span') {
      // Spans on this site are used as label/chip boundaries, not inline
      // emphasis, so keep them from running into whatever came before.
      if (out && !/\s$/.test(out)) out += ' ';
      out += inner;
    } else {
      out += inner;
    }
  });
  return out;
}

// Block-level tag names that mean "keep recursing, this is structural."
const BLOCK_CHILD_TAGS = new Set([
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'ul', 'ol', 'table',
  'details', 'div', 'section', 'article', 'main', 'header', 'img',
]);

function hasBlockChild($, el) {
  return $(el).children().toArray().some((c) => BLOCK_CHILD_TAGS.has(c.tagName));
}

// inline() only applies a tag's own formatting (link, bold, ...) while
// walking a parent's contents, not to the element passed in as the root.
// Wrap a "child treated as a leaf item" in a throwaway parent so its own
// tag gets that treatment too.
function inlineSelf($, el, baseUrl) {
  const wrapper = $('<span>').append($(el).clone());
  return inline($, wrapper[0], baseUrl);
}

// A container with no block-level children is just text/inline markup
// (e.g. a bare stat <div>10+</div>, or two <span> siblings side by side).
// Render it as a single line, joining multiple direct inline children with
// an em dash so label/value or component/description pairs stay readable.
function leafText($, el, baseUrl) {
  const inlineChildren = $(el).children().toArray()
    .filter((c) => !BLOCK_CHILD_TAGS.has(c.tagName));
  if (inlineChildren.length >= 2) {
    return inlineChildren
      .map((c) => inlineSelf($, c, baseUrl).trim())
      .filter(Boolean)
      .join(' — ');
  }
  return inline($, el, baseUrl).trim();
}

function block($, el, baseUrl, headingOffset = 0) {
  const lines = [];
  $(el).children().each((_, child) => {
    if (child.type !== 'tag') return;
    const $child = $(child);
    const tag = child.tagName;

    if (/^h[1-6]$/.test(tag)) {
      const level = Math.min(6, parseInt(tag[1], 10) + headingOffset);
      lines.push(`${'#'.repeat(level)} ${inline($, child, baseUrl).trim()}`, '');
    } else if (tag === 'p') {
      const text = inline($, child, baseUrl).trim();
      if (!text) return;
      if ($child.hasClass('faq-question')) {
        lines.push(`**${text}**`, '');
      } else {
        lines.push(text, '');
      }
    } else if (tag === 'ul' || tag === 'ol') {
      $child.children('li').each((i, li) => {
        const prefix = tag === 'ol' ? `${i + 1}.` : '-';
        lines.push(`${prefix} ${inline($, li, baseUrl).trim()}`);
      });
      lines.push('');
    } else if (tag === 'table') {
      const headers = [];
      $child.find('thead th').each((_, th) => headers.push(inline($, th, baseUrl).trim()));
      if (headers.length) {
        lines.push(`| ${headers.join(' | ')} |`);
        lines.push(`| ${headers.map(() => '---').join(' | ')} |`);
      }
      $child.find('tbody tr').each((_, tr) => {
        const cells = [];
        $(tr).find('td').each((_, td) => cells.push(inline($, td, baseUrl).trim()));
        if (cells.length) lines.push(`| ${cells.join(' | ')} |`);
      });
      lines.push('');
    } else if (tag === 'img') {
      const alt = $child.attr('alt') || '';
      const src = absoluteUrl($child.attr('src') || '', baseUrl);
      lines.push(`![${alt}](${src})`, '');
    } else if (tag === 'summary') {
      const text = leafText($, child, baseUrl);
      if (text) lines.push(`**${text}**`, '');
    } else if (['div', 'section', 'article', 'main', 'header', 'details'].includes(tag)) {
      if (hasBlockChild($, child) || $child.children('summary').length) {
        lines.push(...block($, child, baseUrl, headingOffset));
      } else {
        const text = leafText($, child, baseUrl);
        if (text) lines.push(text, '');
      }
    }
  });
  return lines;
}

function convertPage(htmlPath) {
  const html = fs.readFileSync(htmlPath, 'utf8');
  const $ = cheerio.load(html);

  const title = $('title').first().text().trim();
  const description = $('meta[name="description"]').attr('content') || '';
  const canonical = $('link[rel="canonical"]').attr('href')
    || `${SITE_URL}/${path.basename(htmlPath)}`;

  const jsonLdBlocks = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    const raw = $(el).contents().text().trim();
    if (raw) jsonLdBlocks.push(raw);
  });

  STRIP_SELECTORS.forEach((sel) => $(sel).remove());

  const bodyLines = block($, $('body')[0], canonical);
  // Collapse 3+ blank lines down to 1.
  const body = bodyLines.join('\n').replace(/\n{3,}/g, '\n\n').trim();

  const frontmatter = [
    '---',
    `title: "${yamlEscape(title)}"`,
    `description: "${yamlEscape(description)}"`,
    `url: "${canonical}"`,
    '---',
    '',
  ].join('\n');

  const jsonLdSection = jsonLdBlocks.length
    ? `\n\n\`\`\`json\n${jsonLdBlocks.join('\n\n')}\n\`\`\`\n`
    : '\n';

  return frontmatter + body + jsonLdSection;
}

function main() {
  const files = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html') && !SKIP_FILES.has(f));
  let count = 0;
  for (const file of files) {
    const htmlPath = path.join(ROOT, file);
    const mdPath = path.join(ROOT, file.replace(/\.html$/, '.md'));
    const markdown = convertPage(htmlPath);
    fs.writeFileSync(mdPath, markdown);
    count += 1;
  }
  console.log(`Generated ${count} markdown file(s).`);
}

main();
