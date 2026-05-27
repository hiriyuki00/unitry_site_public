/**
 * ヒーロー背後の鳥・文字ロゴ（タイトル〜ボタン全体を覆う大きさ）。
 * unitry_logo.png の見え方に合わせて bird / word の translate・scale を調整。
 */
export const heroLogoLockup = {
  /**
   * 正方形ロックアップの一辺（width にそのまま渡す CSS 値）
   * 大きくしたい場合は vw や max の rem を上げる
   */
  widthCss: "clamp(30rem, 132vw, 72rem)",
  /** 背後グラフィックの不透明度（0〜1） */
  opacity: 0.28,
  /** ロックアップ全体を縦方向にずらす（%）。正の値で下へ（キャッチ・ボタン寄り） */
  centerOffsetYPercent: 0,
  bird: {
    translateXPercent: 0,
    translateYPercent: 0,
    scale: 1,
  },
  word: {
    translateXPercent: 0,
    translateYPercent: 0,
    scale: 1,
  },
} as const;
