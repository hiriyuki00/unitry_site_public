import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import SectionTitle from "@/components/SectionTitle";

const CAMPFIRE_URL = process.env.NEXT_PUBLIC_CAMPFIRE_URL || "";

export const metadata: Metadata = {
  title: "ご支援",
  description:
    "Unitryの活動をクラウドファンディングで応援してください。映像制作を通じた交流プロジェクトへのご支援をお待ちしています。",
};

export default function SupportPage() {
  return (
    <>
      {/* Page header */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-dark text-white">
        <div className="mx-auto max-w-4xl text-center">
          <FadeIn direction="none">
            <p className="text-sm tracking-widest uppercase text-white/50 mb-3">Support</p>
            <h1 className="text-4xl md:text-5xl font-bold">ご支援</h1>
          </FadeIn>
        </div>
      </section>

      {/* Message */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-lg leading-relaxed text-dark/80">
                Unitryは映像制作を通じて、大学生と子どもたちの交流を生み出し、
                <br></br>地域社会の絆を深める活動を行っています。
                <br />
                この活動を継続・発展させていくために、皆さまのご支援をお願いしています。
              </p>
            </div>
          </FadeIn>

          {/* How funds are used */}
          <SectionTitle title="ご支援の使い道" subtitle="How We Use" />
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  ),
                  title: "映像制作費",
                  desc: "機材のレンタル、撮影・編集に関わる費用に充てさせていただきます。",
                },
                {
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
                  title: "交流イベント運営費",
                  desc: "若者と地域の人々の交流の場をつくる運営費用です。",
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ),
                  title: "活動の継続・発展",
                  desc: "今後のプロジェクトの企画・運営にも活用させていただきます。",
                },
              ].map((item, i) => (
                <div key={i} className="text-center p-6 bg-gray-light rounded-lg">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-dark/60 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* CAMPFIRE Section */}
          <SectionTitle title="クラウドファンディング" subtitle="CAMPFIRE" />
          <FadeIn>
            {CAMPFIRE_URL ? (
              <div className="rounded-lg border border-dark/10 bg-gray-light p-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-dark">CAMPFIRE で応援する</h3>
                <p className="text-dark/60 mb-6 max-w-md mx-auto text-sm leading-relaxed">
                  CAMPFIRE のページはボタンを押すと、別ページで開かれます
                </p>
                <a
                  href={CAMPFIRE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-5 py-2.5 text-sm sm:px-8 sm:py-3 sm:text-base bg-primary text-white font-medium rounded hover:bg-primary-dark transition-colors"
                >
                  プロジェクトページを開く
                </a>
              </div>
            ) : (
              <div className="rounded-lg border border-dark/10 overflow-hidden">
                <div className="bg-gray-light p-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">CAMPFIRE で応援する</h3>
                  <p className="text-dark/60 mb-6">
                    クラウドファンディングページは準備中です。
                    <br />
                    公開後、こちらからプロジェクトをご覧いただけます。
                  </p>
                  <a
                    href="https://camp-fire.jp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-5 py-2.5 text-sm sm:px-8 sm:py-3 sm:text-base bg-primary text-white font-medium rounded hover:bg-primary-dark transition-colors"
                  >
                    CAMPFIRE を見る
                  </a>
                  <p className="mt-4 text-xs text-gray">
                    CAMPFIRE の URL が設定され次第、プロジェクトページが表示されます
                  </p>
                </div>
              </div>
            )}
          </FadeIn>

          {/* Other ways to support */}
          <FadeIn delay={0.2}>
            <div className="mt-16 text-center p-8 bg-gray text-white rounded-lg">
              <h3 className="text-xl font-semibold mb-3">その他のご支援方法</h3>
              <p className="text-white/70 leading-relaxed mb-6">
                クラウドファンディング以外にも、ボランティア参加や協賛など、
                <br />
                さまざまな形でのご支援をお待ちしています。
              </p>
              <Link
                href="/contact"
                className="inline-block px-5 py-2.5 text-sm sm:px-8 sm:py-3 sm:text-base bg-primary text-white font-medium rounded hover:bg-primary-dark transition-colors"
              >
                お問い合わせはこちら
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
