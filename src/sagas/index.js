import { all } from 'redux-saga/effects'
import { loginRequestWatcher } from './login'
import { registerRequestWatcher } from './register'

//export const apiURL = 'http://3.19.62.54:3000'
export const apiURL = 'http://localhost:3001'

export function* rootSaga() {
    yield all([
        loginRequestWatcher(),
        registerRequestWatcher()
    ])
}