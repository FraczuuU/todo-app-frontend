import { all } from 'redux-saga/effects'
import { loginRequestWatcher } from './login'
import { registerRequestWatcher } from './register'
import { 
    getTodosSagaWatcher, 
    addTodoSagaWatcher, 
    checkTodoSagaWatcher, 
    editTodoSagaWatcher, 
    removeTodoSagaWatcher 
} from './todo'

//export const apiURL = 'http://3.19.62.54:3001'
export const apiURL = 'http://localhost:3001'

export function* rootSaga() {
    yield all([
        loginRequestWatcher(),
        registerRequestWatcher(),
        getTodosSagaWatcher(),
        addTodoSagaWatcher(),
        checkTodoSagaWatcher(),
        editTodoSagaWatcher(),
        removeTodoSagaWatcher()
    ])
}