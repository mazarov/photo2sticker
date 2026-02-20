import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://photo2sticker.ru"),
  title: "Сделать стикер из фото онлайн бесплатно | Photo2Sticker",
  description:
    "Сделайте стикер из фото для Telegram за 30 секунд. ИИ сохраняет черты лица. Первый пак бесплатно. Без дизайнера и регистрации.",
  openGraph: {
    title: "Сделать стикер из фото онлайн бесплатно | Photo2Sticker",
    description:
      "Сделайте стикер из фото для Telegram за 30 секунд. ИИ сохраняет черты лица. Первый пак бесплатно. Без дизайнера и регистрации.",
    type: "website",
    url: "https://photo2sticker.ru/",
    images: [{ url: "https://photo2sticker.ru/opengraph.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Сделать стикер из фото онлайн бесплатно | Photo2Sticker",
    description: "Сделайте стикер из фото для Telegram за 30 секунд. ИИ сохраняет черты лица. Первый пак бесплатно.",
    images: ["https://photo2sticker.ru/opengraph.jpg"],
  },
};

const YANDEX_METRIKA_ID = 106534984;

function StoragePreconnect() {
  const url = process.env.SUPABASE_SUPABASE_PUBLIC_URL ?? process.env.SUPABASE_URL;
  if (!url) return null;
  try {
    const origin = new URL(url).origin;
    return <link rel="preconnect" href={origin} crossOrigin="" />;
  } catch {
    return null;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preload" href="/fonts/nunito-latin-700.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/varela-round-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
        <StoragePreconnect />
      </head>
      <body>
        {children}
        <Footer />
        <Script
          id="yandex-metrika"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_METRIKA_ID}', 'ym');
              ym(${YANDEX_METRIKA_ID}, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
            `,
          }}
        />
        <noscript>
          <div>
            <img
              src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
              style={{ position: "absolute", left: -9999 }}
              alt=""
            />
          </div>
        </noscript>
      </body>
    </html>
  );
}
