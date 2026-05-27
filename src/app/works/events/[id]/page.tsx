import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { events, getEvent, isPastEvent } from "@/data/events";
import FadeIn from "@/components/FadeIn";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return events.map((e) => ({ id: e.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const ev = getEvent(id);
  if (!ev) return {};
  return {
    title: ev.title,
    description: ev.summary,
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;
  const ev = getEvent(id);
  if (!ev) notFound();

  const past = isPastEvent(ev);
  const backHref = past ? "/works/events/past" : "/works#events";
  const backLabel = past ? "過去のイベント一覧に戻る" : "上映・イベント一覧に戻る";
  const d = ev.details;

  return (
    <>
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-dark text-white">
        <div className="mx-auto max-w-4xl text-center">
          <FadeIn direction="none">
            <Link
              href={backHref}
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              &larr; {backLabel}
            </Link>
            <p className="mt-4 text-sm text-white/50 whitespace-pre-line">{ev.dateLabel}</p>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold">{ev.title}</h1>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              {past ? (
                <span className="text-xs px-2 py-0.5 bg-white/20 text-white/80 rounded">
                  終了
                </span>
              ) : null}
              {ev.category && (
                <span className="text-xs px-2 py-0.5 bg-primary/20 text-primary rounded">
                  {ev.category}
                </span>
              )}
              {ev.venue ? (
                <span className="text-sm text-white/60">{ev.venue}</span>
              ) : null}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <div className="space-y-10 text-dark/80">
              {d ? (
                <>
                  {d.lead ? <p className="text-lg leading-relaxed">{d.lead}</p> : null}

                  {d.overview && d.overview.length > 0 ? (
                    <section>
                      <h2 className="text-xl font-semibold text-dark">イベント概要</h2>
                      <ul className="mt-4 space-y-2 text-base leading-relaxed">
                        {d.overview.map((item, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ) : null}

                  {d.schedule && d.schedule.length > 0 ? (
                    <section>
                      <h2 className="text-xl font-semibold text-dark">当日の流れ</h2>
                      <ol className="mt-4 space-y-2 text-base leading-relaxed list-decimal pl-5">
                        {d.schedule.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ol>
                    </section>
                  ) : null}

                  {(d.meetingPoint || d.target?.length || d.capacity || d.fee || d.bringItems?.length) ? (
                    <section>
                      <h2 className="text-xl font-semibold text-dark">参加情報</h2>
                      <div className="mt-4 rounded-lg border border-dark/10 bg-gray-light p-5 text-base">
                        {d.meetingPoint ? (
                          <p className="mb-3">
                            <span className="font-medium text-dark">待ち合わせ場所</span>: {d.meetingPoint}
                          </p>
                        ) : null}
                        {d.target && d.target.length > 0 ? (
                          <div className="mb-3">
                            <p className="font-medium text-dark">対象</p>
                            <ul className="mt-1 space-y-1">
                              {d.target.map((item, i) => (
                                <li key={i}>・{item}</li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                        {d.capacity ? (
                          <p className="mb-2">
                            <span className="font-medium text-dark">定員</span>: {d.capacity}
                          </p>
                        ) : null}
                        {d.fee ? (
                          <p className="mb-2">
                            <span className="font-medium text-dark">参加費</span>: {d.fee}
                          </p>
                        ) : null}
                        {d.bringItems && d.bringItems.length > 0 ? (
                          <p>
                            <span className="font-medium text-dark">持ち物</span>: {d.bringItems.join(" / ")}
                          </p>
                        ) : null}
                      </div>
                    </section>
                  ) : null}

                  {d.notes && d.notes.length > 0 ? (
                    <section>
                      <h2 className="text-xl font-semibold text-dark">注意事項</h2>
                      <ul className="mt-4 space-y-2 text-base leading-relaxed">
                        {d.notes.map((item, i) => (
                          <li key={i}>・{item}</li>
                        ))}
                      </ul>
                    </section>
                  ) : null}

                  {d.contact ? (
                    <section className="rounded-lg border border-primary/20 bg-primary/5 p-5">
                      <h2 className="text-lg font-semibold text-dark">お問い合わせ</h2>
                      <p className="mt-2 text-base leading-relaxed">{d.contact}</p>
                    </section>
                  ) : null}
                </>
              ) : (
                <div className="space-y-6 text-lg leading-relaxed">
                  {ev.description.split(/\n\n+/).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              )}
            </div>
          </FadeIn>

          {ev.externalUrl ? (
            <FadeIn delay={0.15}>
              <div className="mt-10 text-center">
                <a
                  href={ev.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-5 py-2.5 text-sm sm:px-8 sm:py-3 sm:text-base bg-primary text-white font-medium rounded hover:bg-primary-dark transition-colors"
                >
                  詳細・お申し込み（外部サイト）
                </a>
              </div>
            </FadeIn>
          ) : null}
        </div>
      </section>
    </>
  );
}
