import { useState } from "react";
import { useRouter } from "next/router";
import { checkUserIdAPI, localSignupAPI } from "@/apis/kakaoApi";
import * as S from "@/components/templates/UserSignupPage/userSignupPage.style";

export default function UserSignup() {
  const router = useRouter();
  const [form, setForm] = useState({ userId: "", name: "", email: "", phoneNumber: "", password: "", termsAgreed: false });
  const [checkedId, setCheckedId] = useState("");
  const [loading, setLoading] = useState(false);
  const change = (key: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key === "userId") setCheckedId("");
  };
  const checkId = async () => {
    if (!/^[a-zA-Z0-9_]{4,30}$/.test(form.userId)) return alert("아이디는 영문, 숫자, 밑줄로 4~30자 입력해 주세요.");
    try { await checkUserIdAPI(form.userId); setCheckedId(form.userId); alert("사용 가능한 아이디입니다."); }
    catch (e: any) { setCheckedId(""); alert(e?.response?.data?.message || "이미 사용 중인 아이디입니다."); }
  };
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.termsAgreed) return alert("개인정보 수집 및 이용에 동의해 주세요.");
    if (checkedId !== form.userId) return alert("아이디 중복검사를 완료해 주세요.");
    if (form.password.length < 8) return alert("비밀번호는 8자 이상 입력해 주세요.");
    try { setLoading(true); await localSignupAPI(form); alert("회원가입이 완료되었습니다."); router.replace("/auth/login"); }
    catch (err: any) { alert(err?.response?.data?.message || "회원가입에 실패했습니다."); }
    finally { setLoading(false); }
  };
  return <S.Page><S.Card><S.Title>일반 회원가입</S.Title><S.Form onSubmit={submit}>
    <S.IdRow><S.Input required placeholder="아이디 (영문/숫자 4~30자)" value={form.userId} onChange={(e) => change("userId", e.target.value)} /><S.CheckButton type="button" onClick={checkId}>중복검사</S.CheckButton></S.IdRow>
    {checkedId === form.userId && <S.Valid>사용 가능한 아이디입니다.</S.Valid>}
    <S.Input required placeholder="이름" value={form.name} onChange={(e) => change("name", e.target.value)} />
    <S.Input required type="email" placeholder="이메일" value={form.email} onChange={(e) => change("email", e.target.value)} />
    <S.Input required type="tel" placeholder="전화번호" value={form.phoneNumber} onChange={(e) => change("phoneNumber", e.target.value)} />
    <S.Input required type="password" minLength={8} placeholder="비밀번호 (8자 이상)" value={form.password} onChange={(e) => change("password", e.target.value)} />
    <S.Terms><strong>개인정보 수집 및 이용 동의</strong><p>회원가입과 서비스 제공을 위해 아이디, 이름, 이메일, 전화번호를 수집하며 회원 탈퇴 시까지 보관합니다.</p><label><input type="checkbox" checked={form.termsAgreed} onChange={(e) => change("termsAgreed", e.target.checked)} /> 개인정보 수집 및 이용에 동의합니다.</label></S.Terms>
    <S.Submit type="submit" disabled={loading || !form.termsAgreed}>{loading ? "가입 중..." : "회원가입"}</S.Submit>
    <S.Back type="button" onClick={() => router.push("/auth/login")}>로그인으로 돌아가기</S.Back>
  </S.Form></S.Card></S.Page>;
}
