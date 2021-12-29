import { useState } from "react"
import axios from "axios"
import { useRecoilState } from "recoil"
import { authenticated } from "../../store/authStore"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export default function Login(){
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [auth, setAuth] = useRecoilState(authenticated)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const credentials = {
        email,
        password
    }


    const login = async(e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axios.post('/api/login', credentials)
            localStorage.setItem('token', response.data.token)
            setAuth({
                check : true,
                user : response.data.user
            })
            console.log(response);
            navigate('/')
            toast.success(`Selamat Datang ${response.data.user.name}`)
        } catch (error) {
            console.log(error)
            setLoading(false)
            setError(true)
            toast.error('Login Gagal')
        }
    }

    return (
        <>
        <div className="container">
            <div className="card mx-auto" style={{maxWidth : "35rem"}}>
                <div className="card-header">
                    Login
                </div>
                <div className="card-body">
                    <form onSubmit={login}>
                        {
                            error === true ? (
                                <div className="form-group">
                                    <div className="alert alert-danger">
                                        Credentials Doesnt match our record
                                    </div>
                                </div>
                            ) : ""
                        }
                        <div className="form-group">
                            <label htmlFor="">Email</label>
                            <input type="email" name="" onChange={(e) => setEmail(e.target.value)} value={email} id="" className={`form-control`} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Password</label>
                            <input type="password" name="" value={password} onChange={(e) => setPassword(e.target.value)} id="" className="form-control" />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary btn-block d-flex justify-content-center">
                                {
                                    loading === true ? (
                                        <div class="spinner-border text-white my-auto" role="status">
                                            <span class="sr-only"></span>
                                        </div>
                                    ) : "Submit"
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}