let express = require('express')
require('dotenv').config()
const { getTodos, createTodo, getTodo, deleteTodo, updateTodo } = require('./db')
let app = express()
app.use(express.json())
app.get("/", (req, res) => {
    res.json({ message: "welcome" })
})
app.get("/todos", async (req, res) => {
    try {
        let todos = await getTodos()
        res.json(todos)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.get("/todos/:id", async (req, res) => {
    try {
        let todo = await getTodo(req.params.id)
        if (!todo) {
            console.log("Empty")
            res.json({ message: 'data not found' })
        }
        res.json(todo)

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.delete("/todos/:id", async (req, res) => {
    try {
        let todo = await deleteTodo(req.params.id)
        res.json(todo)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
})
app.post("/todos", async (req, res) => {
    try {
        // console.log(req.body)
        // res.json({ sucess: true })
        let { todo } = req.body;
        let id = await createTodo(todo)
        res.json({ id })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})
app.patch("/todos/:id", async (req, res) => {
    try {
        let { todo, is_completed } = req.body

        let updatedTodo = await updateTodo(req.params.id, todo, is_completed)

        res.json({ updatedTodo });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})
app.listen(process.env.PORT || 5000, () => {
    console.log('listening')
})