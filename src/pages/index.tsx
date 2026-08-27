import IntroPage from "@/components/templates/IntroPage";
import RegionPage from "@/components/templates/RegionPage";
import { usePhilipLocale } from "@/i18n/usePhilipLocale";
import Head from "next/head";

export default function Home() {
  const { locale, message } = usePhilipLocale();
  const canonicalUrl =
    locale === "en" ? "https://philip69.com/en" : "https://philip69.com/";

  return (
    <>
      <Head>
        <title>{message.home.title}</title>
        <meta name="description" content={message.home.description} />
        <meta name="keywords" content={message.home.keywords} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="ko" href="https://philip69.com/" />
        <link rel="alternate" hrefLang="en" href="https://philip69.com/en" />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://philip69.com/"
        />
      </Head>
      <IntroPage />
      <RegionPage />
    </>
  );
}
