import { TODO } from '../constants'

const todoReducer = (state = {}, action) => {

    if(action.type === TODO.SHOW) {
        return{ ...state, todos: action.payload.todos }
    }

    return state
}

export default todoReducer