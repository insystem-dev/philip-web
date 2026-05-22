import { GoogleMap, LoadScriptNext, MarkerF } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GeoCode from "@/lib/Google-geocode";

const Wrapper = styled.div`
  .map-container {
    width: 100%;
    height: 540px;
  }
`;

interface LocationProps {
  lat: number;
  lng: number;
}

// 기본 좌표 (서울 중심)
const DEFAULT_CENTER: LocationProps = { lat: 37.5665, lng: 126.978 };

const Map = ({ address }: { address?: string }) => {
  const [location, setLocation] = useState<LocationProps>(DEFAULT_CENTER);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!address) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    GeoCode(address)
      .then((res) => {
        // lat, lng이 유효한 숫자인지 확인
        if (
          res &&
          typeof res.lat === "number" &&
          typeof res.lng === "number" &&
          !isNaN(res.lat) &&
          !isNaN(res.lng)
        ) {
          setLocation({ lat: res.lat, lng: res.lng });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [address]);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  // API 키가 없으면 메시지 표시
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
          <p>Google Maps API 키가 설정되지 않았습니다.</p>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <LoadScriptNext googleMapsApiKey={apiKey}>
        <GoogleMap
          clickableIcons={true}
          zoom={16}
          center={location}
          mapContainerClassName="map-container"
        >
          {!isLoading && <MarkerF position={location} />}
        </GoogleMap>
      </LoadScriptNext>
    </Wrapper>
  );
};

export default Map;
