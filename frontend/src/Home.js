import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Link, redirect } from "react-router-dom";

function Home() {
    const [auth, setAuth] = useState([])
    const [data, setData] = useState([])
    axios.defaults.withCredentials = true
    useEffect(() => {
        axios.get('http://localhost:8081/user')
            .then(res => {
                if (res.data.Status === "Success") {
                    setAuth(true)
                    axios.get('http://localhost:8081/')
                        .then(res => setData(res.data))
                        .catch(err => console.log(err))
                } else {
                    setAuth(false)
                }
            })
            .catch(err => console.log(err))
    }, [])

    const handleDelete = (id) => {
        axios.delete('http://localhost:8081/delete/' + id)
            .then(res => {
                window.location.reload();
            })
            .catch(err => console.log(err))
    }

    const handleLogout = (id) => {
        axios.get('http://localhost:8081/logout/')
            .then(res => {
                if (res.data.Status === "Success") {
                    window.location.replace("/")
                } else {
                    alert('Error')
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">

            {
                auth ?
                    <div className="w-50 bg-white rounded p-3">
                        <h2>Student List</h2>
                        <div className="d-flex justify-content-end">
                            <Link to="/create" className="btn btn-success">Create +</Link>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((student, index) => {
                                    return <tr key={index}>
                                        <td>{student.id}</td>
                                        <td>{student.name}</td>
                                        <td>{student.email}</td>
                                        <td>
                                            <Link to={`/read/${student.id}`} className="btn btn-sm btn-info">Read</Link>
                                            <Link to={`/edit/${student.id}`} className="btn btn-sm btn-primary mx-2">Edit</Link>
                                            <button onClick={() => handleDelete(student.id)} className="btn btn-sm btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
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

export default Home