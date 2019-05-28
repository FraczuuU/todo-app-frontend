import { TODO } from '../constants'

const todoReducer = (state = {}, action) => {

    if(action.type === TODO.SHOW) {
        return{ ...state, todos: action.payload.todos }
    }

    if(action.type === TODO.GO_TO_EDIT) {
        return{ 
            ...state, 
            todo: action.payload.todo
        }
    }

    if(action.type === TODO.READY) {
        return{ 
            ...state, 
            ready: true
        }
    }

    if(action.type === TODO.READY_RESET) {
        return{ 
            ...state, 
            ready: false
        }
    }

    return state
}

export default todoReducer