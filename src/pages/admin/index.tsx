import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: "/admin/login",
    permanent: false,
  },
});

const AdminIndexPage = () => null;

export default AdminIndexPage;
