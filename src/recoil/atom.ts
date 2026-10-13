import { atom, RecoilEnv } from "recoil";

/**
 * Next.js 개발 서버는 페이지 청크를 Fast Refresh 중 다시 평가할 수 있다.
 * atom 선언보다 이 모듈이 항상 먼저 실행되게 해 개발 환경에서만 Recoil의
 * 중복 key 검사를 끈다. 프로덕션 검사는 유지해 실제 중복 선언은 계속 실패시킨다.
 */
if (process.env.NODE_ENV !== "production") {
  RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;
}

export { atom };
