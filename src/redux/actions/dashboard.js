import { DASHBOARD } from '../constants'

export const changeContent = (content) => ({
    type: DASHBOARD.REDIRECT,
    payload: { content: content }
})