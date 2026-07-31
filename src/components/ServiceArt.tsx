/** Фотография услуги. AVIF → WebP → JPG, ленивая загрузка, фиксированные размеры против сдвига вёрстки. */
export function ServicePhoto({ slug, alt }: { slug: string; alt: string }) {
  const base = `/img/services/${slug}`;
  return (
    <div className="relative mb-5 cursor-pointer overflow-hidden rounded-xl bg-graphite">
      <picture>
        <source type="image/avif" srcSet={`${base}.avif`} />
        <source type="image/webp" srcSet={`${base}.webp`} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${base}.jpg`}
          alt={alt}
          width={1600}
          height={1000}
          loading="lazy"
          decoding="async"
          className="block aspect-[16/10] h-auto w-full object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.03]"
        />
      </picture>
    </div>
  );
}
