import { DASHBOARD } from '../constants'

const dashboardReducer = (state = { content: 'todos' }, action) => {

    if(action.type === DASHBOARD.REDIRECT) {
        return { ...state, content: action.payload.content }
    }

    return state
}

export default dashboardReducer