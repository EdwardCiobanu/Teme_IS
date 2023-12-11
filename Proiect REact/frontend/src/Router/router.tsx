import { RouteObject, createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Produs from "../Pages/Produs";
import SignUp from "../Pages/SignUp";
import HomePage from "../Pages/HomePage";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <div>First Page</div>
    },
    {
        path: "/HomePage",
        element: <HomePage />
    },
    {
        path: "/Login",
        element: <Login />
    },
    {
        path: "/Produs",
        element: <Produs />
    },
    {
        path: "/SignUp",
        element: <SignUp />
    },


];

export const router = createBrowserRouter(routes)