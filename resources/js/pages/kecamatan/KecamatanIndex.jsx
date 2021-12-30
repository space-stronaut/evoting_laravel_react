import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import {toast} from 'react-toastify'

export default function KecamatanIndex(){
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false)
    const [namaKecamatan, setNamaKecamatan] = useState('')
    const [error, setError] = useState([])
    const [id, setId] = useState(null)

    const handleClose = () => {
        setShow(false)
        setNamaKecamatan('')
    };
    const handleShow = () => setShow(true);

    const handleEditClose = () => {
        setEdit(false)
        setNamaKecamatan('')
        setId(null)
    };
    const handleEditShow = (e) => {
        setEdit(true)
        setNamaKecamatan(e.namaKecamatan)
        setId(e.id)
    };


    const getData = async() => {
        try {
            const response = await axios.get('/api/kecamatan')

            setData(response.data.kecamatans)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
        setLoading(true)
    }

    const deleteData = async(id) => {
        try {
            await axios.delete('/api/kecamatan/' + id);
            toast.success("Data Berhasil Dihapus")
            getData()
        } catch (error) {
            console.log(error)
        }
    }

    const storeData = async(e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/api/kecamatan', {namaKecamatan})
            console.log(response)
            getData()
            setShow(false)
            toast.success("Data Berhasil di Buat")
        } catch (error) {
            console.log("gagal")   
            setError(error)
        }
    }

    const updateData = async(e) => {
        e.preventDefault()
        try {
            const response = await axios.put('/api/kecamatan/' + id, {namaKecamatan})
            console.log(response)
            getData()
            setEdit(false)
            toast.success("Data Berhasil di Update")
        } catch (error) {
            console.log("gagal")   
            setError(error)
        }
    }


    useEffect(() => {
        getData()
    },[])
    
    return (
        <>
            <div className="container">
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <span>
                        Kecamatan
                    </span>
                    <span>
                        <Button variant="primary" onClick={handleShow}>Create Data</Button>
                    </span>
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Nama Kecamatan</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                loading === false ? (
                                    <tr>
                                        <td>
                                            Loading...
                                        </td>
                                    </tr>
                                ) : data.length > 0 ? 
                                        data.map(e => (
                                            <tr key={e.id}>
                                                <td>
                                                    {e.namaKecamatan}
                                                </td>
                                                <td>
                                                    <button className="btn btn-danger" onClick={() => deleteData(e.id)}>Hapus</button>
                                                    <button className="btn btn-success ms-2" onClick={() => handleEditShow(e)}>Edit</button>
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

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Create Data Kecamatan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={storeData}>
                    <div className="form-group">
                        <label htmlFor="">Nama Kecamatan</label>
                        <input type="text" name="" value={namaKecamatan} onChange={(e) => setNamaKecamatan(e.target.value)} id="" className={`form-control ${error.length > 0 ? 'is-invalid' : ''}`} />
                        {
                            error.namaKecamatan ? (
                                <div className="invalid-feedback">
                                    {error.namaKecamatan}
                                </div>
                            ) : ''
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>

        <Modal show={edit} onHide={handleEditClose}>
            <Modal.Header closeButton>
            <Modal.Title>Edit Data Kecamatan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={updateData}>
                    <div className="form-group">
                        <label htmlFor="">Nama Kecamatan</label>
                        <input type="text" name="" value={namaKecamatan} onChange={(e) => setNamaKecamatan(e.target.value)} id="" className={`form-control ${error.length > 0 ? 'is-invalid' : ''}`} />
                        {
                            error.namaKecamatan ? (
                                <div className="invalid-feedback">
                                    {error.namaKecamatan}
                                </div>
                            ) : ''
                        }
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