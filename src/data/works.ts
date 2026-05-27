export interface Work {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  thumbnail: string;
  year: number;
  category?: string;
  /** 作品が扱うテーマ・メッセージ（一覧には出さず詳細のみ） */
  theme?: string;
  /** 主要な撮影地（複数可） */
  locations?: string[];
  /** CAMPFIRE 等クラファンのご支援者名（掲載許諾のある方のみ・五十音順など運用で統一） */
  crowdfundingSupporters?: string[];
}

/** ビルド時点の「今年」（制作継続の表記などに使用） */
export function getWorksActivityYear(): number {
  return new Date().getFullYear();
}

/** YouTube サムネイル URL（一覧のプレビュー用・埋め込みの代替） */
export function getYoutubeThumbnailUrl(youtubeId: string, quality: "hq" | "max" = "hq"): string {
  const file = quality === "max" ? "maxresdefault.jpg" : "hqdefault.jpg";
  return `https://img.youtube.com/vi/${youtubeId}/${file}`;
}

/**
 * 作品件数に応じた一覧グリッド用クラス（1件・2件で空きマスが出ないようにする）
 */
export function worksListingGridClass(count: number): string {
  const base = "grid gap-8";
  if (count <= 0) return `${base} grid-cols-1`;
  if (count === 1) return `${base} grid-cols-1 max-w-2xl mx-auto w-full`;
  if (count === 2) return `${base} grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto w-full`;
  return `${base} grid-cols-1 md:grid-cols-2 lg:grid-cols-3`;
}

export const works: Work[] = [
  {
    id: "sample-01",
    title: "それでも、夢を。",
    description:
      "中央学院大学に通う中川志信は、ある日、尊敬する先輩 加沼天音に呼び出された。そこでなんと、志信は中央学院高校のアシスタントティーチャーに！？さらに、大それた夢を持つ生徒 天北望夢の進路希望調査シートの回収を頼まれて……！？周りに流されて夢なんか持てなかった志信は、現実を未だ直視出来ず夢ばかりを追う望夢と出会い、彼の夢について考えることとなるのだが……。将来を悩む2人の道は、いまここで交差する。",
    youtubeId: "a9_IcJ9lR_w",
    thumbnail: "/images/work-placeholder.jpg",
    year: 2024,
    category: "ヒューマンドラマ",
    theme:
      "「現実」と「夢」のあいだで揺れる若者たちが、他者との対話を通じて自分の軸を見つめ直す物語。進路や将来への不安を抱える世代に寄り添うことを目指しました。",
    locations: [
      "手賀大橋",
      "手賀沼公園",
      "親水広場",
      "志賀直哉邸跡",
      "ファミリーレストラン「旧ステラ」跡地",
      "川村学園女子大学",
      "中央学院大学 北門",
    ],
    crowdfundingSupporters: [
      "我孫子市",
      "我孫子市教育委員会",
      "中央学院大学",
      "中央学院大学地域連携カイギ部",
      "川村学園女子大学",
      "川村学園女子大学学友会",
      "NPO法人手賀沼フィルムコミッション",
      "あびこ市民活動ステーション",
      "クラウドファンディングご支援者の皆様",
    ],
  },
  {
    id: "sample-02",
    title: "ただいまと言える場所",
    description:
      "町を出て行くことばかり考えていた新木羽来は、友人の下沼大地と、いつものようにカフェで時間を過ごしていた。しかし、ひょんなことから、この町へ越してきたばかりの大学生 高野優花梨と出会い、下沼の思い付きで「町案内」をすることになってしまう。町に未練の無い新木は気乗りしないまま同行するが、高野との交流や先輩 久我たちの導きによって、町の魅力に心を動かされて……。",
    youtubeId: "LxgqQu7fYe4",
    thumbnail: "/images/work-placeholder.jpg",
    year: 2025,
    category: "ヒューマンドラマ",
    theme:
      "「この町にいたい」とはどういうことか——離れたい気持ちと、見過ごしてきたよさとの間で揺れる主人公が、他者との関わりから地域へのまなざしを変えていく物語です。",
      locations: [
        "我孫子市鳥の博物館",
        "我孫子二階堂高等学校",
        "和cafe TUMUGI",
        "旧井上家住宅",
        "水の館プラネタリウム",
        "ファミリーレストラン「旧ステラ」跡地",
        "我孫子市役所屋上",
        "CGU Cafe(中央学院大学内)",
        "オルタナティブスクール ｢ラ・ルース｣",
      ],
    crowdfundingSupporters: [
      "我孫子市",
      "我孫子市教育委員会",
      "我孫子市市制55周年記念協賛事業",
      "NPO法人手賀沼フィルムコミッション",
      "中央学院大学地域連携カイギ部",
      "川村学園女子大学かわむラボ",
      "クラウドファンディングご支援者の皆様",
    ],
  },
  // 新作はこの配列にオブジェクトを追加するだけで一覧・トップ・静的パスが追従します。
];

export function getWork(id: string): Work | undefined {
  return works.find((w) => w.id === id);
}
