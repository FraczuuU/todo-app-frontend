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
    payload: { todo }
})

export const checkTodo = (id) => ({
    type: TODO.CHECK,
    payload: { id: id }
})

export const editTodo = (todo) => ({
    type: TODO.EDIT,
    payload: { todo }
})

export const goToEdit = (todo) => ({
    type: TODO.GO_TO_EDIT,
    payload: { todo: todo }
})

export const removeTodo = (id) => ({
    type: TODO.REMOVE,
    payload: { id: id }
})

export const getOne = (id) => ({
    type: TODO.GET_ONE,
    payload: { id: id }
})

export const ready = () => ({
    type: TODO.READY
})

export const readyReset = () => ({
    type: TODO.READY_RESET
})

