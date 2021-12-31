import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { toast } from "react-toastify";

export default function Tps(){
    const [tps, setTps] = useState([])
    const [desas, setDesas] = useState([])
    const [createShow, setCreateShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [nama, setNama] = useState('')
    const [desaId, setDesaId] = useState(null)
    const [id, setId] = useState(null)
    const [loading, setLoading] = useState(false)
    const credentials = {
        nama,
        desaId
    }

    const getData = async() => {
        setLoading(false)
        try {
            const response = await axios.get('/api/tps')

            setLoading(true)
            setTps(response.data.tps)
            setDesas(response.data.desas)
        } catch (error) {
            console.log(error)
        }
    }

    const handleCreateClose = () => setCreateShow(false);
    const handleCreateShow = () => {
        setCreateShow(true)
    };

    const handleEditClose = () => {
        setEditShow(false)
        setNama("")
        setDesaId(null)
        setId(null)
    };

    const handleEditShow = (e) => {
        setEditShow(true)
        setNama(e.nama)
        setDesaId(e.desaId)
        setId(e.id)
    };

    const storeData = async(e) => {
        e.preventDefault()
        try {
            await axios.post('/api/tps', credentials)

            setCreateShow(false)
            setNama('')
            setDesaId(null)
            toast.success("Data TPS Berhasil Dibuat")
            getData()
        } catch (error) {
            console.log(error)
        }
    }

    const updateData = async(e) => {
        e.preventDefault()
        console.log(id)
        try {
            await axios.put('/api/tps/'+id, credentials)

            setEditShow(false)
            setNama('')
            setDesaId(null)
            setId(null)
            toast.success("Data TPS Berhasil Diupdate")
            getData()
        } catch (error) {
            console.log(error)
        }
    }

    const deleteData = async(e) => {
        try {
            await axios.delete('/api/tps/' + e)

            getData()
            toast.success("Data TPS Berhasil Dihapus")
        } catch (error) {
            console.log(error)
        }
    }

    const searchData = async(e) => {
        setLoading(false)
        try {
            if(e.length > 0){
                const response = await axios.get('/api/tps/search/' + e)
                setTps(response.data.tps)
                setLoading(true)
            }else{
                getData()
            }
        } catch (error) {
            getData()
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <div className="container">
                <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <span>
                            TPS
                        </span>
                        <span>
                            <Button variant="primary" onClick={handleCreateShow}>Create</Button>
                        </span>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <input type="text" name="" onChange={(e) => {
                                searchData(e.target.value)
                            }} id="" className="form-control" placeholder='Cari...'/>
                        </div>
                    </div>
                    <div className="card-body">
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Nama TPS</th>
                                    <th>Nama Desa</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loading === false ? (
                                        <tr>
                                            <td>Loading...</td>
                                        </tr>
                                    ) : tps.length > 0 ? 
                                        tps.map(e => (
                                            <tr key={e.id}>
                                                <td>
                                                    {e.nama}
                                                </td>
                                                <td>
                                                    {e.namaDesa}
                                                </td>
                                                <td className="d-flex align-items-center">
                                                    <button className="btn btn-danger" onClick={() => deleteData(e.id)}>Hapus</button>
                                                    <Button onClick={() => handleEditShow(e)}>Edit</Button>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td>Belum Ada Data</td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal show={createShow} onHide={handleCreateClose}>
                <Modal.Header closeButton>
                <Modal.Title>Buat TPS</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={storeData}>
                        <div className="form-group">
                            <label htmlFor="">Nama TPS</label>
                            <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Desa</label>
                            <select name="" onChange={(e) => setDesaId(e.target.value)} id="" className="form-control">
                                <option value="">Pilih Desa</option>
                                {
                                    desas.map(e => (
                                        <option value={e.id}>{e.nama}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCreateClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={editShow} onHide={handleEditClose}>
                <Modal.Header closeButton>
                <Modal.Title>Edit TPS</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={updateData} encType="multipart/form-data">
                        <div className="form-group">
                            <label htmlFor="">Nama TPS</label>
                            <input type="text" name="" id="" value={nama} onChange={(e) => setNama(e.target.value)} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Desa</label>
                            <select name="" onChange={(e) => setDesaId(e.target.value)} id="" className="form-control">
                                <option value="">Pilih Desa</option>
                                {
                                    desas.map(e => (
                                        <option value={e.id} selected={e.id === desaId}>{e.nama}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleEditClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}