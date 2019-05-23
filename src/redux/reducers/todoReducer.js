import { TODO } from '../constants'

const todoReducer = (state = {}, action) => {

    if(action.type === TODO.SHOW) {
        return{ ...state, todos: action.payload.todos }
    }

    if(action.type === TODO.SHOW_PLANNED) {
        return{ ...state, plannedTodos: action.payload.plannedTodos }
    }

    if(action.type === TODO.GO_TO_EDIT) {
        return{ ...state, todoID: action.payload.id, todoTitle: action.payload.title, todoDescription: action.payload.description }
    }

    return state
}

export default todoReducer