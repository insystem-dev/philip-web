import styled from "styled-components";

export const Page = styled.main`
  min-height: calc(100vh - 180px);
  padding: 64px 24px 100px;
  color: white;
  background: ${(props) => props.theme.colors.mainBg};

  @media screen and (max-width: 768px) {
    padding: 38px 18px 72px;
  }
`;

export const Shell = styled.div`
  width: min(1080px, 100%);
  margin: 0 auto;
`;

export const Hero = styled.header`
  max-width: 760px;
  margin: 0 auto 46px;
  text-align: center;

  span {
    display: inline-flex;
    padding: 8px 14px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 999px;
    color: #bfc8ff;
    background: rgba(68, 98, 255, 0.14);
    font-size: 1.3rem;
    font-weight: 700;
    letter-spacing: 0.06em;
  }

  h1 {
    margin: 20px 0 12px;
    font-size: clamp(3.2rem, 6vw, 5.8rem);
    line-height: 1.08;
  }

  p {
    color: #c6c6c6;
    font-size: 1.7rem;
    line-height: 1.65;
  }
`;

export const AuthArea = styled.section`
  overflow: hidden;
  width: min(620px, 100%);
  margin: 0 auto;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 24px;
  background: rgba(33, 33, 33, 0.88);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.32);

  > section {
    min-height: auto;
    padding: 46px 24px;
  }

  > section > div,
  > section > form {
    width: min(420px, 100%);
  }

  @media screen and (max-width: 768px) {
    > section {
      padding: 36px 24px;
    }
  }
`;

export const GateCopy = styled.div`
  padding: 34px 24px 0;
  text-align: center;

  strong {
    display: block;
    margin-bottom: 8px;
    font-size: 2rem;
  }

  p {
    color: #bababa;
    font-size: 1.4rem;
    line-height: 1.55;
  }
`;

export const Status = styled.div`
  padding: 100px 20px;
  color: #c6c6c6;
  font-size: 1.6rem;
  text-align: center;
`;

export const EventHeader = styled.div`
  display: flex;
  margin-bottom: 24px;
  align-items: end;
  justify-content: space-between;
  gap: 20px;

  h2 {
    font-size: 2.6rem;
  }

  p {
    margin-top: 6px;
    color: #a9a9a9;
    font-size: 1.4rem;
  }

  em {
    color: #9eabff;
    font-size: 1.4rem;
    font-style: normal;
    white-space: nowrap;
  }
`;

export const EventGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;

  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media screen and (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const EventCard = styled.li`
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  background: ${(props) => props.theme.colors.darkHover};
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.28);
  transition:
    transform 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    border-color: rgba(68, 98, 255, 0.72);
    transform: translateY(-4px);
  }

  button {
    display: block;
    overflow: hidden;
    width: 100%;
    padding: 0;
    border: 0;
    border-radius: inherit;
    color: inherit;
    background: ${(props) => props.theme.colors.darkHover};
    cursor: pointer;
    text-align: left;
  }
`;

export const Thumbnail = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  background: ${(props) => props.theme.colors.dark};

  span {
    position: absolute;
    top: 14px;
    left: 14px;
    z-index: 1;
    padding: 7px 10px;
    border-radius: 999px;
    color: white;
    background: #4462ff;
    font-size: 1.1rem;
    font-weight: 700;
  }
`;

export const CardBody = styled.div`
  padding: 20px;
  background: ${(props) => props.theme.colors.darkHover};

  small {
    display: block;
    margin-bottom: 8px;
    color: #9eabff;
    font-size: 1.2rem;
  }

  strong {
    display: block;
    overflow: hidden;
    color: white;
    font-size: 1.8rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  p {
    margin-top: 14px;
    color: #bdbdbd;
    font-size: 1.3rem;
  }
`;

export const Empty = styled.div`
  padding: 80px 24px;
  border: 1px dashed rgba(255, 255, 255, 0.18);
  border-radius: 18px;
  color: #aaa;
  font-size: 1.5rem;
  text-align: center;
`;
