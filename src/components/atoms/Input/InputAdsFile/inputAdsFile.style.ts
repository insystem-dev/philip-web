import styled, { css, keyframes } from "styled-components";

const fadeSlide = keyframes`
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: none;
  }
`;

/** 배너 1개 = 카드 1장 */
export const InputFile = styled.section`
  display: flex;
  border: 1px solid ${(props) => props.theme.colors.adminInputBorder};
  border-radius: 8px;
  background: ${(props) => props.theme.colors.white};
  flex-direction: column;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &:focus-within {
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(68, 98, 255, 0.08);
  }
`;

export const CardHead = styled.div`
  display: flex;
  padding: 10px 14px;
  border-bottom: 1px solid ${(props) => props.theme.colors.adminDivider};
  align-items: center;
  gap: 6px;
`;

export const CardTitle = styled.strong`
  overflow: hidden;
  margin-right: auto;
  color: ${(props) => props.theme.colors.adminMainTxt};
  font-size: 1.35rem;
  font-weight: 700;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

/** 연결 상태 칩 (linked = 연결됨 / none = 연결 없음 / dirty = 저장 필요) */
export const StatusChip = styled.span<{ $tone: "linked" | "none" | "dirty" }>`
  display: inline-flex;
  overflow: hidden;
  max-width: 180px;
  height: 22px;
  padding: 0 9px;
  border-radius: 11px;
  font-size: 1.1rem;
  align-items: center;
  gap: 5px;
  white-space: nowrap;
  flex: none;

  &::before {
    content: "";
    width: 5px;
    height: 5px;
    border-radius: 50%;
    flex: none;
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  ${(props) =>
    props.$tone === "linked" &&
    css`
      color: ${props.theme.colors.primary};
      background: rgba(68, 98, 255, 0.09);

      &::before {
        background: ${props.theme.colors.primary};
      }
    `}

  ${(props) =>
    props.$tone === "none" &&
    css`
      color: ${props.theme.colors.adminLabelTxt};
      background: ${props.theme.colors.adminInputBg};

      &::before {
        background: ${props.theme.colors.adminPlaceholder};
      }
    `}

  ${(props) =>
    props.$tone === "dirty" &&
    css`
      color: #9a6700;
      background: #fff3d1;

      &::before {
        background: #d9a514;
      }
    `}
`;

export const CardBody = styled.div`
  display: flex;
  padding: 12px 14px 14px;
  flex-direction: column;
  gap: 12px;
`;

export const FileRow = styled.div`
  display: flex;
  gap: 8px;
`;

export const FileName = styled.div<{ $empty?: boolean }>`
  display: flex;
  overflow: hidden;
  height: 34px;
  padding: 0 11px;
  border: 1px solid ${(props) => props.theme.colors.adminInputBorder};
  border-radius: 5px;
  color: ${(props) => props.theme.colors.adminMainTxt};
  background: ${(props) => props.theme.colors.white};
  font-size: 1.25rem;
  flex: 1;
  min-width: 0;
  align-items: center;
  gap: 7px;

  svg {
    color: ${(props) => props.theme.colors.adminLabelTxt};
    flex: none;
  }

  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  ${(props) =>
    props.$empty &&
    css`
      border-style: dashed;
      color: ${props.theme.colors.adminPlaceholder};
      background: ${props.theme.colors.adminInputBg};

      svg {
        color: ${props.theme.colors.adminPlaceholder};
      }
    `}
`;

/** 이미지 등록 버튼 (숨김 file input 을 감싸는 label) */
export const UploadLabel = styled.label`
  display: flex;
  height: 34px;
  padding: 0 14px;
  border-radius: 5px;
  color: ${(props) => props.theme.colors.white};
  background: ${(props) => props.theme.colors.primary};
  font-size: 1.25rem;
  align-items: center;
  justify-content: center;
  flex: none;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: ${(props) => props.theme.colors.primaryHover};
  }
`;

/** 삭제/취소 보조 버튼 */
export const GhostButton = styled.button<{ $danger?: boolean }>`
  display: flex;
  height: 34px;
  padding: 0 14px;
  border: 1px solid ${(props) => props.theme.colors.adminInputBorder};
  border-radius: 5px;
  color: ${(props) =>
    props.$danger ? props.theme.colors.red : props.theme.colors.func};
  background: ${(props) => props.theme.colors.white};
  font-size: 1.25rem;
  align-items: center;
  justify-content: center;
  flex: none;
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease;

  &:hover {
    border-color: ${(props) =>
      props.$danger ? props.theme.colors.red : props.theme.colors.func};
    background: ${(props) => props.theme.colors.whiteHover};
  }
`;

export const LinkSection = styled.div`
  display: flex;
  padding-top: 12px;
  border-top: 1px solid ${(props) => props.theme.colors.adminDivider};
  flex-direction: column;
  gap: 9px;
`;

export const LinkCaption = styled.div`
  display: flex;
  color: ${(props) => props.theme.colors.adminLabelTxt};
  font-size: 1.15rem;
  font-weight: 700;
  align-items: center;
  gap: 5px;
`;

/** 연결 방식 세그먼트 (연결 없음 / 등록 업체 / 외부 URL) */
export const SegmentTrack = styled.div`
  display: grid;
  width: min(320px, 100%);
  padding: 3px;
  border-radius: 7px;
  background: #eef0f4;
  grid-template-columns: repeat(3, 1fr);
  gap: 3px;
`;

export const SegmentButton = styled.button<{ $active: boolean }>`
  height: 28px;
  border: 0;
  border-radius: 5px;
  color: ${(props) => props.theme.colors.adminLabelTxt};
  background: transparent;
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    color: ${(props) => props.theme.colors.adminMainTxt};
  }

  &:focus-visible {
    outline: 2px solid ${(props) => props.theme.colors.primary};
    outline-offset: 1px;
  }

  ${(props) =>
    props.$active &&
    css`
      color: ${props.theme.colors.primary};
      background: ${props.theme.colors.white};
      font-weight: 700;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);

      &:hover {
        color: ${props.theme.colors.primary};
      }
    `}
`;

/** 모드별 입력 패인 (전환 시 살짝 내려오며 등장) */
export const ModePane = styled.div`
  animation: ${fadeSlide} 0.16s ease;

  /* 카드 안에서는 업체 셀렉트 트리거를 입력 규격(34px)에 맞춘다 */
  button[aria-haspopup="listbox"] {
    height: 34px;
    border-radius: 5px;
  }
`;

export const LinkUrlInput = styled.input`
  width: 100%;
  height: 34px;
  padding: 0 11px;
  border: 1px solid ${(props) => props.theme.colors.adminInputBorder};
  border-radius: 5px;
  background: ${(props) => props.theme.colors.white};
  outline: none;
  font-size: 1.25rem;

  &::placeholder {
    color: ${(props) => props.theme.colors.adminPlaceholder};
  }

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

export const UrlError = styled.p`
  margin-top: 5px;
  color: ${(props) => props.theme.colors.red};
  font-size: 1.1rem;
`;

/** 이미지 없이 링크만 설정한 경우 안내 */
export const LinkWarn = styled.p`
  padding: 7px 10px;
  border-radius: 5px;
  color: #9a6700;
  background: #fff3d1;
  font-size: 1.15rem;
`;
