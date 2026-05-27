import Link from "next/link";
import { getAllNews } from "@/lib/markdown";
import ActivityNavCards from "@/components/ActivityNavCards";
import FadeIn from "@/components/FadeIn";
import HeroBrandTitle from "@/components/HeroBrandTitle";
import HeroLogoBackdrop from "@/components/HeroLogoBackdrop";
import SectionTitle from "@/components/SectionTitle";

export default function Home() {
  const latestNews = getAllNews().slice(0, 3);

  return (
    <>
      {/* ===== Hero ===== */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video background placeholder — replace with actual video */}
        <div className="absolute inset-0 bg-dark">
          <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/40 to-dark/80" />
          {/*
            動画素材が用意でき次第、以下のコメントを解除してください：
            <video
              autoPlay muted loop playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
          */}
        </div>

        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 py-10 text-center md:px-8 md:py-14">
          <HeroLogoBackdrop />
          <div className="relative z-10 flex flex-col items-center">
            <FadeIn delay={0.2} direction="none">
              <HeroBrandTitle />
            </FadeIn>
            <FadeIn delay={0.5} direction="none">
              <p className="mt-6 text-lg text-white/90 max-w-xl leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] md:mt-8 md:text-xl">
                若者と地域の交流を紡ぎ、
                <br />
                地域社会の絆を深める。
              </p>
            </FadeIn>
            <FadeIn delay={0.8} direction="none">
              <div className="relative z-10 mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center md:mt-12">
                <Link
                  href="/about"
                  className="inline-block px-5 py-2.5 text-sm sm:px-8 sm:py-3 sm:text-base bg-primary text-white font-medium rounded shadow-lg shadow-black/30 hover:bg-primary-dark transition-colors"
                >
                  Unitryを知る
                </Link>
                <Link
                  href="/works"
                  className="inline-block px-5 py-2.5 text-sm sm:px-8 sm:py-3 sm:text-base border border-white/40 bg-black/20 text-white font-medium backdrop-blur-sm rounded shadow-lg shadow-black/20 hover:bg-white/15 transition-colors"
                >
                  活動内容を見る
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white/50 rounded-full mt-1.5 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ===== About Section ===== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <SectionTitle title="Unitryとは" subtitle="About" />
          <FadeIn>
            <p className="text-lg leading-relaxed text-dark/80">
              Unitryは千葉県我孫子市を拠点に、活動を通じて
              <span className="text-primary font-semibold">「交流」</span>
              を生み出す任意団体です。
            </p>
            <p className="mt-4 text-lg leading-relaxed text-dark/80">
              大学生と子どもたちが映像制作を通じて出会い、対話し、共に成長する。
              <br />
              その変容の過程を映像で紡ぎ、地域社会の絆を深めていきます。
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link
              href="/about"
              className="inline-block mt-8 text-primary font-medium hover:underline"
            >
              もっと詳しく &rarr;
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ===== Activities ===== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-light">
        <div className="mx-auto max-w-4xl">
          <SectionTitle title="活動内容" subtitle="Activities" />
          <FadeIn>
            <p className="mx-auto mb-12 max-w-xl text-center text-sm text-dark/70 leading-relaxed">
              映像制作・イベントへの出店・学校でのワークショップの3つを柱に活動しています。
              <br></br>それぞれの内容は活動内容ページでご覧いただけます。
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <ActivityNavCards />
          </FadeIn>
        </div>
      </section>

      {/* ===== News ===== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionTitle title="ニュース" subtitle="News" />
          <div className="space-y-6">
            {latestNews.map((post, i) => (
              <FadeIn key={post.slug} delay={i * 0.1}>
                <Link
                  href={`/news/${post.slug}`}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 py-4 border-b border-dark/10 hover:bg-gray-light/50 transition-colors px-2 -mx-2 rounded"
                >
                  <time className="text-sm text-gray whitespace-nowrap">{post.date}</time>
                  {post.category && (
                    <span className="inline-block px-2 py-0.5 text-xs bg-primary/10 text-primary rounded w-fit">
                      {post.category}
                    </span>
                  )}
                  <span className="font-medium hover:text-primary transition-colors">
                    {post.title}
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.2} className="text-center mt-10">
            <Link href="/news" className="inline-block text-primary font-medium hover:underline">
              すべてのニュースを見る &rarr;
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ===== CTA: Volunteer ===== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray text-white">
        <div className="mx-auto max-w-3xl text-center">
          <SectionTitle title="一緒に楽しめる仲間を募集中です" subtitle="Join Us" light />
          <FadeIn>
            <p className="text-lg leading-relaxed text-white/70">
              Unitryでは、映像制作プロジェクトに参加してくださるボランティアを募集しています。
              映像制作の経験は問いません。「交流」を通じて地域を盛り上げたい方、
              子どもたちとの対話に関心がある方、ぜひお気軽にお問い合わせください。
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link
              href="/contact"
              className="inline-block mt-8 px-5 py-2.5 text-sm sm:px-8 sm:py-3 sm:text-base bg-primary text-white font-medium rounded hover:bg-primary-dark transition-colors"
            >
              お問い合わせはこちら
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
