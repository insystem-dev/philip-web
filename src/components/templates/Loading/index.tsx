import { Container } from "./loading.styles";

export default function Loading(props: any) {
  return (
    <Container className={`${props.type === "page" ? "page-load-wrap" : ""}`}>
      <div className="loader loader-1"></div>
      <div className="loading-txt">{props.text}</div>
    </Container>
  );
}
