import { Outlet } from "react-router-dom";

import { Layout } from "@/components";
import { useGetPassengers } from "@/apis";

const Root = () => {
  useGetPassengers();

  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
};

export default Root;
