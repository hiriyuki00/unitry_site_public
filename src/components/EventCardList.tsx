import Link from "next/link";
import type { UnitryEvent } from "@/data/events";
import { eventsListingGridClass } from "@/data/events";
import FadeIn from "@/components/FadeIn";

interface EventCardListProps {
  items: UnitryEvent[];
  /** 過去イベント一覧では終了バッジを表示 */
  showPastBadge?: boolean;
}

export default function EventCardList({ items, showPastBadge = false }: EventCardListProps) {
  if (items.length === 0) return null;

  return (
    <div className={eventsListingGridClass(items.length)}>
      {items.map((ev, i) => (
        <FadeIn key={ev.id} delay={i * 0.1}>
          <Link
            href={`/works/events/${ev.id}`}
            className="group flex h-full flex-col rounded-lg border border-dark/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md hover:border-primary/20"
          >
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray">
              <span className="font-medium text-primary whitespace-pre-line">{ev.dateLabel}</span>
              {showPastBadge ? (
                <span className="rounded bg-dark/10 px-2 py-0.5 text-dark/60">終了</span>
              ) : null}
              {ev.category ? (
                <span className="rounded bg-primary/10 px-2 py-0.5 text-primary">
                  {ev.category}
                </span>
              ) : null}
            </div>
            <h2 className="mt-3 text-xl font-semibold text-dark group-hover:text-primary transition-colors">
              {ev.title}
            </h2>
            {ev.venue ? <p className="mt-2 text-sm text-dark/50">{ev.venue}</p> : null}
            <p className="mt-3 text-sm leading-relaxed text-dark/70 line-clamp-3 flex-1">
              {ev.summary}
            </p>
            <p className="mt-4 text-sm font-medium text-primary group-hover:underline">
              詳しく見る &rarr;
            </p>
          </Link>
        </FadeIn>
      ))}
    </div>
  );
}
