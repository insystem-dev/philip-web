import styled, { keyframes } from "styled-components";

const rise = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Page = styled.main`
  position: relative;
  min-height: calc(100vh - 80px);
  overflow: hidden;
  padding: 28px 20px 72px;
  color: #172035;
  font-family: "Noto Sans KR", "Roboto", sans-serif;
  background:
    linear-gradient(120deg, rgba(142, 10, 45, 0.92) 0 25%, transparent 46%),
    linear-gradient(240deg, rgba(3, 45, 92, 0.96) 0 26%, transparent 47%),
    #0d1727;

  &, button, input, textarea, select {
    font-family: "Noto Sans KR", "Roboto", sans-serif;
  }

  @media (max-width: 768px) {
    min-height: calc(100vh - 64px);
    padding: 0 0 48px;
  }
`;

export const FlagGlow = styled.div`
  position: fixed;
  inset: 64px 0 auto 50%;
  width: min(80vw, 1100px);
  height: 70vh;
  background: radial-gradient(circle at 50% 20%, rgba(255, 219, 81, 0.16), transparent 54%);
  transform: translateX(-50%);
  pointer-events: none;
`;

export const Shell = styled.div`
  position: relative;
  width: min(720px, 100%);
  margin: 0 auto;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 26px;
  background: #f4f0e8;
  box-shadow: 0 30px 100px rgba(0, 0, 0, 0.42);
  animation: ${rise} 0.45s cubic-bezier(0.22, 1, 0.36, 1);

  @media (max-width: 768px) {
    border: 0;
    border-radius: 0;
    box-shadow: none;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Hero = styled.header`
  position: relative;
  min-height: 450px;
  overflow: hidden;
  padding: 44px 42px;
  color: #fff8df;
  background:
    linear-gradient(138deg, transparent 0 52%, rgba(255, 255, 255, 0.05) 52.2% 52.8%, transparent 53%),
    radial-gradient(circle at 86% 12%, rgba(255, 223, 93, 0.2), transparent 28%),
    linear-gradient(145deg, #213047, #09192c 64%, #061322);

  &::after {
    content: "";
    position: absolute;
    right: -100px;
    bottom: -170px;
    width: 420px;
    height: 420px;
    border: 1px solid rgba(255, 221, 96, 0.12);
    border-radius: 50%;
    box-shadow: 0 0 0 38px rgba(255, 221, 96, 0.025), 0 0 0 76px rgba(255, 221, 96, 0.018);
  }

  @media (max-width: 640px) {
    min-height: 440px;
    padding: 34px 24px 40px;
  }
`;

export const Eyebrow = styled.p`
  position: relative;
  z-index: 1;
  color: #f4d55e;
  font-family: inherit;
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: 0.18em;
`;

export const Deadline = styled.span`
  position: absolute;
  z-index: 2;
  top: 38px;
  right: 36px;
  display: flex;
  padding: 7px 12px;
  border: 1px solid rgba(255, 223, 93, 0.34);
  border-radius: 999px;
  color: #fff0ae;
  background: rgba(255, 222, 88, 0.08);
  font-size: 1.2rem;
  font-weight: 800;
  line-height: 1.2;
  text-align: center;
  flex-direction: column;

  @media (max-width: 640px) {
    top: 28px;
    right: 20px;
  }
`;

export const HeroTitle = styled.h1`
  position: relative;
  z-index: 1;
  margin: 54px 0 18px;
  font-family: inherit;
  font-size: clamp(4.2rem, 10vw, 7rem);
  font-weight: 700;
  line-height: 0.98;
  letter-spacing: -0.07em;
  text-shadow: 0 8px 34px rgba(0, 0, 0, 0.34);
`;

export const HeroEnglishTitle = styled.span`
  display: block;
  max-width: 440px;
  margin-top: 12px;
  color: rgba(255, 248, 223, 0.62);
  font-family: "Roboto", "Noto Sans KR", sans-serif;
  font-size: clamp(1.4rem, 3.4vw, 1.8rem);
  font-weight: 500;
  line-height: 1.28;
  letter-spacing: 0.01em;
`;

export const HeroCopy = styled.p`
  position: relative;
  z-index: 1;
  width: min(390px, 82%);
  color: rgba(255, 248, 223, 0.78);
  font-size: 1.55rem;
  line-height: 1.65;

  strong { color: #ffe47b; }
`;

export const HeroNote = styled.p`
  position: absolute;
  z-index: 1;
  left: 42px;
  bottom: 28px;
  color: rgba(255, 255, 255, 0.46);
  font-size: 1.12rem;
  line-height: 1.4;

  @media (max-width: 640px) {
    left: 24px;
    right: 24px;
    bottom: 22px;
  }
`;

export const Sun = styled.div`
  position: absolute;
  right: 62px;
  bottom: 68px;
  width: 70px;
  height: 70px;
  border: 1px solid rgba(255, 221, 77, 0.34);
  border-radius: 50%;
  transform: rotate(45deg);

  span {
    position: absolute;
    inset: 12px;
    border-radius: 50%;
    background: #ddba36;
    box-shadow: 0 0 26px rgba(255, 218, 66, 0.3);
  }

  @media (max-width: 640px) {
    right: 26px;
    bottom: 72px;
    opacity: 0.7;
  }
`;

export const Form = styled.form`
  padding: 0 34px 44px;

  @media (max-width: 640px) { padding: 0 16px 24px; }
`;

export const FormIntro = styled.div`
  display: grid;
  padding: 30px 10px 22px;
  gap: 5px;

  span { color: #9a6c00; font-size: 1.05rem; font-weight: 800; letter-spacing: 0.12em; }
  strong { font-family: inherit; font-size: 2.2rem; letter-spacing: -0.04em; }
  p { margin-top: 8px; color: #737787; font-size: 1.2rem; }
  i { color: #b21f40; font-style: normal; }
`;

export const Section = styled.section`
  margin-bottom: 14px;
  padding: 26px;
  border: 1px solid #dfd8ca;
  border-radius: 18px;
  background: #fffdf8;
  box-shadow: 0 8px 26px rgba(47, 38, 17, 0.045);

  @media (max-width: 640px) { padding: 22px 18px; border-radius: 16px; }
`;

export const SectionHead = styled.div`
  display: flex;
  margin-bottom: 24px;
  align-items: flex-start;
  gap: 13px;

  h2 { margin: 0 0 4px; font-family: inherit; font-size: 2rem; letter-spacing: -0.04em; }
  p { color: #85817a; font-size: 1.2rem; line-height: 1.5; word-break: keep-all; }
`;

export const Step = styled.span`
  display: grid;
  width: 34px;
  height: 34px;
  flex: none;
  border-radius: 10px;
  color: #0b274a;
  background: #f4d54d;
  font-family: inherit;
  font-size: 1.2rem;
  font-weight: 700;
  place-items: center;
`;

export const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px 14px;

  @media (max-width: 560px) { grid-template-columns: 1fr; }
`;

export const Field = styled.div<{ $wide?: boolean }>`
  display: grid;
  grid-column: ${(props) => (props.$wide ? "1 / -1" : "auto")};
  gap: 8px;

  label { color: #3b4050; font-size: 1.25rem; font-weight: 700; }
  label b { color: #b21f40; }

  input, textarea {
    width: 100%;
    min-height: 48px;
    padding: 12px 14px;
    border: 1px solid #d8d3ca;
    border-radius: 10px;
    outline: 0;
    color: #172035;
    background: #faf8f3;
    font: inherit;
    font-size: 16px;
    line-height: 1.5;
    transition: border-color 0.16s ease, box-shadow 0.16s ease, background 0.16s ease;
  }
  textarea { resize: vertical; }
  input::placeholder, textarea::placeholder { color: #aaa69d; }
  input:focus, textarea:focus { border-color: #173f74; background: #fff; box-shadow: 0 0 0 3px rgba(23, 63, 116, 0.1); }
`;

export const PhotoGuide = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;

  @media (max-width: 560px) { grid-template-columns: 1fr; }
`;

export const PhotoItem = styled.div`
  display: flex;
  min-height: 88px;
  padding: 14px;
  border-radius: 12px;
  background: #f1eee6;
  align-items: flex-start;
  gap: 10px;

  > span { display: grid; width: 24px; height: 24px; flex: none; border-radius: 50%; color: #fff; background: #173f74; font-size: 1.1rem; font-weight: 800; place-items: center; }
  strong { color: #353b4b; font-size: 1.2rem; line-height: 1.45; }
  p { margin-top: 4px; color: #8a8479; font-size: 1.15rem; }
`;

export const Caution = styled.div`
  display: grid;
  margin: 12px 0;
  padding: 13px 15px;
  border-left: 3px solid #c39517;
  color: #66501d;
  background: #fff6d8;
  gap: 3px;
  strong { font-size: 1.2rem; }
  span { font-size: 1.15rem; }
`;

export const CheckLabel = styled.label`
  position: relative;
  display: flex;
  color: #4c4f59;
  font-size: 1.25rem;
  line-height: 1.55;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;

  input { position: absolute; width: 1px; height: 1px; opacity: 0; }
  input + span { position: relative; width: 22px; height: 22px; flex: none; border: 1px solid #b7b3aa; border-radius: 6px; background: #fff; }
  input:checked + span { border-color: #173f74; background: #173f74; }
  input:checked + span::after { content: ""; position: absolute; left: 7px; top: 3px; width: 5px; height: 10px; border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg); }
  input:focus-visible + span { outline: 3px solid rgba(23, 63, 116, 0.18); outline-offset: 2px; }
  b { color: #a7213f; }
`;

export const CheckCopy = styled.span`
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
`;

export const Consent = styled.div`
  padding: 20px 10px;
  p { margin: 8px 0 0 32px; color: #8a867d; font-size: 1.08rem; line-height: 1.55; }
`;

export const Honeypot = styled.div`
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

export const FormError = styled.div`
  margin: 0 0 14px;
  padding: 13px 15px;
  border: 1px solid rgba(180, 30, 65, 0.22);
  border-radius: 10px;
  color: #a1193c;
  background: #fff0f3;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.5;
  white-space: pre-line;
`;

export const SubmitDock = styled.div`
  position: sticky;
  z-index: 4;
  bottom: 10px;
  padding: 10px;
  border: 1px solid rgba(21, 46, 77, 0.11);
  border-radius: 17px;
  background: rgba(244, 240, 232, 0.92);
  box-shadow: 0 14px 36px rgba(21, 32, 52, 0.16);
  backdrop-filter: blur(10px);

  p { margin: 8px 0 0; color: #858078; font-size: 1.05rem; text-align: center; }

  @media (max-width: 640px) { bottom: 6px; }
`;

export const SubmitButton = styled.button`
  display: flex;
  width: 100%;
  min-height: 66px;
  padding: 0 12px 0 20px;
  border: 0;
  border-radius: 12px;
  color: #fff8d8;
  background: linear-gradient(110deg, #183f72, #071a31);
  box-shadow: 0 8px 20px rgba(8, 29, 55, 0.25);
  font-size: 1.55rem;
  font-weight: 800;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  i { display: grid; width: 38px; height: 38px; border-radius: 10px; color: #112944; background: #f4d54d; font-style: normal; font-size: 2rem; place-items: center; }
  &:hover { background: linear-gradient(110deg, #22528c, #0b2340); }
  &:disabled { opacity: 0.65; cursor: wait; }
`;

export const SubmitLabel = styled.span`
  display: flex;
  min-width: 0;
  text-align: left;
  flex-direction: column;
`;

export const SuccessBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1200;
  display: grid;
  padding: 18px;
  background: rgba(2, 10, 21, 0.78);
  place-items: center;
`;

export const SuccessModal = styled.section`
  width: min(420px, 100%);
  padding: 34px 26px 24px;
  border: 1px solid rgba(255, 221, 91, 0.28);
  border-radius: 22px;
  color: #fff9e4;
  background: linear-gradient(150deg, #213650, #07182b 68%);
  box-shadow: 0 30px 100px rgba(0, 0, 0, 0.54);
  text-align: center;
  animation: ${rise} 0.28s ease-out;

  h2 { margin: 10px 0 12px; font-family: inherit; font-size: 2.7rem; letter-spacing: -0.05em; }
  > p { color: rgba(255, 249, 228, 0.7); font-size: 1.35rem; line-height: 1.65; word-break: keep-all; }
`;

export const SuccessMark = styled.div`
  display: grid;
  width: 52px;
  height: 52px;
  margin: 0 auto;
  border-radius: 50%;
  color: #10233b;
  background: #f2d34e;
  font-size: 2.5rem;
  font-weight: 900;
  place-items: center;
`;

export const SuccessKicker = styled.div`
  margin-top: 14px;
  color: #e2c552;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.16em;
`;

export const Receipt = styled.div`
  display: flex;
  margin: 20px 0 12px;
  padding: 12px 15px;
  border: 1px dashed rgba(255, 224, 98, 0.3);
  border-radius: 10px;
  color: rgba(255, 249, 228, 0.66);
  background: rgba(0, 0, 0, 0.14);
  font-size: 1.15rem;
  align-items: center;
  justify-content: space-between;
  strong { color: #ffe477; font-family: inherit; font-size: 1.45rem; font-variant-numeric: tabular-nums; letter-spacing: 0.08em; }
`;

export const KakaoButton = styled.button`
  width: 100%;
  min-height: 60px;
  border: 0;
  border-radius: 11px;
  color: #201c00;
  background: #f7e600;
  font-size: 1.35rem;
  font-weight: 800;
  cursor: pointer;
`;

export const DoneButton = styled.button`
  margin-top: 8px;
  width: 100%;
  min-height: 52px;
  border: 0;
  color: rgba(255, 255, 255, 0.66);
  background: transparent;
  font-size: 1.25rem;
  cursor: pointer;
`;

export const ButtonLabel = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

/** 모든 한글 문구 바로 아래에 배치하는 영어 보조 문구 */
export const EnglishLine = styled.span`
  && {
    display: block;
    margin-top: 2px;
    color: inherit;
    font-family: "Roboto", "Noto Sans KR", sans-serif;
    font-size: 0.78em;
    font-style: normal;
    font-weight: 500;
    line-height: 1.35;
    letter-spacing: 0.01em;
    opacity: 0.72;
    word-break: keep-all;
  }
`;
