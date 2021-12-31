import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import {toast} from 'react-toastify'

export default function User(){
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [noHp, setNoHp] = useState('')
    const [roles, setRoles] = useState('')
    const [error, setError] = useState([])
    const [id, setId] = useState(null)
    const credentials = {
        name,
        email,
        password,
        noHp,
        roles
    }

    const handleClose = () => {
        setShow(false)
        setNamaKecamatan('')
    };
    const handleShow = () => setShow(true);

    const handleEditClose = () => {
        setEdit(false)
        setCredentials({
            name : '',
            email : '',
            password : '',
            noHp : '',
            roles : ''
        })
        setId(null)
    };
    const handleEditShow = (e) => {
        setEdit(true)
        setName(e.name)
        setEmail(e.email)
        setNoHp(e.noHp)
        setRoles(e.roles)
        setId(e.id)
    };


    const getData = async() => {
        try {
            const response = await axios.get('/api/user')

            setData(response.data.users)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
        setLoading(true)
    }

    const deleteData = async(id) => {
        try {
            await axios.delete('/api/user/' + id);
            toast.success("Data Berhasil Dihapus")
            getData()
        } catch (error) {
            console.log(error)
        }
    }

    const storeData = async(e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/api/user', credentials)
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
            const response = await axios.put('/api/user/' + id, credentials)
            console.log(response)
            getData()
            setEdit(false)
            toast.success("Data Berhasil di Update")
        } catch (error) {
            console.log("gagal")   
            setError(error)
        }
    }

    const searchData = async(e) => {
        setLoading(false)
        try {
            if(e.length > 0){
                const response = await axios.get('/api/user/search/' + e)
                setData(response.data.users)
                setLoading(true)
            }else{
                getData()
            }

            console.log(e)
        } catch (error) {
            getData()
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
                        User Management
                    </span>
                    <span>
                        <Button variant="primary" onClick={handleShow}>Create Data</Button>
                    </span>
                </div>
                <div className="card-body">
                    <div className="form-group">
                        <input type="text" placeholder="Cari..." onChange={(e) => searchData(e.target.value)} className="form-control" />
                    </div>
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Nama</th>
                                <th scope="col">Email</th>
                                <th scope="col">role</th>
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
                                                    {e.name}
                                                </td>
                                                <td>
                                                    {e.email}
                                                </td>
                                                <td>
                                                    {e.roles}
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
                        <label htmlFor="">Name</label>
                        <input type="text" name="" value={name} onChange={(e) => setName(e.target.value)} id="" className={`form-control ${error.length > 0 ? 'is-invalid' : ''}`} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Email</label>
                        <input type="email" name="" value={email} onChange={(e) => setEmail(e.target.value)} id="" className={`form-control ${error.length > 0 ? 'is-invalid' : ''}`} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Password</label>
                        <input type="password" name="" value={password} onChange={(e) => setPassword(e.target.value)} id="" className={`form-control ${error.length > 0 ? 'is-invalid' : ''}`} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">No HP</label>
                        <input type="text" name="" value={noHp} onChange={(e) => setNoHp(e.target.value)} id="" className={`form-control ${error.length > 0 ? 'is-invalid' : ''}`} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Role</label>
                        <select name="" onChange={(e) => setRoles(e.target.value)} id="" className="form-control">
                            <option value="">Pilih Role...</option>
                            <option value="admin">Admin</option>
                            <option value="saksi">Saksi</option>
                            <option value="user">User</option>
                        </select>
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
                        <label htmlFor="">Name</label>
                        <input type="text" name="" value={name} onChange={(e) => setName(e.target.value)} id="" className={`form-control ${error.length > 0 ? 'is-invalid' : ''}`} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Email</label>
                        <input type="email" name="" value={email} onChange={(e) => setEmail(e.target.value)} id="" className={`form-control ${error.length > 0 ? 'is-invalid' : ''}`} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Password</label>
                        <input type="password" name="" value={password} onChange={(e) => setPassword(e.target.value)} id="" className={`form-control ${error.length > 0 ? 'is-invalid' : ''}`} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">No HP</label>
                        <input type="text" name="" value={noHp} onChange={(e) => setNoHp(e.target.value)} id="" className={`form-control ${error.length > 0 ? 'is-invalid' : ''}`} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Role</label>
                        <select name="" onChange={(e) => setRoles(e.target.value)} id="" className="form-control">
                            <option value="">Pilih Role...</option>
                            <option value="admin">Admin</option>
                            <option value="saksi">Saksi</option>
                            <option value="user">User</option>
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