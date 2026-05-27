import type { Metadata } from "next";
import Image from "next/image";
import { members } from "@/data/members";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import SectionTitle from "@/components/SectionTitle";
import { activityNavItems } from "@/data/activity-nav";

export const metadata: Metadata = {
  title: "団体について",
  description:
    "Unitryの理念・ミッションとメンバー紹介。活動を通じて交流を紡ぎ、地域社会の絆を深めます。",
};

export default function AboutPage() {
  return (
    <>
      {/* Page header */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-dark text-white">
        <div className="mx-auto max-w-4xl text-center">
          <FadeIn direction="none">
            <p className="text-sm tracking-widest uppercase text-white/50 mb-3">About</p>
            <h1 className="text-4xl md:text-5xl font-bold">団体について</h1>
          </FadeIn>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionTitle title="理念・ミッション" subtitle="Philosophy & Mission" />

          <FadeIn>
            <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-dark/80">
              <p>
                Unitryは、
                <span className="text-primary font-semibold">「協働」「交流」「場」</span>
                を理念に掲げ、千葉県我孫子市を拠点に活動する団体です。
              </p>
              <p>
                若者と地域の人々が自然に出会い、対話する場をつくっています。映像制作や地域ボランティアをともに進めるなかで世代を超えたつながりが生まれ、互いに影響し合いながら少しずつ変わっていく——その
                <span className="text-primary font-semibold">「変容」</span>
                を大切にしています。
              </p>
            </div>
          </FadeIn>

          {/* Values（3枚：2列だと1枚だけ余るため、md 以上は3列・親は max-w-5xl） */}
          <FadeIn delay={0.2}>
            <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  title: "交流が生む変容",
                  desc: "若者と地域の人々の交流を通じて、人々の変容と地域の活性化を大切にします。",
                },
                {
                  title: "若者の可能性を広げる",
                  desc: "多様な大人との出会いが、若者の生きづらさを和らげる一歩になると考えています。",
                },
                {
                  title: "地域社会の未来へ",
                  desc: "子どもからお年寄りまで、幅広い世代の関わりを促し、地域の未来を共に描きます。",
                },
              ].map((value, i) => (
                <div
                  key={i}
                  className="flex h-full flex-col rounded-lg bg-gray-light p-6"
                >
                  <h3 className="text-lg font-semibold text-dark">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-dark/70">{value.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="relative mx-auto mt-16 max-w-3xl overflow-hidden rounded-lg border border-dark/10">
              <Image
                src="/images/HP_aboutUs.png"
                alt=""
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 768px"
              />
              <div
                className="absolute inset-0 bg-white/68 md:bg-white/45"
                aria-hidden
              />
              <div className="relative z-10 p-8 md:p-10">
                <h3 className="text-xl font-semibold text-dark mb-4">私たちの想い</h3>
                <div className="space-y-4 text-lg leading-relaxed text-dark/80">
                  <p>
                    子どもの生きづらさの解消に向き合い続ける中で、私たちはひとつの可能性にたどり着きました。それは、
                    <span className="font-semibold text-dark">
                      多様な大人と出会い、会話し、対話すること
                    </span>
                    です。
                  </p>
                  <p>
                    様々なプロジェクトを通じて、若者が地域の人々と出会い、対話する環境をつくりたい。そして、その中で生まれたつながりが、活動が終わった後も子どもたちの中に残り続けることを願っています。
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* Activity */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-light">
        <div className="mx-auto max-w-5xl">
          <SectionTitle title="活動内容" subtitle="Activity" />
          <FadeIn>
            <p className="mx-auto mb-12 max-w-2xl text-center text-dark/70 leading-relaxed">
              Unitryの活動は、映像制作・イベントへの出店・学校でのワークショップの<br></br>3つを柱に進めています。
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <FadeIn delay={0.1}>
              <div className="h-full rounded-lg border border-dark/10 bg-white p-8">
                <h3 className="text-xl font-semibold text-dark">映像制作</h3>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-dark/80">
                  <p>
                    我孫子市は「ロケのまち」としても知られ、多くの映像作品のロケ地となってきました。この地域の特色を活かし、我孫子を題材にした映像作品を制作しています。
                  </p>
                  <p>
                    若者と地域の人々が関わりながら企画・撮影・編集を進めることで、地域に大学があることの価値を伝え、まちの魅力を映像として残すことを目指しています。
                  </p>
                </div>
                <Link
                  href={activityNavItems[0].href}
                  className="mt-6 inline-block text-sm font-medium text-primary hover:underline"
                >
                  活動内容を見る →
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="flex h-full flex-col rounded-lg border border-dark/10 bg-white p-8">
                <h3 className="text-xl font-semibold text-dark">イベントへの出店</h3>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-dark/80">
                  <p>
                    制作した作品の上映会や、地域の方々とつながる交流イベントを開催しています。映画を通じて、これまで出会う機会の少なかった世代や立場の人々が同じ場に集まる場をつくります。
                  </p>
                  <p>
                    映像制作やイベント運営には、多くのボランティアの協力が欠かせません。撮影・編集のサポートから当日運営まで、さまざまな形での参加を歓迎しています。
                  </p>
                </div>
                <Link
                  href={activityNavItems[1].href}
                  className="mt-6 inline-block text-sm font-medium text-primary hover:underline"
                >
                  活動内容を見る →
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="flex h-full flex-col rounded-lg border border-dark/10 bg-white p-8">
                <h3 className="text-xl font-semibold text-dark">学校でのワークショップ</h3>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-dark/80">
                  <p>
                    地域の学校を訪問し、映像制作や対話をテーマにしたワークショップを行っています。撮影体験や映像でのPRを通じて、若者が表現することの楽しさや大切さに触れられる機会をつくります。
                  </p>
                  <p>
                    学校という身近な場で世代を超えた交流が生まれるよう、教員の方々と連携しながら、安全で参加しやすいプログラムを企画しています。
                  </p>
                </div>
                <Link
                  href={activityNavItems[2].href}
                  className="mt-6 inline-block text-sm font-medium text-primary hover:underline"
                >
                  詳しく見る →
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Members（9名・3列×3行） */}
      {/* <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle title="メンバー" subtitle="Members" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {members.map((member, i) => (
              <FadeIn key={member.name} delay={(i % 3) * 0.1}>
                <div className="flex h-full flex-col text-center">
                  <div className="w-32 h-32 mx-auto rounded-full bg-dark/10 flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-dark/20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-primary">{member.role}</p>
                  <p className="mt-2 text-sm text-dark/70 leading-relaxed">{member.bio}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section> */}
    </>
  );
}
