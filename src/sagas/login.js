import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import { loginSuccess } from '../redux/actions/login'
import { showMessage } from '../redux/actions/messages'
import { LOGIN } from '../redux/constants'
import { apiURL } from './index'
import { setToken } from '../services/auth'

function* sendLoginRequest(action) {
    try {
        const res = yield call(axios.post, apiURL + '/login', { 
            username: action.payload.username, 
            password: action.payload.password, 
            remember: action.payload.remember 
        })
        
        if(res.data.token) {
            setToken(res.data.token)
            yield put(loginSuccess())
        } else
            yield put(showMessage(res.data.error))
        
    } catch(err) {
        console.log('Login Request Error:', err)
        yield put(showMessage('An error occured, try again later!'))
    }
}

export function* loginRequestWatcher() {
    yield takeLatest(LOGIN.REQUEST, sendLoginRequest)
}