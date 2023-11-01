import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Read() {

    const { id } = useParams()
    const [student, setStudent] = useState([])
    const [auth, setAuth] = useState([])
    axios.defaults.withCredentials = true

    useEffect(() => {
        axios.get('http://localhost:8081/user')
            .then(res => {
                if (res.data.Status === "Success") {
                    setAuth(true)
                    axios.get('http://localhost:8081/read/' + id)
                        .then(res => {
                            setStudent(res.data[0])
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
                        <div className="p-2">
                            <h2>Student Detail</h2>
                            <h2>{student.id}</h2>
                            <h2>{student.name}</h2>
                            <h2>{student.email}</h2>
                            <Link to="/home" className="btn btn-primary me-2">Back</Link>
                            <Link to={`/edit/${student.id}`} className="btn btn-info">Edit</Link>
                        </div>

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

export default Read
