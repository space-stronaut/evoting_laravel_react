import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { toast } from "react-toastify";

export default function Calon(){
    const [calons, setCalons] = useState([])
    const [createShow, setCreateShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [nama, setNama] = useState('')
    const [foto, setFoto] = useState(null)
    const [no, setNo] = useState(null)
    const [id, setId] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleCreateClose = () => setCreateShow(false);
    const handleCreateShow = () => setCreateShow(true);

    const handleEditClose = () => {
        setEditShow(false)
        setNama("")
        setNo(null)
        setFoto(null)
    };
    const handleEditShow = (e) => {
        setEditShow(true)
        setNama(e.nama)
        setNo(e.no)
        setId(e.id)
    };

    const getData = async() => {
        try {
            const response = await axios.get('/api/calon')

            setCalons(response.data.calons);
            setLoading(true)
        } catch (error) {
            console.log(error)
        }
    }

    const storeData = async(e) => {
        e.preventDefault()
        try {
            let formData = new FormData();
            formData.append('nama', nama)
            formData.append('no', no)
            formData.append('foto', foto)

            await axios.post('/api/calon', formData)

            getData()
            toast.success("Berhasil Upload Calon")
            setCreateShow(false)
            setNama("")
            setNo(null)
            setFoto(null)
        } catch (error) {
            console.log(error)
        }
    }

    const updateData = async(e) => {
        e.preventDefault()
        try {
            let formData = new FormData();
            formData.append('nama', nama)
            formData.append('no', no)
            formData.append('foto', foto)

            const response = await axios.post('/api/calon/' + id, formData)

            getData()
            toast.success("Berhasil Update Calon")
            setEditShow(false)
            setNama("")
            setNo(null)
            setFoto(null)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteData = async(e) => {
        try {
            await axios.delete('/api/calon/'+e)

            toast.success("Data Berhasil Dihapus")
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
            <div className="container">
                <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <span>
                            Daftar Calon
                        </span>
                        <span>
                            <Button variant="primary" onClick={handleCreateShow}>Buat Calon</Button>
                        </span>
                    </div>
                    <div className="card-body">
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Nama</th>
                                    <th scope="col">No Urut</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loading === false ? (
                                        <tr>
                                            <td>Loading...</td>
                                        </tr>
                                    ) : (
                                    calons.length > 0 ? (
                                        calons.map(e => (
                                            <tr>
                                                <th>{e.nama}</th>
                                                <th>{e.no}</th>
                                                <th className="d-flex align-items-center">
                                                    <Button variant="danger" onClick={() => deleteData(e.id)}>Hapus</Button>
                                                    <Button variant="success" className="ms-2" onClick={() => handleEditShow(e)}>Edit</Button>
                                                </th>
                                            </tr>
                                        )) 
                                    ) : (
                                        <tr>
                                            <td>Belum Ada Data</td>
                                        </tr>
                                    )
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal show={createShow} onHide={handleCreateClose}>
                <Modal.Header closeButton>
                <Modal.Title>Buat Calon</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={storeData} encType="multipart/form-data">
                        <div className="form-group">
                            <label htmlFor="">Nama Calon</label>
                            <input type="text" name="" id="" value={nama} onChange={(e) => setNama(e.target.value)} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">No Urut</label>
                            <input type="number" name="" id="" className="form-control" value={no} onChange={(e) => setNo(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Foto</label>
                            <input type="file" name="" id="" className="form-control" onChange={(e) => setFoto(e.target.files[0])}/>
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
                <Modal.Title>Edit Calon</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={updateData} encType="multipart/form-data">
                        <div className="form-group">
                            <label htmlFor="">Nama Calon</label>
                            <input type="text" name="" id="" value={nama} onChange={(e) => setNama(e.target.value)} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">No Urut</label>
                            <input type="number" name="" id="" className="form-control" value={no} onChange={(e) => setNo(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Foto</label>
                            <input type="file" name="" id="" className="form-control" onChange={(e) => setFoto(e.target.files[0])}/>
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