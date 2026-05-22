export async function readAdminAccessToken() {
  return await JSON.parse(localStorage.getItem("admin")!);
}
