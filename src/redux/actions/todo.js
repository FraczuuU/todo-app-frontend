import { TODO } from '../constants'

export const getTodos = () => ({
    type: TODO.GETALL
})

export const showTodos = (todos) => ({
    type: TODO.SHOW,
    payload: { todos: todos }
})

export const addTodo = (todo) => ({
    type: TODO.ADD,
    payload: { todo: todo }
})

export const checkTodo = (id) => ({
    type: TODO.CHECK,
    payload: { id: id }
})

export const editTodo = (id) => ({
    type: TODO.EDIT,
    payload: { id: id }
})

export const removeTodo = (id) => ({
    type: TODO.REMOVE,
    payload: { id: id }
})

