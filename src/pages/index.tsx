import IntroPage from "@/components/templates/IntroPage";
import RegionPage from "@/components/templates/RegionPage";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <IntroPage />
      <RegionPage />
    </>
  );
}
