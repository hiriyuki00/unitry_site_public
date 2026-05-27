import type { CSSProperties } from "react";
import Image from "next/image";
import { heroLogoLockup } from "@/data/hero-logo-lockup";

function layerStyle(tx: number, ty: number, scale: number): CSSProperties {
  return {
    transform: `translate(${tx}%, ${ty}%) scale(${scale})`,
  };
}

/** ヒーロー内で relative な親の中央に大きく配置。兄弟にタイトル・本文・ボタンを置く */
export default function HeroLogoBackdrop() {
  const { widthCss, opacity, centerOffsetYPercent, bird, word } = heroLogoLockup;

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 z-0 aspect-square max-w-[100vw]"
      style={{
        width: widthCss,
        opacity,
        transform: `translate(-50%, calc(-50% + ${centerOffsetYPercent}%))`,
      }}
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={layerStyle(bird.translateXPercent, bird.translateYPercent, bird.scale)}
      >
        <Image
          src="/images/unitry_logo_bird.webp"
          alt=""
          fill
          className="object-contain object-center"
          sizes="100vw"
          priority
        />
      </div>
      <div
        className="absolute inset-0"
        style={layerStyle(word.translateXPercent, word.translateYPercent, word.scale)}
      >
        <Image
          src="/images/unitry_logo_word.webp"
          alt=""
          fill
          className="object-contain object-center"
          sizes="100vw"
          priority
        />
      </div>
    </div>
  );
}
