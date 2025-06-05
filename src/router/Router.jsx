import { createBrowserRouter } from "react-router";
import Layout from "../Layout/Layout";
import App from "./../App";
import ExploreGardeners from "./../pages/ExploreGardeners";
import BrowseTips from "./../pages/BrowseTips";
import ShareTip from "./../pages/ShareTip";
import MyTips from "./../pages/MyTips";
import Login from "./../pages/Login";
import Register from "./../pages/Register";
import TipDetails from "./../pages/TipDetails";
import PrivateRoute from "../components/PrivateRoute";
import UpdateTip from "../pages/UpdateTip";
import NotFound from "./../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: App },
      { path: "ExploreGardeners", Component: ExploreGardeners },
      { path: "BrowseTips", Component: BrowseTips },
      {
        path: "ShareTip",
        element: (
          <PrivateRoute>
            <ShareTip></ShareTip>
          </PrivateRoute>
        ),
      },
      {
        path: "MyTips",
        element: (
          <PrivateRoute>
            <MyTips></MyTips>
          </PrivateRoute>
        ),
      },
      {
        path: "tip/:id",
        loader: ({ params }) =>
          fetch(`https://gardening-hub-server.vercel.app/tips/${params.id}`),
        element: (
          <PrivateRoute>
            <UpdateTip></UpdateTip>
          </PrivateRoute>
        ),
      },
      {
        path: "tipDetails/:id",
        loader: ({ params }) =>
          fetch(`https://gardening-hub-server.vercel.app/tips/${params.id}`),
        element: (
          <PrivateRoute>
            <TipDetails></TipDetails>
          </PrivateRoute>
        ),
      },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "*", Component: NotFound },
    ],
  },
  { path: "*", Component: NotFound },
]);
