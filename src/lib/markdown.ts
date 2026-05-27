import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const newsDirectory = path.join(process.cwd(), "content/news");

export interface NewsPost {
  slug: string;
  title: string;
  date: string;
  category?: string;
  excerpt?: string;
  content: string;
}

export function getAllNews(): Omit<NewsPost, "content">[] {
  if (!fs.existsSync(newsDirectory)) return [];

  const fileNames = fs.readdirSync(newsDirectory);
  const posts = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(newsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        category: data.category as string | undefined,
        excerpt: data.excerpt as string | undefined,
      };
    });

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function getNewsBySlug(slug: string): Promise<NewsPost | null> {
  const fullPath = path.join(newsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    category: data.category as string | undefined,
    excerpt: data.excerpt as string | undefined,
    content: contentHtml,
  };
}

export function getAllNewsSlugs(): string[] {
  if (!fs.existsSync(newsDirectory)) return [];

  return fs
    .readdirSync(newsDirectory)
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.replace(/\.md$/, ""));
}
