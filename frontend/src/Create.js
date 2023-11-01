import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Create() {
    const [auth, setAuth] = useState([])
    const [values, setValues] = useState({
        name: "",
        email: ""
    })
    axios.defaults.withCredentials = true
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:8081/user')
            .then(res => {
                if (res.data.Status === "Success") {
                    setAuth(true)
                } else {
                    setAuth(false)
                }
            })
            .catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8081/student', values)
            .then(res => {
                navigate('/home')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">

            {
                auth ?
                    <div className="w-50 bg-white rounded p-3">
                        <form onSubmit={handleSubmit}>
                            <h2>Add Student</h2>
                            <div className="mb-2">
                                <label htmlFor="">Name</label>
                                <input type="text" placeholder='Enter Name' className="form-control"
                                    onChange={e => setValues({ ...values, name: e.target.value })} />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="">Email</label>
                                <input type="email" placeholder='Enter Email' className="form-control"
                                    onChange={e => setValues({ ...values, email: e.target.value })} />
                            </div>
                            <button className="btn btn-success">Submit</button>
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

export default Create

