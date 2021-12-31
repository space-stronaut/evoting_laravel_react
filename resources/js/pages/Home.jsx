import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { authenticated } from '../store/authStore'

export default function Home(){
    const [calons, setCalons] = useState([])
    const [loading, setLoading] = useState(false)
    const [calonId, setCalonId] = useState(null)
    const [user, setUser] = useRecoilState(authenticated)
    const [hasil, setHasil] = useState([])

    const getData = async() => {
        setLoading(true)
        try {
            const response = await axios.get('/api/calon')
            const res = await axios.get('/api/voting')

            setCalons(response.data.calons)
            setHasil(res.data.datas)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const changeId = (e) => setCalonId(e)

    const storeData = async(e, n) => {
        e.preventDefault()
        try {
            await axios.post('/api/voting', {
                userId : user.user.id,
                calonId : n
            })

            getData()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])
 
    return (
        <>
        <div className="container d-flex justify-content-evenly mt-5">
            {
                loading === false ? 
                calons.map(e => (
                    <div class="card" style={{width : '35rem'}}>
                        <img class="card-img-top" src="..." alt="Card image cap" />
                        <div class="card-body">
                            <form onSubmit={(n) => {
                                storeData(n, e.id);
                            }}>
                                <h5 class="card-title">{ e.nama }</h5>
                                <input type="hidden" name="" value={e.id} onChange={(e) => setCalonId(e.target.value)} />
                                <button className="btn btn-primary">Pilih</button>
                            </form>
                        </div>
                    </div>
                )) : (
                    <div className="card">
                        <div className="card-header">
                            Loading...
                        </div>
                    </div>
                )
            }
        </div>

        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    Hasil Voting
                </div>
                <div className="card-body">
                    {
                        loading === false ? (
                            <table className="table">
                                <thead className="thead-dark">
                                    <tr>
                                        {
                                            calons.map(e => (
                                                <th>{e.nama}</th>
                                            ))
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    {
                                        hasil.map(e => (
                                            <td>{e}</td>
                                        ))
                                    }
                                    </tr>
                                </tbody>
                            </table>
                        ) : (
                            <div>
                                Loading...
                            </div>
                        )
                    }
                </div>
            </div>
        </div>

        </>
    )
}