import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors(
    {
        origin: ["http://localhost:3000"],
        methods: ["POST", "GET", "PUT", "DELETE"],
        credentials: true
    }
))

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "TIC4303"
})

const verifyUser = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.json({ Message: "We need token please provide it." })
    } else {
        jwt.verify(token, "TIC4303Team10", (err, decoded) => {
            if (err) {
                return res.json({ Message: "Authentication Error." })
            } else {
                req.name = decoded.name
                next()
            }
        })
    }
}

app.post("/signup", (req, res) => {
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)"
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json("Error")
        }
        return res.json(data)
    })
})

app.post("/login", (req, res) => {
    const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?"
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            return res.json("Server SideError")
        }

        if (data.length > 0) {
            const name = data[0].name
            const token = jwt.sign({ name }, "TIC4303Team10", { expiresIn: '1d' })
            res.cookie('token', token)
            return res.json({ Status: "Success" })
        } else {
            return res.json("NO Records existed")
        }

    })
})

app.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({ Status: "Success" })
})

app.get('/user', verifyUser, (req, res) => {
    return res.json({ Status: "Success", name: req.name })
})

app.get('/', (req, res) => {
    const sql = "SELECT * FROM student"
    db.query(sql, (err, result) => {
        if (err) {
            return res.json({ Message: "Error inside server" })
        }
        return res.json(result)
    })
})

app.post('/student', (req, res) => {
    const sql = "INSERT INTO student (`name`, `email`) VALUES (?)"
    const values = [
        req.body.name,
        req.body.email
    ]
    db.query(sql, [values], (err, result) => {
        if (err) {
            return res.json(err)
        }
        return res.json(result)
    })
})


app.get('/read/:id', (req, res) => {
    const sql = "SELECT * FROM student WHERE id = ?"
    const id = req.params.id
    db.query(sql, id, (err, result) => {
        if (err) {
            return res.json({ Message: "Error inside server" })
        }
        return res.json(result)
    })
})

app.put('/update/:id', (req, res) => {
    const sql = "UPDATE student SET `name` = ?, `email` = ? WHERE id = ?"
    const id = req.params.id
    db.query(sql, [req.body.name, req.body.email, id], (err, result) => {
        if (err) {
            return res.json({ Message: "Error inside server" })
        }
        return res.json(result)
    })
})

app.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM student WHERE id = ?"
    const id = req.params.id
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.json({ Message: "Error inside server" })
        }
        return res.json(result)
    })
})

app.listen(8081, () => {
    console.log("listening")
})