type WorkVideoEmbedProps = {
  youtubeId: string;
  title: string;
  className?: string;
};

/** 作品の YouTube 埋め込み（活動内容一覧・作品詳細で共通） */
export default function WorkVideoEmbed({ youtubeId, title, className = "" }: WorkVideoEmbedProps) {
  if (!youtubeId) {
    return (
      <div
        className={`flex aspect-video items-center justify-center rounded-lg bg-dark/10 text-sm text-dark/50 ${className}`}
      >
        動画を準備中です
      </div>
    );
  }

  return (
    <div className={`aspect-video overflow-hidden rounded-lg bg-dark ${className}`}>
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
}
