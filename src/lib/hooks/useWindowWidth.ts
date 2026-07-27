import { useCallback, useEffect, useRef, useState } from "react";

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  // debounce 타이머를 ref에 보관 (렌더 간 유지되어 clearTimeout이 실제 동작)
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const resizeWindow = useCallback(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      // 현재 window width 값
      setWindowWidth(window.innerWidth);
    }, 500);
  }, []);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", resizeWindow);
    return () => {
      window.removeEventListener("resize", resizeWindow);
      // 언마운트 시 대기 중인 타이머 정리
      clearTimeout(timerRef.current);
    };
  }, [resizeWindow]);

  return windowWidth;
};

export default useWindowWidth;
