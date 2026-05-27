import Link from "next/link";

export default function NotFound() {
  return (
    <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 flex-1 flex items-center justify-center">
      <div className="text-center">
        <p className="text-6xl font-bold text-primary">404</p>
        <h1 className="mt-4 text-2xl font-bold">ページが見つかりません</h1>
        <p className="mt-2 text-dark/60">
          お探しのページは存在しないか、移動した可能性があります。
        </p>
        <Link
          href="/"
          className="inline-block mt-8 px-6 py-3 bg-dark text-white rounded hover:bg-dark-light transition-colors"
        >
          トップページに戻る
        </Link>
      </div>
    </section>
  );
}
