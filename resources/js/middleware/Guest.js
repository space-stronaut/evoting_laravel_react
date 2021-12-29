import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import { authenticated } from "../store/authStore"

export default function Guest({children}){
    const [auth, setAuth] = useRecoilState(authenticated)
    const navigate = useNavigate()

    useEffect(() => {
        if (auth.check === false) {
           navigate('/login')
        }  
    }, [])

    return children
}