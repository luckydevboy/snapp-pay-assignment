import { ReactNode } from "react";

import ReactQueryProvider from "./react-query-provider";
import { ThemeProvider } from "./theme-provider";

type Props = {
  children: ReactNode;
};

const Providers = ({ children }: Props) => {
  return (
    <ReactQueryProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {children}
      </ThemeProvider>
    </ReactQueryProvider>
  );
};

export default Providers;
