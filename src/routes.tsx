import { RouteObject } from "react-router-dom";

import { Contact, Home } from "@/components/pages";
import { Root } from "@/components";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    // TODO: add error page
    errorElement: <>Not found!</>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contacts/:id",
        element: <Contact />,
      },
    ],
  },
];

export default routes;
