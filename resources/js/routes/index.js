import {Routes, Route} from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Login from '../pages/auth/Login'
import Guest from '../middleware/Guest'
import Auth from '../middleware/Auth'

export default function Router(){
    return (
        <Routes>
            <Route path="/" element={
                <Guest>
                    <Home />
                </Guest>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={
                <Auth>
                    <Login />
                </Auth>
            } />
        </Routes>
    )
}