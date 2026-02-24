// Simple Markdown frontmatter parser — zero packages needed
// Parses YAML-like frontmatter between --- delimiters

export interface MarkdownPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
}

// Parse frontmatter from a markdown string
export function parseFrontmatter(raw: string): {
  data: Record<string, string>;
  content: string;
} {
  const data: Record<string, string> = {};

  if (!raw.startsWith("---")) {
    return { data, content: raw };
  }

  const endIndex = raw.indexOf("---", 3);
  if (endIndex === -1) {
    return { data, content: raw };
  }

  const frontmatter = raw.slice(3, endIndex).trim();
  const content = raw.slice(endIndex + 3).trim();

  // Parse simple YAML key: value pairs
  for (const line of frontmatter.split("\n")) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // Remove surrounding quotes if present
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    data[key] = value;
  }

  return { data, content };
}

// Convert markdown content to paragraphs
export function markdownToParas(md: string): string[] {
  return md
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
}
