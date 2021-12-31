import {Routes, Route} from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Login from '../pages/auth/Login'
import Guest from '../middleware/Guest'
import Auth from '../middleware/Auth'
import KecamatanIndex from '../pages/kecamatan/KecamatanIndex'
import Calon from '../pages/calon/Calon'
import Desa from '../pages/desa/Desa'
import Tps from '../pages/tps/Tps'
import User from '../pages/user/User'

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
            <Route path="/kecamatan" element={
                <Guest>
                    <KecamatanIndex />
                </Guest>
            } />
            <Route path="/calon" element={
                <Guest>
                    <Calon />
                </Guest>
            } />
            <Route path="/desa" element={
                <Guest>
                    <Desa />
                </Guest>
            } />
            <Route path="/tps" element={
                <Guest>
                    <Tps />
                </Guest>
            } />
            <Route path="/user" element={
                <Guest>
                    <User />
                </Guest>
            } />
        </Routes>
    )
}