import { RouteObject, createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Produs from "../Pages/Produs";
import SignUp from "../Pages/SignUp";
import HomePage from "../Pages/HomePage";
import Admin from "../Pages/Admin";
import Angajati from "../Pages/Angajati";
import Mese from "../Pages/Mese";
import Persoane from "../Pages/Persoane";
import Angajat from "../Pages/Angajat";
import AdaugProductClient from "../Pages/AdaugProductClient";
import VizualizareProdusePersoana from "../Pages/VizualizareProdusePersoana";

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
        path: "/Admin",
        element: <Admin />
    },
    {
        path: "/Angajat",
        element: <Angajat />
    },
    {
        path: "/Angajati",
        element: <Angajati />
    },
    {
        path: "/Mese",
        element: <Mese />
    },
    {
        path: "/Persoane",
        element: <Persoane />
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
        path: "/VizualizareProdusePersoana",
        element: <VizualizareProdusePersoana />
    },
    {
        path: "/SignUp",
        element: <SignUp />
    },
    {
        path: "/AdaugProductClient",
        element: <AdaugProductClient />
    }


];

export const router = createBrowserRouter(routes)