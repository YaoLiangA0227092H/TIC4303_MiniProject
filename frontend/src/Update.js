import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Update() {
    const { id } = useParams()
    const [auth, setAuth] = useState([])
    const [values, setValues] = useState({
        name: '',
        email: ''
    })
    const navigate = useNavigate()
    axios.defaults.withCredentials = true

    const handleUpdate = (e) => {
        e.preventDefault()
        axios.put('http://localhost:8081/update/' + id, values)
            .then(res => {
                navigate('/home')
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get('http://localhost:8081/user')
            .then(res => {
                if (res.data.Status === "Success") {
                    setAuth(true)
                    axios.get('http://localhost:8081/read/' + id)
                        .then(res => {
                            setValues({ ...values, name: res.data[0].name, email: res.data[0].email })
                        })
                        .catch(err => console.log(err))
                } else {
                    setAuth(false)
                }
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">

            {
                auth ?
                    <div className="w-50 bg-white rounded p-3">
                        <form onSubmit={handleUpdate}>
                            <h2>Update Student</h2>
                            <div className="mb-2">
                                <label htmlFor="">Name</label>
                                <input type="text" placeholder='Enter Name' className="form-control"
                                    onChange={e => setValues({ ...values, name: e.target.value })}
                                    value={values.name} />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="">Email</label>
                                <input type="email" placeholder='Enter Email' className="form-control"
                                    onChange={e => setValues({ ...values, email: e.target.value })}
                                    value={values.email} />
                            </div>
                            <button className="btn btn-success">Update</button>
                        </form>
                    </div>
                    :
                    <div className="w-50 bg-white rounded p-3">
                        <h2>
                            You are not authorized to view this page
                        </h2>
                    </div>
            }


        </div>
    )
}

export default Update

