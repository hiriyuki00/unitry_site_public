import type { ReactNode } from "react";
import Link from "next/link";
import { activityNavItems } from "@/data/activity-nav";

const icons: Record<(typeof activityNavItems)[number]["label"], ReactNode> = {
  映像制作: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  ),
  イベントへの出店: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  ),
  学校でのワークショップ: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824 2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
      />
    </svg>
  ),
};

type ActivityNavCardsProps = {
  className?: string;
  linkLabel?: string;
};

export default function ActivityNavCards({
  className = "",
  linkLabel = "詳しく見る",
}: ActivityNavCardsProps) {
  return (
    <div className={`grid grid-cols-1 gap-6 sm:grid-cols-3 ${className}`}>
      {activityNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group flex aspect-square flex-col items-center justify-center rounded-xl border border-dark/10 bg-gray-light p-6 text-center shadow-sm transition-all hover:border-primary/40 hover:bg-white hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
            {icons[item.label]}
          </div>
          <h3 className="mt-4 text-base font-semibold text-dark transition-colors group-hover:text-primary sm:text-lg">
            {item.label}
          </h3>
          <p className="mt-2 line-clamp-3 px-1 text-xs leading-relaxed text-dark/60 sm:text-sm">
            {item.description}
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
            {linkLabel}
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}
