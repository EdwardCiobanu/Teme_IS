import {useLocation, useNavigate} from "react-router-dom";

export default function HomePage() {

    const navigate = useNavigate();
    const location = useLocation();
    const id = parseInt(location.state?.key, 10);
    if(id == 1) navigate("/Admin");
    else navigate("/Angajat")
    console.log(id);

    return <div>Prima componenta</div>
}