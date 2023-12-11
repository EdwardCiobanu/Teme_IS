import { useLocation } from "react-router-dom";

export default function HomePage() {

    const location = useLocation();
    const id = parseInt(location.state?.key, 10);
    console.log(id);

    return <div>Prima componenta</div>
}