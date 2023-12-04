import { RouteObject, createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Produs from "../Pages/Produs";
import SignUp from "../Pages/SignUp"

const routes: RouteObject[] = [
    {
        path: "/",
        element: <div>First Page</div>
    },
    {
        path: "/Home",
        element: <div>Prima componenta</div>
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