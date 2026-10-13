import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useRecoilState } from "recoil";
import { getMonthlyEventPosts } from "@/apis/eventApi";
import { userTokenState } from "@/recoil/userToken";
import { isTokenExpired } from "@/lib/accesToken";
import Login from "@/pages/auth/login";
import UserSignup from "@/pages/auth/signup";
import * as S from "@/components/templates/EventPage/eventPage.style";

type AuthView = "login" | "signup";

const EventPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [userToken, setUserToken] = useRecoilState(userTokenState);
  const [authReady, setAuthReady] = useState(false);
  const [authView, setAuthView] = useState<AuthView>("login");
  const locale = router.locale === "en" ? "en" : "ko";
  const copy =
    locale === "en"
      ? {
          badge: "MEMBERS ONLY",
          title: "Monthly Member Deals",
          intro: "Discover Philip's selected promotions and partner discounts.",
          gateTitle: "Sign in to view member benefits",
          gateBody:
            "This page is available only to registered members. Sign in or create an account below.",
          listTitle: "This month's promotions",
          listBody: "Select a partner to see the full benefit details.",
          count: (value: number) => `${value} deals`,
          loading: "Loading member benefits…",
          empty: "There are no active promotions at the moment.",
          benefit: "Member benefit",
          detail: "View benefit details →",
        }
      : {
          badge: "회원 전용",
          title: "이달의 필립 이벤트",
          intro: "필립이 선별한 프로모션과 제휴 업체 할인 혜택을 확인하세요.",
          gateTitle: "로그인 후 혜택을 확인할 수 있습니다",
          gateBody:
            "회원 전용 페이지입니다. 아래에서 로그인하거나 새로 가입해주세요.",
          listTitle: "이달의 프로모션",
          listBody: "업체를 선택하면 자세한 혜택과 정보를 확인할 수 있습니다.",
          count: (value: number) => `총 ${value}개 혜택`,
          loading: "회원 혜택을 불러오는 중입니다…",
          empty: "현재 진행 중인 프로모션이 없습니다.",
          benefit: "회원 혜택",
          detail: "혜택 자세히 보기 →",
        };

  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat(locale === "ko" ? "ko-KR" : "en-US", {
        year: "numeric",
        month: "long",
        timeZone: "Asia/Manila",
      }).format(new Date()),
    [locale]
  );

  // 공용 로그인 라우트로 보내지 않고 이벤트 페이지 자체에서 토큰을 복원한다.
  useEffect(() => {
    const storedToken = localStorage.getItem("kakaoSignKey");
    if (storedToken && !isTokenExpired(storedToken)) {
      setUserToken(storedToken);
    } else if (storedToken) {
      localStorage.removeItem("kakaoSignKey");
      setUserToken(null);
    }
    setAuthReady(true);
  }, [setUserToken]);

  const { data: events, isLoading } = useQuery(
    ["monthlyMemberEvents", locale],
    getMonthlyEventPosts,
    {
      enabled: authReady && !!userToken,
      retry: false,
      onError(error: any) {
        if (error?.response?.status === 401) {
          localStorage.removeItem("kakaoSignKey");
          setUserToken(null);
          queryClient.removeQueries("monthlyMemberEvents");
        }
      },
    }
  );

  return (
    <>
      <Head>
        <title>{copy.title} | PHILIP</title>
        <meta name="description" content={copy.intro} />
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <S.Page>
        <S.Shell>
          <S.Hero>
            <span>{copy.badge}</span>
            <h1>{copy.title}</h1>
            <p>{copy.intro}</p>
          </S.Hero>

          {!authReady ? (
            <S.Status>{copy.loading}</S.Status>
          ) : !userToken ? (
            <S.AuthArea>
              <S.GateCopy>
                <strong>{copy.gateTitle}</strong>
                <p>{copy.gateBody}</p>
              </S.GateCopy>
              {authView === "login" ? (
                <Login
                  onLoginSuccess={() => setAuthView("login")}
                  onSignup={() => setAuthView("signup")}
                />
              ) : (
                <UserSignup
                  onSignupComplete={() => setAuthView("login")}
                  onBack={() => setAuthView("login")}
                />
              )}
            </S.AuthArea>
          ) : isLoading ? (
            <S.Status>{copy.loading}</S.Status>
          ) : (
            <section>
              <S.EventHeader>
                <div>
                  <h2>{copy.listTitle}</h2>
                  <p>{copy.listBody}</p>
                </div>
                <em>
                  {monthLabel} · {copy.count(events?.length ?? 0)}
                </em>
              </S.EventHeader>

              {events?.length ? (
                <S.EventGrid>
                  {events.map((event) => (
                    <S.EventCard key={event.oid}>
                      <button
                        type="button"
                        onClick={() => router.push(`/main/post/${event.oid}`)}
                      >
                        <S.Thumbnail>
                          <span>{copy.benefit}</span>
                          {event.thumb && (
                            <Image
                              src={`${process.env.NEXT_PUBLIC_API_URL}/${event.thumb}`}
                              layout="fill"
                              objectFit="cover"
                              sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
                              alt={event.storeName}
                            />
                          )}
                        </S.Thumbnail>
                        <S.CardBody>
                          <small>{event.category || copy.benefit}</small>
                          <strong>{event.title}</strong>
                          <p>{event.benefit}</p>
                          <small>
                            {event.storeName} · {copy.detail}
                          </small>
                        </S.CardBody>
                      </button>
                    </S.EventCard>
                  ))}
                </S.EventGrid>
              ) : (
                <S.Empty>{copy.empty}</S.Empty>
              )}
            </section>
          )}
        </S.Shell>
      </S.Page>
    </>
  );
};

export default EventPage;
