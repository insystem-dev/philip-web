/** JWT payload 안전 디코드 — atob는 base64url의 '-', '_' 문자에서 예외가 발생하므로 변환 후 디코드 */
export function decodeJwtPayload(token: string): any | null {
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

/** JWT exp 필드로 만료 여부 확인 (서명 검증 없음, 파싱 불가 시 만료로 간주) */
export function isTokenExpired(token: string): boolean {
  const payload = decodeJwtPayload(token);
  if (!payload?.exp) return true;
  return payload.exp * 1000 < Date.now();
}

/**
 * localStorage의 관리자 토큰 조회.
 * 만료·손상된 admin 토큰은 자동 삭제하고 null을 반환한다 —
 * 죽은 토큰을 그대로 실어 보내 관리자 화면 요청이 401로 반복 실패하는 것을 막는다.
 */
export async function readAdminAccessToken() {
  try {
    const admin = JSON.parse(localStorage.getItem("admin")!);
    if (!admin?.accessToken || isTokenExpired(admin.accessToken)) {
      if (admin) localStorage.removeItem("admin");
      return null;
    }
    return admin;
  } catch {
    return null;
  }
}
