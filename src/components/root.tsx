import { Outlet } from "react-router-dom";

import { Layout } from "@/components/index.ts";

const Root = () => {
  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
};

export default Root;
