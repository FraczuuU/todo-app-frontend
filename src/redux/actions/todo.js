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

export const editTodo = (id, title, description, planDate) => ({
    type: TODO.EDIT,
    payload: { id: id, title: title, description: description, planDate: planDate }
})

export const goToEdit = (id, title, description, planDate) => ({
    type: TODO.GO_TO_EDIT,
    payload: { id: id, title: title, description: description, planDate: planDate }
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

