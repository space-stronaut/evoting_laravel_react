import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import { authenticated } from "../store/authStore"

export default function Auth({children}){
    const [auth, setAuth] = useRecoilState(authenticated)
    const navigate = useNavigate()

    useEffect(() => {
        if (auth.check === true) {
           navigate('/')
        }  
    }, [auth.check])

    return children
}