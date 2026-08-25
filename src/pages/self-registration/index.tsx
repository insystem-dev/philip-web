import Head from "next/head";
import { SelfRegistrationPage } from "@/components/templates/SelfRegistrationPage";

const SelfRegistration = () => (
  <>
    <Head>
      <title>필립69 무료 등록 신청서 | Free Registration Application</title>
      <meta
        name="description"
        content="필립69 무료 업소 등록 및 홍보 신청서 | Philip69 free business registration and promotion application"
      />
    </Head>
    <SelfRegistrationPage />
  </>
);

export default SelfRegistration;
