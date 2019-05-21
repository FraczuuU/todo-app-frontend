import { REGISTER } from '../constants'

const registerReducer = (state = {}, action) => {
    if(action.type === REGISTER.SUCCESS) {
        return { ...state, registered: true }
    }
    return state
}

export default registerReducer