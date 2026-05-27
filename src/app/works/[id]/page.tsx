import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { works, getWork } from "@/data/works";
import FadeIn from "@/components/FadeIn";
import WorkVideoEmbed from "@/components/WorkVideoEmbed";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return works.map((work) => ({ id: work.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const work = getWork(id);
  if (!work) return {};
  return {
    title: work.title,
    description: work.description,
  };
}

export default async function WorkDetailPage({ params }: Props) {
  const { id } = await params;
  const work = getWork(id);
  if (!work) notFound();

  return (
    <>
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-dark text-white">
        <div className="mx-auto max-w-4xl text-center">
          <FadeIn direction="none">
            <Link
              href="/works"
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              &larr; 作品・イベント一覧に戻る
            </Link>
            <h1 className="mt-4 text-3xl md:text-4xl font-bold">{work.title}</h1>
            <div className="mt-4 flex items-center justify-center gap-4">
              {work.category && (
                <span className="text-xs px-2 py-0.5 bg-primary/20 text-primary rounded">
                  {work.category}
                </span>
              )}
              <span className="text-sm text-white/50">{work.year}</span>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* YouTube embed */}
          <FadeIn>
            <WorkVideoEmbed youtubeId={work.youtubeId} title={work.title} />
          </FadeIn>

          {/* Description */}
          <FadeIn delay={0.2}>
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4">作品について</h2>
              <p className="text-lg leading-relaxed text-dark/80">{work.description}</p>
            </div>
          </FadeIn>

          {/* Theme · Locations · Supporters */}
          <div className="mt-12 space-y-8">
            {work.theme ? (
              <FadeIn delay={0.25}>
                <div className="rounded-lg border border-dark/10 bg-gray-light p-6 md:p-8">
                  <h2 className="text-lg font-semibold text-dark mb-3">テーマ</h2>
                  <p className="text-base leading-relaxed text-dark/80">{work.theme}</p>
                </div>
              </FadeIn>
            ) : null}

            {work.locations && work.locations.length > 0 ? (
              <FadeIn delay={0.3}>
                <div className="rounded-lg border border-dark/10 bg-gray-light p-6 md:p-8">
                  <h2 className="text-lg font-semibold text-dark mb-3">撮影地</h2>
                  <ul className="list-inside list-disc space-y-2 text-dark/80 leading-relaxed marker:text-primary">
                    {work.locations.map((loc) => (
                      <li key={loc}>{loc}</li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ) : null}

            {work.crowdfundingSupporters && work.crowdfundingSupporters.length > 0 ? (
              <FadeIn delay={0.35}>
                <div className="rounded-lg border border-dark/10 p-6 md:p-8">
                  <h2 className="text-lg font-semibold text-dark mb-2">
                    ご支援およびご協力いただいた皆様
                  </h2>
                  <p className="mb-4 text-sm text-dark/60 leading-relaxed">
                    本プロジェクトは多くの皆様のご支援・協力により実現しました。（順不同・敬称略）
                  </p>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-dark/80 leading-relaxed">
                    {work.crowdfundingSupporters.map((name, i) => (
                      <li key={`supporter-${i}-${name}`} className="flex gap-2">
                        <span className="text-primary shrink-0">・</span>
                        <span>{name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
