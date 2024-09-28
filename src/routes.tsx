import { RouteObject } from "react-router-dom";

import { Contact, Home } from "@/components/pages";
import { Root } from "@/components";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    errorElement: <div className="p-4">Not found!</div>,
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
