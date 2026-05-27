import type { Metadata } from "next";
import Link from "next/link";
import { works, worksListingGridClass, getWorksActivityYear } from "@/data/works";
import { events, getUpcomingEvents, getPastEvents } from "@/data/events";
import EventCardList from "@/components/EventCardList";
import FadeIn from "@/components/FadeIn";
import SectionTitle from "@/components/SectionTitle";
import WorkVideoEmbed from "@/components/WorkVideoEmbed";
import { activityNavItems } from "@/data/activity-nav";

const workshopProgramPoints = [
  {
    title: "撮影・表現の体験",
    body: "カメラやマイクに触れながら、短い映像づくりや取材の体験を行います。技術よりも「伝えたいことを形にする」楽しさを中心に進めます。",
  },
  {
    title: "対話をテーマにした学び",
    body: "映像を見たあとの振り返りや、世代を超えた対話の時間を設け、コミュニケーションの大切さを体感できるよう工夫しています。",
  },
  {
    title: "学校・地域に合わせた企画",
    body: "学年や授業の目的、時間割に合わせて内容を調整します。事前の打ち合わせで、無理のない進行と安全面にも配慮します。",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const n = works.length;
  const ne = events.length;
  const y = getWorksActivityYear();
  const parts: string[] = [];
  if (n > 0) parts.push(`映像作品${n}本`);
  if (ne > 0) parts.push(`上映・イベント${ne}件`);
  const summary = parts.length > 0 ? `${parts.join("、")}を掲載しています。` : "";
  return {
    title: "活動内容",
    description:
      summary ||
      `Unitryの映像制作・イベントへの出店・学校でのワークショップの活動内容です。${y}年も活動を続けています。`,
  };
}

export default function WorksHubPage() {
  const workCount = works.length;
  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents();
  const upcomingCount = upcomingEvents.length;
  const year = getWorksActivityYear();

  return (
    <>
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-dark text-white">
        <div className="mx-auto max-w-4xl text-center">
          <FadeIn direction="none">
            <p className="text-sm tracking-widest uppercase text-white/50 mb-3">
              Works & Events
            </p>
            <h1 className="text-4xl md:text-5xl font-bold">活動内容</h1>
            <p className="mt-6 text-white/70 leading-relaxed max-w-2xl mx-auto">
              映像制作・イベントへの出店・学校でのワークショップの3つの柱で活動しています。
            </p>
            <nav className="mt-8 flex flex-wrap justify-center gap-3 text-sm" aria-label="活動内容の内訳">
              {activityNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-white/20 px-4 py-2 text-white/80 hover:border-primary hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </FadeIn>
        </div>
      </section>

      {/* —— 作品 —— */}
      <section id="works" className="scroll-mt-24 py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle title="映像制作" subtitle="Works" />

          <FadeIn>
            <p className="mb-10 max-w-2xl mx-auto text-center text-dark/70 leading-relaxed">
              {workCount > 0 ? (
                <>
                  現在紹介している作品は <strong className="text-dark">{workCount}本</strong>
                  です。{year}年も制作を続けており、公開できる段階になったものから順次追加します。
                </>
              ) : (
                <>作品の掲載は準備中です。{year}年の新作は決まり次第、こちらに載せます。</>
              )}
            </p>
          </FadeIn>

          {workCount > 0 ? (
            <div className={worksListingGridClass(workCount)}>
              {works.map((work, i) => (
                <FadeIn key={work.id} delay={i * 0.1}>
                  <article className="flex h-full flex-col">
                    <WorkVideoEmbed youtubeId={work.youtubeId} title={work.title} />
                    <div className="mt-4 flex flex-1 flex-col">
                      <div className="flex items-center gap-3">
                        {work.category && (
                          <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded">
                            {work.category}
                          </span>
                        )}
                        <span className="text-xs text-gray">{work.year}</span>
                      </div>
                      <h2 className="mt-2 text-xl font-semibold text-dark">{work.title}</h2>
                      <p className="mt-2 flex-1 text-sm text-dark/70 line-clamp-3">{work.description}</p>
                      <Link
                        href={`/works/${work.id}`}
                        className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
                      >
                        あらすじ・詳細を見る →
                      </Link>
                    </div>
                  </article>
                </FadeIn>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* —— 上映・イベント —— */}
      <section id="events" className="scroll-mt-24 py-24 px-4 sm:px-6 lg:px-8 bg-gray-light">
        <div className="mx-auto max-w-6xl">
          <SectionTitle title="イベントへの出店" subtitle="Events" />

          <FadeIn>
            <p className="mb-10 max-w-2xl mx-auto text-center text-dark/70 leading-relaxed">
              {upcomingCount > 0 ? (
                <>
                  上映会やトークイベントなど、地域の皆さまとお会いする機会を{" "}
                  <strong className="text-dark">{upcomingCount}件</strong> 掲載しています。
                  日程・会場は変更になることがあります。<br></br>最新情報はニュースやSNSもご確認ください。
                </>
              ) : (
                <>
                  現在予定している上映・イベントはありません。<br></br>開催が決まり次第、こちらに追加します。
                </>
              )}
            </p>
          </FadeIn>

          {upcomingCount > 0 ? <EventCardList items={upcomingEvents} /> : null}

          <FadeIn delay={0.15} className="mt-10 text-center">
            <Link
              href="/works/events/past"
              className="inline-block px-5 py-2.5 text-sm sm:px-8 sm:py-3 sm:text-base border border-dark/20 rounded font-medium text-dark/80 hover:bg-dark hover:text-white transition-colors"
            >
              過去のイベントはこちら
              {pastEvents.length > 0 ? (
                <span className="ml-1 text-sm text-dark/50">（{pastEvents.length}件）</span>
              ) : null}
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* —— 学校でのワークショップ —— */}
      <section id="workshop" className="scroll-mt-24 py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle title="学校でのワークショップ" subtitle="School Workshop" />

          <FadeIn>
            <div className="mx-auto mb-12 max-w-3xl space-y-6 text-center text-base leading-relaxed text-dark/70">
              <p>
                地域の学校を訪問し、映像制作や対話をテーマにしたプログラムを行っています。
                <br></br>学校という身近な場で、大学生メンバーと生徒・教員が一緒に取り組むことで、世代を超えた交流<br></br>が生まれるよう企画しています。
              </p>
              <p>
                プログラムの内容・所要時間・必要な機材は学校ごとに異なります。
                ご希望の学年や授業のテーマがあれば、お問い合わせの際にお知らせください。
              </p>
            </div>
          </FadeIn>

          <ul className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {workshopProgramPoints.map((point, i) => (
              <FadeIn key={point.title} delay={i * 0.1}>
                <li className="h-full list-none rounded-lg border border-dark/10 bg-white p-8">
                  <h2 className="text-lg font-semibold text-dark">{point.title}</h2>
                  <p className="mt-4 text-base leading-relaxed text-dark/80">{point.body}</p>
                </li>
              </FadeIn>
            ))}
          </ul>

          <FadeIn delay={0.2} className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-block px-5 py-2.5 text-sm sm:px-8 sm:py-3 sm:text-base bg-primary text-white rounded font-medium hover:opacity-90 transition-opacity"
            >
              ワークショップのご相談はこちら
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
