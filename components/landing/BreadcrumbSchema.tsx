/** JSON-LD BreadcrumbList для страниц /style/[group] и /style/[group]/[substyle]. */
export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  if (!items?.length) return null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
