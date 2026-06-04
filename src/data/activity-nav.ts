/** 活動内容ページ（/works）内のアンカー用 */
export type ActivityNavItem = {
  href: string;
  label: string;
  description: string;
  image: string;
  /** トリミング位置（例: "center 20%" で上部寄せ） */
  imagePosition?: string;
};

export const activityNavItems: ActivityNavItem[] = [
  {
    href: "/works#works",
    label: "映像制作",
    description: "制作した映像作品の一覧",
    image: "/images/work_film.jpg",
  },
  {
    href: "/works#events",
    label: "イベントへの出店",
    description: "上映会・地域イベントへの参加",
    image: "/images/work_event.jpg",
  },
  {
    href: "/works#workshop",
    label: "学校でのワークショップ",
    description: "学校向けの映像・対話プログラム",
    image: "/images/work_school_02.jpg",
    imagePosition: "center 20%",
  },
];
