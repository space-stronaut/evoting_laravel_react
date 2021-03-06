import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Router from './routes/index'
import {BrowserRouter} from 'react-router-dom'
import Navigation from './components/Navigation';
import { RecoilRoot, useRecoilState } from 'recoil';
import { authenticated } from './store/authStore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Render() {
    const [auth, setAuth] = useRecoilState(authenticated)
    const [loading, setLoading] = useState(false)

    const getData = async() => {
        try {
            const response = await axios.get('/api/me', {
                headers : {
                    "Authorization" : "Bearer " + localStorage.getItem('token')
                }
            })

            setAuth({
                check : true,
                user : response.data
            })
            toast.success(`Selamat Datang ${response.data.name}`)
            console.log(response.data.users[0])
        } catch(e){
            console.log('error')
        }

        setLoading(true)
    }

    useEffect(() => {
        getData()
        console.log(auth.check)
    },[]);

    return (
        <>
            {
                loading === true ? (
                    <>
                        <Navigation />
                        <Router />
                        <ToastContainer />
                    </>
                ) : (
                    <div className="container d-flex justify-content-center align-items-center">
                        <div className="spinner-border text-primary my-auto" role="status">
                            <span className="sr-only"></span>
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default Render;

if (document.getElementById('example')) {
    ReactDOM.render(
        <RecoilRoot>
            <BrowserRouter>
                <Render />
            </BrowserRouter>
        </RecoilRoot>
        , 
    document.getElementById('example'));
}
