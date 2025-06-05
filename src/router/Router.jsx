import { createBrowserRouter } from "react-router";
import Layout from "../Layout/Layout";
import App from "./../App";
import Login from "./../pages/Login";
import Register from "./../pages/Register";
import PrivateRoute from "../components/PrivateRoute";
import NotFound from "./../pages/NotFound";
import CreateAssignment from './../pages/CreateAssignment';
import AssignmentsPage from "../pages/AssignmentsPage";
import MySubmittedAssignments from "../pages/MySubmittedAssignments";
import PendingAssignmentsPage from "../pages/PendingAssignmentsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: App },
      {
        path: "assignments",
        element: (
            <AssignmentsPage></AssignmentsPage>
        ),
      },
      {
        path: "create",
        element: (
          <PrivateRoute>
            <CreateAssignment></CreateAssignment>
          </PrivateRoute>
        ),
      },
      {
        path: "submissions",
        element: (
          <PrivateRoute>
            <MySubmittedAssignments></MySubmittedAssignments>
          </PrivateRoute>
        ),
      },
      {
        path: "pending",
        element: (
          <PrivateRoute>
            <PendingAssignmentsPage></PendingAssignmentsPage>
          </PrivateRoute>
        ),
      },
      // {
      //   path: "tipDetails/:id",
      //   loader: ({ params }) =>
      //     fetch(`https://gardening-hub-server.vercel.app/tips/${params.id}`),
      //   element: (
      //     <PrivateRoute>
      //       <TipDetails></TipDetails>
      //     </PrivateRoute>
      //   ),
      // },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "*", Component: NotFound },
    ],
  },
  { path: "*", Component: NotFound },
]);
