export interface UnitryEvent {
  id: string;
  title: string;
  /** 一覧カード用 */
  summary: string;
  /** 詳細ページ本文 */
  description: string;
  /** 詳細ページの定型レイアウト用（必要な項目だけ埋める） */
  details?: EventDetails;
  /** 人が読む日時表記 */
  dateLabel: string;
  /** 並び替え用（YYYY-MM-DD）。この日付が本日より前なら「過去」扱い */
  dateSort: string;
  /** 複数日開催の終了日（YYYY-MM-DD）。未指定時は dateSort を使用 */
  dateEndSort?: string;
  venue?: string;
  category?: string;
  /** 予約・告知ページなど外部リンク */
  externalUrl?: string;
}

export interface EventDetails {
  lead?: string;
  overview?: string[];
  schedule?: string[];
  meetingPoint?: string;
  target?: string[];
  capacity?: string;
  fee?: string;
  bringItems?: string[];
  notes?: string[];
  contact?: string;
}

const raw: UnitryEvent[] = [
  // --- 開催予定テンプレート（コピーしてコメントを外し、値を差し替え）---
  // dateSort（開始日）〜 dateEndSort（終了日）が本日以降 → /works#events に表示
  // {
  //   id: "screening-2026-spring", // URL用（/works/events/このid）。英数字とハイフン
  //   title: "『作品タイトル』上映会",
  //   summary:
  //     "一覧カード用の短い説明。日時・会場の要点が伝わるように2〜3行で書く。",
  //   description:
  //     "詳細ページ用の本文。開催内容・対象・参加方法・変更の可能性などを記載する。",
  //   dateLabel: "2026年6月1日（土）14:00開演（予定）",
  //   dateSort: "2026-06-01", // YYYY-MM-DD（開始日）
  //   // dateEndSort: "2026-06-02", // 複数日開催の場合のみ（終了日）
  //   venue: "千葉県我孫子市内 ○○（住所・会場名）",
  //   category: "上映会", // 例: 上映会 / イベント / トーク
  //   // externalUrl: "https://...", // 予約・申込ページがある場合のみ
  // },

  // --- 過去イベントテンプレート（dateSort を本日より前にする）---
  // → /works/events/past に表示。上と同じ形式で終了日が本日より前になるよう設定。
   {
    id: "contactNewMember-2026-spring", // URL用（/works/events/このid）。英数字とハイフン
    title: "『我孫子ロケ地巡りツアー』を開催します！",
    summary:
      "2026年度映画製作プロジェクト始動に先立ち、活動の雰囲気を感じていただける「我孫子ロケ地巡りツアー」を開催いたします。",
    description:
      "2026年度映画製作プロジェクトのメンバー募集です。興味ある方はお問い合わせください。",
    details: {
      lead: "映画製作に興味がある方、我孫子市のロケ地を見てみたい方はぜひご参加ください。",
      overview: [
        "我孫子市のロケ地を巡りながら、Unitryのメンバーと交流するツアーです。",
        "我孫子市の魅力を感じていただけることを目的としています。",
      ],
      meetingPoint: "我孫子駅 南口 New Days前（開始5分前までにお集まりください）",
      target: [
        "我孫子市にゆかりのある高校生・大学生（学年不問）",
        "映像制作や地域活動に関心のある方",
      ],
      notes: [
        "内容は当日の進行状況により変更される場合があります。",
        "めっちゃ歩く可能性あります。運動靴で参加してください。",
      ],
      contact: "参加希望の方はお問い合わせフォームから『我孫子ロケ地巡りツアー参加希望』とご連絡ください。",
    },
    dateLabel: "2026年5月29日（金）16:30~18:30\n2026年5月30日（土）13:30~15:30",
    dateSort: "2026-05-29", // YYYY-MM-DD（開始日）
    dateEndSort: "2026-05-30", // 複数日開催の終了日
    venue: "我孫子駅 南口 New Days前",
    category: "新歓会", // 例: 上映会 / イベント / トーク
  },
];

/** 日本時間の本日（YYYY-MM-DD） */
export function getTodayInJapan(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Tokyo" });
}

/** 新しい日付順（全件） */
export const events: UnitryEvent[] = [...raw].sort((a, b) =>
  b.dateSort.localeCompare(a.dateSort),
);

export function isPastEvent(ev: UnitryEvent, today = getTodayInJapan()): boolean {
  const endDate = ev.dateEndSort ?? ev.dateSort;
  return endDate < today;
}

/** 開催予定・開催中（本日以降） */
export function getUpcomingEvents(today = getTodayInJapan()): UnitryEvent[] {
  return events
    .filter((e) => !isPastEvent(e, today))
    .sort((a, b) => a.dateSort.localeCompare(b.dateSort));
}

/** 終了したイベント（本日より前） */
export function getPastEvents(today = getTodayInJapan()): UnitryEvent[] {
  return events
    .filter((e) => isPastEvent(e, today))
    .sort((a, b) => (b.dateEndSort ?? b.dateSort).localeCompare(a.dateEndSort ?? a.dateSort));
}

/** 一覧グリッド（作品一覧と同様に件数で列数を調整） */
export function eventsListingGridClass(count: number): string {
  const base = "grid gap-8";
  if (count <= 0) return `${base} grid-cols-1`;
  if (count === 1) return `${base} grid-cols-1 max-w-2xl mx-auto w-full`;
  if (count === 2) return `${base} grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto w-full`;
  return `${base} grid-cols-1 md:grid-cols-2 lg:grid-cols-3`;
}

export function getEvent(id: string): UnitryEvent | undefined {
  return events.find((e) => e.id === id);
}
