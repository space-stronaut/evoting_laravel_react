import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useRecoilState } from "recoil"
import { authenticated } from "../store/authStore"

export default function Navigation(){
    const [auth, setAuth] = useRecoilState(authenticated)
    const navigate = useNavigate()

    const logout = async() => {
       await axios.get('/api/logout')

        localStorage.removeItem('token')

        setAuth({
            check : false
        })
        navigate('/login')
        toast.error("Kamu Telah Logout!")
    }

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
                                <Link className="nav-link" to={"/kecamatan"}>Kecamatan</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/desa"}>Desa</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/calon"}>Daftar Calon</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="javascript:void(0)" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    { auth.user.name }
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><button className="dropdown-item" onClick={logout}>Logout</button></li>
                                </ul>
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