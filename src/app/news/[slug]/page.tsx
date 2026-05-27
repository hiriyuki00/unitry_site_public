import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNewsBySlug, getAllNewsSlugs } from "@/lib/markdown";
import FadeIn from "@/components/FadeIn";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt || post.title,
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-dark text-white">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn direction="none">
            <Link
              href="/news"
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              &larr; ニュース一覧に戻る
            </Link>
            <div className="mt-4 flex items-center justify-center gap-4">
              <time className="text-sm text-white/50">{post.date}</time>
              {post.category && (
                <span className="text-xs px-2 py-0.5 bg-primary/20 text-primary rounded">
                  {post.category}
                </span>
              )}
            </div>
            <h1 className="mt-3 text-3xl md:text-4xl font-bold">{post.title}</h1>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <article
              className="article-rich max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
