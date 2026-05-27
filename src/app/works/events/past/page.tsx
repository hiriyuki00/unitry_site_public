import type { Metadata } from "next";
import Link from "next/link";
import { getPastEvents } from "@/data/events";
import EventCardList from "@/components/EventCardList";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "過去の上映会・イベント",
  description: "Unitryがこれまでに開催した上映会・イベントの一覧です。",
};

export default function PastEventsPage() {
  const pastEvents = getPastEvents();
  const count = pastEvents.length;

  return (
    <>
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-dark text-white">
        <div className="mx-auto max-w-4xl text-center">
          <FadeIn direction="none">
            <Link
              href="/works#events"
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              &larr; 上映会・イベント一覧に戻る
            </Link>
            <p className="mt-4 text-sm tracking-widest uppercase text-white/50">Past Events</p>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold">過去の上映会・イベント</h1>
            <p className="mt-6 text-white/70 leading-relaxed max-w-2xl mx-auto">
              これまでに開催した上映会やトークイベントなどの記録です。
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-light">
        <div className="mx-auto max-w-6xl">
          {count > 0 ? (
            <>
              <FadeIn>
                <p className="mb-10 text-center text-dark/70 leading-relaxed">
                  掲載中の過去イベントは <strong className="text-dark">{count}件</strong> です。
                </p>
              </FadeIn>
              <EventCardList items={pastEvents} showPastBadge />
            </>
          ) : (
            <FadeIn>
              <p className="text-center text-dark/60 leading-relaxed">
                過去のイベント情報はまだありません。開催後、順次こちらに掲載します。
              </p>
            </FadeIn>
          )}

          <FadeIn delay={0.2} className="mt-12 text-center">
            <Link
              href="/works#events"
              className="inline-block px-8 py-3 border border-dark/20 rounded font-medium hover:bg-dark hover:text-white transition-colors"
            >
              開催予定のイベントを見る
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
