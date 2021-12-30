import {Button, Modal} from 'react-bootstrap'
import {useEffect, useState} from 'react'
import {toast} from 'react-toastify'

export default function Desa(){
    const [desas, setDesas] = useState([])
    const [kecamatans, setKecamatans] = useState([])
    const [loading, setLoading] = useState(false)
    const [createShow, setCreateShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [id, setId] = useState(null)
    const [nama, setNama] = useState('')
    const [kecamatanId, setKecamatanId] = useState(null)
    const [query, setQuery] = useState('')
    const credentials = {
        nama,
        kecamatanId
    }

    const handleCreateClose = () => setCreateShow(false);
    const handleCreateShow = () => {
        setCreateShow(true)
    };

    const handleEditClose = () => {
        setEditShow(false)
        setNama("")
        setKecamatanId(null)
        setId(null)
    };

    const handleEditShow = (e) => {
        setEditShow(true)
        setNama(e.nama)
        setKecamatanId(e.kecamatanId)
        setId(e.id)
    };

    const getData = async() => {
        try {
            const response = await axios.get('/api/desa')

            setDesas(response.data.desas)
            setKecamatans(response.data.kecamatans)
            setLoading(true)
        } catch (error) {
            console.log(error)
        }
    }

    const storeData = async(e) => {
        e.preventDefault()
        try {
            await axios.post('/api/desa', credentials)

            setCreateShow(false)
            setNama('')
            setKecamatanId(null)
            toast.success("Data Desa Berhasil Dibuat")
            getData()
        } catch (error) {
            console.log(error)
        }
    }

    const updateData = async(e) => {
        e.preventDefault()
        try {
            await axios.put('/api/desa/'+id, credentials)

            setEditShow(false)
            setNama('')
            setKecamatanId(null)
            setId(null)
            toast.success("Data Desa Berhasil Diupdate")
            getData()
        } catch (error) {
            console.log(error)
        }
    }

    const deleteData = async(e) => {
        try {
            await axios.delete('/api/desa/' + e)

            getData()
            toast.success("Data Desa Berhasil Dihapus")
        } catch (error) {
            console.log(error)
        }
    }

    const searchData = async(e) => {
        setLoading(false)
        try {
            if(e.length > 0){
                const response = await axios.get('/api/desa/search/' + e)
                setDesas(response.data.desas)
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
                            Desa
                        </span>
                        <span>
                            <Button variant="primary" onClick={handleCreateShow}>Create</Button>
                        </span>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <input type="text" name="" value={query} onChange={(e) => {
                                setQuery(e.target.value)
                                searchData(e.target.value)
                            }} id="" className="form-control" placeholder='Cari...'/>
                        </div>
                    </div>
                    <div className="card-body">
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
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
                                    ) : desas.length > 0 ? 
                                        desas.map(e => (
                                            <tr key={e.id}>
                                                <td>
                                                    {e.nama}
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
                <Modal.Title>Buat Desa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={storeData}>
                        <div className="form-group">
                            <label htmlFor="">Nama Desa</label>
                            <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Kecamatan</label>
                            <select name="" defaultValue={1} onChange={(e) => setKecamatanId(e.target.value)} id="" className="form-control">
                                <option value="">Pilih Kecamatan</option>
                                {
                                    kecamatans.map(e => (
                                        <option value={e.id}>{e.namaKecamatan}</option>
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
                <Modal.Title>Edit Desa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={updateData} encType="multipart/form-data">
                        <div className="form-group">
                            <label htmlFor="">Nama Desa</label>
                            <input type="text" name="" id="" value={nama} onChange={(e) => setNama(e.target.value)} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Kecamatan</label>
                            <select name="" onChange={(e) => setKecamatanId(e.target.value)} id="" className="form-control">
                                <option value="">Pilih Kecamatan</option>
                                {
                                    kecamatans.map(e => (
                                        <option value={e.id} selected={e.id === kecamatanId}>{e.namaKecamatan}</option>
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