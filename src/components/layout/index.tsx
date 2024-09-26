import { ReactNode } from "react";

import Header from "./header";

type Props = { children: ReactNode };

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto my-6">{children}</main>
    </div>
  );
};

export default Layout;
