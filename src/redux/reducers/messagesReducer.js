import { MESSAGES } from '../constants'

const messagesReducer = (state = {}, action) => {
    if(action.type === MESSAGES.SHOW) {
        return { ...state, message: action.payload.message }
    }
    if(action.type === MESSAGES.RESET) {
        return { ...state, message: '' }
    }
    return state
}

export default messagesReducer