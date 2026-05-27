import type { Metadata } from "next";
import Link from "next/link";
import { getAllNews } from "@/lib/markdown";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "ニュース",
  description: "Unitryの最新のお知らせ・活動報告をお届けします。",
};

export default function NewsPage() {
  const posts = getAllNews();

  return (
    <>
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-dark text-white">
        <div className="mx-auto max-w-4xl text-center">
          <FadeIn direction="none">
            <p className="text-sm tracking-widest uppercase text-white/50 mb-3">News</p>
            <h1 className="text-4xl md:text-5xl font-bold">ニュース</h1>
          </FadeIn>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {posts.length === 0 ? (
            <p className="text-center text-gray">まだニュースはありません。</p>
          ) : (
            <div className="space-y-1">
              {posts.map((post, i) => (
                <FadeIn key={post.slug} delay={i * 0.08}>
                  <Link
                    href={`/news/${post.slug}`}
                    className="block py-6 border-b border-dark/10 hover:bg-gray-light/50 transition-colors px-4 -mx-4 rounded"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                      <time className="text-sm text-gray">{post.date}</time>
                      {post.category && (
                        <span className="inline-block px-2 py-0.5 text-xs bg-primary/10 text-primary rounded w-fit">
                          {post.category}
                        </span>
                      )}
                    </div>
                    <h2 className="text-lg font-semibold hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mt-1 text-sm text-dark/60 line-clamp-2">{post.excerpt}</p>
                    )}
                  </Link>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
