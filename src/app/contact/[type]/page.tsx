import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FadeIn from "@/components/FadeIn";
import GoogleFormEmbed from "@/components/GoogleFormEmbed";
import {
  contactFormMeta,
  contactFormTypes,
  getFormEmbedUrl,
  isContactFormType,
  type ContactFormType,
} from "@/lib/contact-forms";

interface Props {
  params: Promise<{ type: string }>;
}

export function generateStaticParams() {
  return contactFormTypes.map((type) => ({ type }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type: raw } = await params;
  if (!isContactFormType(raw)) return {};
  const meta = contactFormMeta[raw];
  return {
    title: meta.title,
    description: meta.description,
  };
}

export default async function ContactFormPage({ params }: Props) {
  const { type: raw } = await params;
  if (!isContactFormType(raw)) notFound();
  const type = raw as ContactFormType;
  const meta = contactFormMeta[type];
  const formUrl = getFormEmbedUrl(type);

  return (
    <>
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-dark text-white">
        <div className="mx-auto max-w-3xl">
          <FadeIn direction="none">
            <Link
              href="/contact"
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              &larr; お問い合わせトップに戻る
            </Link>
            <p className="mt-4 text-sm tracking-widest uppercase text-white/50">Contact</p>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold">{meta.title}</h1>
            <p className="mt-4 text-white/70 leading-relaxed">{meta.description}</p>
          </FadeIn>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 pb-24">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            {formUrl ? (
              <GoogleFormEmbed src={formUrl} title={meta.title} />
            ) : (
              <div className="rounded-lg border border-dark/10 bg-gray-light p-10 text-center">
                <p className="text-dark/70 leading-relaxed">
                  この種別の Google フォーム URL がまだ設定されています。
                  <br />
                  環境変数{" "}
                  <code className="rounded bg-dark/5 px-1.5 py-0.5 text-sm">{meta.envKey}</code>{" "}
                  に、フォームの URL（編集画面ではなく回答用 URL）を設定してください。
                </p>
                <p className="mt-4 text-sm text-gray">
                  埋め込み用は通常{" "}
                  <code className="rounded bg-dark/5 px-1 py-0.5 text-xs">
                    https://docs.google.com/forms/d/e/…/viewform
                  </code>{" "}
                  の形式です。
                </p>
              </div>
            )}
          </FadeIn>
        </div>
      </section>
    </>
  );
}
