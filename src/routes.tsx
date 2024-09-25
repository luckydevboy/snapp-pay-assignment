import { RouteObject } from "react-router-dom";

import { Contact, Root } from "@/components/pages";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    // TODO: add error page
    errorElement: <>Not found!</>,
    children: [
      {
        path: "/contacts/:id",
        element: <Contact />,
      },
    ],
  },
];

export default routes;
