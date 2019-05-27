import { all } from 'redux-saga/effects'
import { loginRequestWatcher } from './login'
import { registerRequestWatcher } from './register'
import { 
    getAllTodosSagaWatcher, 
    addTodoSagaWatcher, 
    checkTodoSagaWatcher, 
    editTodoSagaWatcher, 
    removeTodoSagaWatcher,
    getOneTodoSagaWatcher
} from './todo'
import { 
    changeUsernameSagaWatcher, 
    changeEmailSagaWatcher, 
    changePasswordSagaWatcher,
    getProfileSagaWatcher
 } from './user'
 import { 
     sendForgotPasswordEmailSagaWatcher,
     resetPasswordSagaWatcher,
     checkResetTokenSagaWatcher
} from './forgot-password'

export const apiURL = 'http://3.15.30.31:3001'
//export const apiURL = 'http://localhost:3001'

export function* rootSaga() {
    yield all([
        loginRequestWatcher(),
        registerRequestWatcher(),
        getAllTodosSagaWatcher(),
        addTodoSagaWatcher(),
        checkTodoSagaWatcher(),
        editTodoSagaWatcher(),
        removeTodoSagaWatcher(),
        changeUsernameSagaWatcher(),
        changeEmailSagaWatcher(),
        changePasswordSagaWatcher(),
        getProfileSagaWatcher(),
        getOneTodoSagaWatcher(),
        sendForgotPasswordEmailSagaWatcher(),
        resetPasswordSagaWatcher(),
        checkResetTokenSagaWatcher()
    ])
}