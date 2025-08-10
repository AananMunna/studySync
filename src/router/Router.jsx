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
import AssignmentDetails from "../pages/AssignmentDetails";
import axios from "axios";
import UpdateAssignment from "../components/UpdateAssignment";
import Contact from "../pages/Contact";
import HelpCenter from "../pages/HelpCenter";
import PrivacyPolicy from "../pages/PrivacyPolicy";

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
      {
        path: "/assignment/view/:id",
        loader: ({params}) => axios.get(`${import.meta.env.VITE_URL}/get-one-assignment/${params.id}`),
        element: (
          <PrivateRoute>
            <AssignmentDetails></AssignmentDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/assignment/update/:id",
        loader: ({params}) => axios.get(`${import.meta.env.VITE_URL}/get-one-assignment/${params.id}`),
        element: (
          <PrivateRoute>
            <UpdateAssignment></UpdateAssignment>
          </PrivateRoute>
        ),
      },
      { path: "login", Component: Login },
      { path: "contact", Component: Contact },
      { path: "help", Component: HelpCenter },
      { path: "privacy", Component: PrivacyPolicy },
      { path: "register", Component: Register },
      { path: "*", Component: NotFound },
    ],
  },
  { path: "*", Component: NotFound },
]);
