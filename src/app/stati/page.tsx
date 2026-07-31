import type { Metadata } from "next";
import Link from "next/link";
import { blogUi, postsByDate } from "@/blog";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Headline } from "@/components/Type";

const wrap = "mx-auto w-full max-w-[1180px] px-8 max-lg:px-5";

export const metadata: Metadata = {
  title: "Статьи о маркшейдерии, аэрофотосъёмке и горной документации",
  description: blogUi.lead,
  alternates: { canonical: "/stati" },
};

const dateFmt = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" });

export default function BlogListPage() {
  return (
    <>
      <section className="bg-white pb-16 pt-36 max-lg:pb-10 max-lg:pt-28">
        <div className={wrap}>
          <Reveal>
            <div className="mb-5">
              <Eyebrow>{blogUi.tag}</Eyebrow>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <Headline
              text={blogUi.title}
              mark={blogUi.titleMark}
              as="h1"
              className="mb-6 text-[clamp(32px,4.2vw,52px)] font-semibold leading-[1.06] tracking-[-0.02em]"
            />
          </Reveal>
          <Reveal delay={140}>
            <p className="m-0 max-w-[70ch] text-[18px] leading-relaxed text-muted">{blogUi.lead}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white pb-24 max-lg:pb-16">
        <div className={wrap}>
          {postsByDate.length === 0 ? (
            <p className={`m-0 text-[17px] text-muted`}>{blogUi.empty}</p>
          ) : (
            <div className="border-t border-line">
              {postsByDate.map((post, i) => (
                <Reveal key={post.slug} delay={(i % 3) * 70}>
                  <article className="group border-b border-line">
                    <Link
                      href={`/stati/${post.slug}`}
                      className="grid grid-cols-[auto_1fr] gap-x-10 py-9 no-underline max-lg:grid-cols-1 max-lg:gap-x-0 max-lg:gap-y-3 max-lg:py-7"
                    >
                      <div className="flex w-[180px] flex-col gap-2 max-lg:w-auto max-lg:flex-row max-lg:items-center max-lg:gap-4">
                        <span className="num-tab font-mono text-[13px] font-medium leading-none text-amber-dk">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-graphite">
                          {post.tag}
                        </span>
                        <span className="font-mono text-[12px] text-muted">
                          {post.minutes} {blogUi.readingSuffix}
                        </span>
                      </div>
                      <div>
                        <h2 className="mb-3 text-[clamp(21px,2.3vw,28px)] font-semibold leading-tight tracking-[-0.02em] text-ink transition-colors group-hover:text-amber-dk">
                          {post.title}
                        </h2>
                        <p className="m-0 max-w-[76ch] text-[16.5px] leading-relaxed text-muted">{post.lead}</p>
                        <time
                          dateTime={post.date}
                          className="mt-4 block font-mono text-[12px] uppercase tracking-[0.1em] text-muted"
                        >
                          {dateFmt.format(new Date(post.date))}
                        </time>
                      </div>
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Главная", url: "/" },
          { name: blogUi.tag, url: "/stati" },
        ])}
      />
    </>
  );
}
