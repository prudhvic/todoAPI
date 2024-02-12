let mysql = require("mysql2")
let pool = mysql.createPool({
    user: process.env.user,
    database: process.env.database,
    password: process.env.password,
    host: process.env.host
}).promise()
let createTodo = async (todo) => {
    try {
        let [row] = await pool.query(`insert into todos(todo) values(?)`, [todo])
        return row.insertId;
    } catch (err) {
        throw Error(err)
    }
}
let getTodos = async () => {
    try {
        let [rows] = await pool.query('select * from todos')
        return rows;
    } catch (err) {
        throw Error(err)

    }
}
let getTodo = async (id) => {
    try {
        let [row] = await pool.query(`select * from todos where id=?`, [id])
        return row[0];
    } catch (err) {
        throw Error(err)

    }

}
let deleteTodo = async (id) => {
    try {
        let [rows] = await pool.query(`delete from todos where id=?`, [id])
        return id;
    } catch (err) {
        throw Error(err)

    }
}
let updateTodo = async (id, todo, is_completed) => {

    console.log(id, todo, is_completed)
    try {
        let [rows] = await pool.query(`update todos set todo=?,is_completed=? where id=?`, [todo, is_completed, id])

        let updated = await getTodo(id);
        console.log('jsncjwc', updated)
        return updated
    }
    catch (err) {
        throw Error(err)

    }
}
module.exports = { createTodo, deleteTodo, updateTodo, getTodos, getTodo }