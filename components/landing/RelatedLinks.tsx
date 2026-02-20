import Link from "next/link";

export function RelatedLinks({
  links,
}: {
  links: { href: string; label: string }[];
}) {
  return (
    <section className="py-8 md:py-10 px-4 md:px-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-lg sm:text-xl font-display font-bold text-white text-center mb-4">
          Посмотрите также
        </h2>
        <ul className="flex flex-wrap justify-center gap-3">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-sm text-primary hover:underline font-medium px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
