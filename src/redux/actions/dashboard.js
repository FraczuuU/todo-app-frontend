import { DASHBOARD } from '../constants'

export const changeContent = (content) => ({
    type: DASHBOARD.REDIRECT,
    payload: { content: content }
})

export const setPrevious = (previous) => ({
    type: DASHBOARD.SET_PREVIOUS,
    payload: { previous: previous }
})