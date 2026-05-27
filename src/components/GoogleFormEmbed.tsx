type GoogleFormEmbedProps = {
  src: string;
  title: string;
};

function toEmbedUrl(src: string) {
  const trimmed = src.trim();
  if (trimmed.includes("embedded=true")) return trimmed;
  return trimmed.includes("?") ? `${trimmed}&embedded=true` : `${trimmed}?embedded=true`;
}

export default function GoogleFormEmbed({ src, title }: GoogleFormEmbedProps) {
  const embedSrc = toEmbedUrl(src);

  return (
    <div className="rounded-lg border border-dark/10 overflow-hidden bg-white">
      <iframe
        src={embedSrc}
        width="100%"
        height={920}
        className="min-h-[70vh] w-full border-0"
        title={title}
      >
        読み込んでいます…
      </iframe>
    </div>
  );
}
