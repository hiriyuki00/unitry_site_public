import Image from "next/image";
import Link from "next/link";
import { activityNavItems } from "@/data/activity-nav";

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
          className="group flex flex-col overflow-hidden rounded-xl border border-dark/10 bg-white text-center shadow-sm transition-all hover:border-primary/40 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:aspect-square sm:bg-gray-light sm:hover:bg-white"
        >
          <div className="relative aspect-[16/10] w-full shrink-0 sm:aspect-auto sm:min-h-[42%] sm:flex-1">
            <Image
              src={item.image}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-dark/50 via-dark/10 to-transparent"
              aria-hidden
            />
          </div>

          <div className="flex flex-col items-center justify-center p-4 sm:flex-1 sm:p-5">
            <h3 className="text-base font-semibold text-dark transition-colors group-hover:text-primary sm:text-lg">
              {item.label}
            </h3>
            <p className="mt-1.5 line-clamp-2 px-1 text-xs leading-relaxed text-dark/60 sm:mt-2 sm:line-clamp-3 sm:text-sm">
              {item.description}
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary sm:mt-4">
              {linkLabel}
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
