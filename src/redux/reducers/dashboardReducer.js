import { DASHBOARD } from '../constants'

const dashboardReducer = (state = { content: 'todos' }, action) => {

    if(action.type === DASHBOARD.REDIRECT) {
        return { ...state, content: action.payload.content }
    }

    if(action.type === DASHBOARD.SET_PREVIOUS) {
        return { ...state, previous: action.payload.previous }
    }

    return state
}

export default dashboardReducer