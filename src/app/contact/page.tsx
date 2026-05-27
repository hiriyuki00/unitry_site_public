import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "Unitryへのお問い合わせ・ボランティア参加のご相談はこちらからお気軽にどうぞ。",
};

const inquiryCards = [
  {
    href: "/contact/volunteer",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    title: "ボランティア参加",
    desc: "映像制作の経験は問いません。一緒に活動しませんか？",
  },
  {
    href: "/contact/sponsor",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "協賛・協力",
    desc: "活動を支援してくださるパートナーを募集しています。",
  },
  {
    href: "/contact/other",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "その他",
    desc: "活動に関するご質問など、何でもお気軽にどうぞ。",
  },
] as const;

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-dark text-white">
        <div className="mx-auto max-w-4xl text-center">
          <FadeIn direction="none">
            <p className="text-sm tracking-widest uppercase text-white/50 mb-3">Contact</p>
            <h1 className="text-4xl md:text-5xl font-bold">お問い合わせ</h1>
          </FadeIn>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <p className="text-lg text-center leading-relaxed text-dark/80 mb-4">
              お問い合わせの内容に合わせて、次のいずれかを選んでください。
            </p>
            <p className="text-sm text-center text-dark/60 mb-12">
              クリックすると、該当する Google フォームの入力画面へ進みます。
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {inquiryCards.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex flex-col text-center rounded-xl border border-dark/10 bg-gray-light p-6 shadow-sm transition-all hover:border-primary/40 hover:bg-white hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    {item.icon}
                  </div>
                  <h2 className="mt-4 text-lg font-semibold text-dark group-hover:text-primary transition-colors">
                    {item.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-dark/60 leading-relaxed">{item.desc}</p>
                  <span className="mt-5 inline-flex items-center justify-center gap-1 text-sm font-medium text-primary">
                    フォームへ進む
                    <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
