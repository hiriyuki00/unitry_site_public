export const contactFormTypes = ["volunteer", "sponsor", "other"] as const;

export type ContactFormType = (typeof contactFormTypes)[number];

export function isContactFormType(value: string): value is ContactFormType {
  return (contactFormTypes as readonly string[]).includes(value);
}

export const contactFormMeta: Record<
  ContactFormType,
  { title: string; description: string; envKey: string }
> = {
  volunteer: {
    title: "ボランティア参加のお問い合わせ",
    description:
      "Unitryの活動へのボランティア参加に関するお問い合わせフォームです。映像制作の経験は問いません。",
    envKey: "NEXT_PUBLIC_GOOGLE_FORM_VOLUNTEER",
  },
  sponsor: {
    title: "協賛・協力のお問い合わせ",
    description:
      "Unitryの活動への協賛・協力に関するお問い合わせフォームです。",
    envKey: "NEXT_PUBLIC_GOOGLE_FORM_SPONSOR",
  },
  other: {
    title: "その他のお問い合わせ",
    description: "活動に関するご質問など、その他のお問い合わせフォームです。",
    envKey: "NEXT_PUBLIC_GOOGLE_FORM_OTHER",
  },
};

export function getFormEmbedUrl(type: ContactFormType): string | undefined {
  switch (type) {
    case "volunteer":
      return process.env.NEXT_PUBLIC_GOOGLE_FORM_VOLUNTEER?.trim() || undefined;
    case "sponsor":
      return process.env.NEXT_PUBLIC_GOOGLE_FORM_SPONSOR?.trim() || undefined;
    case "other":
      return process.env.NEXT_PUBLIC_GOOGLE_FORM_OTHER?.trim() || undefined;
    default: {
      const _exhaustive: never = type;
      return _exhaustive;
    }
  }
}
