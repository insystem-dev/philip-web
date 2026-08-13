import IntroPage from "@/components/templates/IntroPage";
import RegionPage from "@/components/templates/RegionPage";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>필립69 PHILIP69 | 필리핀 한인 업체 정보</title>
        <meta
          name="description"
          content="필립, 필립69, PHILIP, PHILIP69에서 필리핀 지역별 한인 업체 정보를 확인하세요."
        />
        <meta
          name="keywords"
          content="필립, 필립69, philip, philip69"
        />
        <link rel="canonical" href="https://philip69.com/" />
      </Head>
      <IntroPage />
      <RegionPage />
    </>
  );
}
