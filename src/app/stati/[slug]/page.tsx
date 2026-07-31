import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogUi, postBySlug, posts, postsByDate } from "@/blog";
import { services } from "@/copy";
import { JsonLd, articleSchema, breadcrumbSchema } from "@/lib/schema";
import { Reveal } from "@/components/Reveal";
import { BlogBody } from "@/components/BlogBody";
import { Eyebrow } from "@/components/Type";

const wrap = "mx-auto w-full max-w-[1180px] px-8 max-lg:px-5";
const narrow = "mx-auto w-full max-w-[760px]";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `/stati/${slug}` },
    openGraph: {
      type: "article",
      title: post.metaTitle,
      description: post.metaDescription,
      url: `/stati/${slug}`,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
    },
  };
}

const dateFmt = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" });

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();

  const related = services.items.filter((s) => post.related.includes(s.slug));
  const next = postsByDate.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <article>
        <header className="bg-cream pb-12 pt-36 max-lg:pb-9 max-lg:pt-28">
          <div className={wrap}>
            <div className={narrow}>
              <nav aria-label="Хлебные крошки" className="mb-7 font-mono text-[12px] uppercase tracking-[0.12em]">
                <Link href="/stati" className="text-amber-dk no-underline transition hover:text-ink">
                  {blogUi.backToList}
                </Link>
              </nav>
              <Reveal>
                <div className="mb-5">
                  <Eyebrow>{post.tag}</Eyebrow>
                </div>
              </Reveal>
              <Reveal delay={70}>
                <h1 className="mb-5 text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.1] tracking-[-0.02em] text-ink">
                  {post.title}
                </h1>
              </Reveal>
              <Reveal delay={120}>
                <p className="m-0 text-[19px] leading-relaxed text-graphite">{post.lead}</p>
              </Reveal>
              <Reveal delay={170}>
                <div className="mt-7 flex items-center gap-5 font-mono text-[12px] uppercase tracking-[0.1em] text-muted">
                  <time dateTime={post.date}>{dateFmt.format(new Date(post.date))}</time>
                  <span aria-hidden="true" className="h-px w-6 bg-line" />
                  <span>
                    {post.minutes} {blogUi.readingSuffix}
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </header>

        <div className="bg-white py-16 max-lg:py-11">
          <div className={wrap}>
            <div className={narrow}>
              <BlogBody blocks={post.body} />

              <p className="mt-14 border-t border-line pt-6 text-[14px] leading-relaxed text-muted">
                {blogUi.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-cream py-16 max-lg:py-11">
          <div className={wrap}>
            <div className={narrow}>
              <h2 className="mb-7 text-[22px] font-semibold tracking-[-0.02em] text-ink">{blogUi.relatedTitle}</h2>
              <div className="flex flex-col gap-4">
                {related.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/uslugi/${s.slug}`}
                    className="group flex items-center justify-between gap-6 border-b border-line pb-4 text-[18px] font-medium text-ink no-underline transition-colors hover:text-amber-dk"
                  >
                    {s.title}
                    <span
                      aria-hidden="true"
                      className="h-[2px] w-8 shrink-0 bg-amber transition-[width] duration-300 group-hover:w-14"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="bg-ink-deep py-16 text-white max-lg:py-12">
        <div className={wrap}>
          <div className={narrow}>
            <h2 className="mb-3 text-[clamp(22px,2.6vw,30px)] font-semibold leading-snug text-white">
              {blogUi.ctaTitle}
            </h2>
            <p className="m-0 mb-7 max-w-[62ch] text-[17px] leading-relaxed text-white/80">{blogUi.ctaText}</p>
            <button
              data-lead
              className="inline-flex items-center gap-3 rounded-full border border-amber bg-ink px-8 py-4 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:border-amber-lt hover:bg-dark"
            >
              <span aria-hidden="true" className="h-[7px] w-[7px] shrink-0 rounded-full bg-amber" />
              {blogUi.ctaButton}
            </button>
          </div>
        </div>
      </section>

      {next.length > 0 && (
        <section className="bg-white py-16 max-lg:py-11">
          <div className={wrap}>
            <div className={narrow}>
              <h2 className="mb-7 text-[22px] font-semibold tracking-[-0.02em] text-ink">{blogUi.nextTitle}</h2>
              <div className="grid grid-cols-2 gap-8 max-lg:grid-cols-1 max-lg:gap-6">
                {next.map((n) => (
                  <Link key={n.slug} href={`/stati/${n.slug}`} className="group no-underline">
                    <span className="mb-3 block font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-amber-dk">
                      {n.tag}
                    </span>
                    <span className="block text-[19px] font-semibold leading-snug text-ink transition-colors group-hover:text-amber-dk">
                      {n.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <JsonLd
        data={[
          articleSchema(post),
          breadcrumbSchema([
            { name: "Главная", url: "/" },
            { name: blogUi.tag, url: "/stati" },
            { name: post.title, url: `/stati/${post.slug}` },
          ]),
        ]}
      />
    </>
  );
}
