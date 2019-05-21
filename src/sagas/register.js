import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import { showMessage } from '../redux/actions/messages'
import { registerSuccess } from '../redux/actions/register'
import { REGISTER } from '../redux/constants'
import { apiURL } from './index'

function* sendRegisterRequest(action) {
    try {
        const res = yield call(axios.post, apiURL + '/register', { 
            username: action.payload.username, 
            password: action.payload.password, 
            email: action.payload.email 
        })
        console.log(res)
        if(res.data.message) {
            yield put(showMessage(res.data.message))
            yield put(registerSuccess())
        } else
            yield put(showMessage(res.data.error))
        
    } catch(err) {
        console.log('Login Request Error:', err)
        yield put(showMessage('An error occured, try again later!'))
    }
}

export function* registerRequestWatcher() {
    yield takeLatest(REGISTER.REQUEST, sendRegisterRequest)
}