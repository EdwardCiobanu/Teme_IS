import { RouteObject, createBrowserRouter } from "react-router-dom";
import { Login } from "../Pages/Login";
import { Product } from "../Pages/Product";
import Produs from "../Pages/Produs";

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
        path: "/Product",
        element: <Product />
    },
    {
        path: "/Produs",
        element: <Produs />
    },


];

export const router = createBrowserRouter(routes)