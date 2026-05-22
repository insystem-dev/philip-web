import Geocode from "react-geocode";

Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "");
Geocode.setLanguage("ko");

// 기본 좌표 (서울 중심)
const DEFAULT_LOCATION = { lat: 37.5665, lng: 126.978 };

const GeoCode = async (currentAddr: string): Promise<{ lat: number; lng: number }> => {
  // 주소가 없거나 빈 문자열이면 기본값 반환
  if (!currentAddr || currentAddr.trim() === "") {
    console.warn("GeoCode: 주소가 비어있습니다.");
    return DEFAULT_LOCATION;
  }

  try {
    const response = await Geocode.fromAddress(currentAddr);

    if (response.results && response.results.length > 0) {
      const { lat, lng } = response.results[0].geometry.location;
      return { lat, lng };
    }

    console.warn("GeoCode: 결과가 없습니다.", currentAddr);
    return DEFAULT_LOCATION;
  } catch (err) {
    console.error("GeoCode 에러:", err);
    return DEFAULT_LOCATION;
  }
};

export default GeoCode;
