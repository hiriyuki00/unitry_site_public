import FadeIn from "./FadeIn";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  light?: boolean;
}

export default function SectionTitle({ title, subtitle, light = false }: SectionTitleProps) {
  return (
    <FadeIn className="text-center mb-12">
      <h2
        className={`text-3xl md:text-4xl font-bold tracking-tight ${
          light ? "text-white" : "text-dark"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 text-sm tracking-widest uppercase ${
            light ? "text-white/50" : "text-gray"
          }`}
        >
          {subtitle}
        </p>
      )}
      <div className="mx-auto mt-4 h-0.5 w-12 bg-primary" />
    </FadeIn>
  );
}
