import Head from "next/head";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
// 내부 경로가 아닌 공식 진입점에서 Script import
import Script from "next/script";
import { useState } from "react";
import { RecoilRoot, useRecoilState } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components";
import Header from "@/components/organisms/Header";
import MobileHeader from "@/components/organisms/MobileHeader";
import { Nav } from "@/components/organisms/Nav";
import { Footer } from "@/components/organisms/Footer";
import useWindowWidth from "@/lib/hooks/useWindowWidth";
import { GlobalStyle } from "@/styles/global-style";
import { theme } from "@/styles/theme";
import "@/styles/globals.css";

import HeadersTokenProvider from "@/components/templates/HeadersTokenProvider";
import "devextreme/dist/css/dx.light.compact.css";
import { ReactQueryDevtools } from "react-query/devtools";

declare global {
  // Kakao 함수를 전역에서 사용할 수 있도록 선언
  interface Window {
    Kakao: any;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isWindowWidth = useWindowWidth();

  // QueryClient를 최초 렌더 시 1회만 생성 (매 렌더마다 캐시가 초기화되는 문제 방지)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnMount: true,
            refetchOnWindowFocus: true,
            staleTime: 1000 * 10,
            cacheTime: Infinity,
          },
        },
      })
  );

  function kakaoInit() {
    // 페이지가 로드되면 실행
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
  }

  return (
    <>
      <Head>
        <title>PHILIP</title>
        {/* 모바일 대응 viewport 설정 (Next.js 권장 위치) */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <GlobalStyle />
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Script
            src="https://developers.kakao.com/sdk/js/kakao.js"
            onLoad={kakaoInit}
          />
          {/* HeadersTokenProvider가 만료 시 렌더하는 AlertModal도 테마를 쓸 수 있도록 ThemeProvider 안쪽에 위치 */}
          <ThemeProvider theme={theme}>
            <HeadersTokenProvider>
              {router.pathname.includes("main") ||
              router.pathname.includes("auth") ? (
                <>
                  {isWindowWidth < 769 ? <MobileHeader /> : <Header />}
                  <Nav />
                  <Component {...pageProps} />
                  <Footer />
                </>
              ) : router.pathname.includes("admin") ? (
                <>
                  <Component {...pageProps} />
                </>
              ) : (
                <>
                  {isWindowWidth < 769 ? <MobileHeader /> : <Header />}
                  {/* <Nav /> */}
                  <Component {...pageProps} />
                </>
              )}
            </HeadersTokenProvider>
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}
