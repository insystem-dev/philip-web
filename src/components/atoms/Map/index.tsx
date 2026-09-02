import styled from "styled-components";
import { usePhilipLocale } from "@/i18n/usePhilipLocale";

const Wrapper = styled.div`
  .map-container {
    display: block;
    width: 100%;
    height: 540px;
    border: 0;
  }
`;

const Map = ({ address }: { address?: string }) => {
  const { locale, message } = usePhilipLocale();
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  if (!apiKey) {
    return (
      <Wrapper>
        <div
          className="map-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f0f0f0",
          }}
        >
          <p>{message.common.mapKeyMissing}</p>
        </div>
      </Wrapper>
    );
  }

  if (!address?.trim()) {
    return null;
  }

  const params = new URLSearchParams({
    key: apiKey,
    q: address.trim(),
    zoom: "16",
    language: locale,
    region: "PH",
  });

  return (
    <Wrapper>
      <iframe
        className="map-container"
        title={locale === "ko" ? `${address} 위치 지도` : `Map for ${address}`}
        src={`https://www.google.com/maps/embed/v1/place?${params.toString()}`}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </Wrapper>
  );
};

export default Map;
