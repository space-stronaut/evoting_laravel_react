import { Link } from "react-router-dom"
import { useRecoilState } from "recoil"
import { authenticated } from "../store/authStore"

export default function Navigation(){
    const [auth, setAuth] = useRecoilState(authenticated)

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
            <Link className="navbar-brand" to="/">Navbar</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
                {
                    auth.check === false ? (
                        <li className="nav-item">
                            <Link className="nav-link btn btn-primary text-white" to={"/login"}>Login</Link>
                        </li>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/"}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/about"}>About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/about"}>{auth.user.name}</Link>
                            </li>
                        </>
                    )
                }
            </ul>
            </div>
        </div>
        </nav>
    )
}