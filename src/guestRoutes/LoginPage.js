import React from 'react'
import LoginForm from '../components/LoginForm'

import toaster from 'toasted-notes'
import 'toasted-notes/src/styles.css'

import { loginRequest } from '../redux/actions/login'
import { resetMessage } from '../redux/actions/messages'
import { connect } from 'react-redux'
 
import './LoginPage.css'

class LoginPage extends React.Component {

    componentDidUpdate() {
        if(this.props.logged) {
            this.props.history.push('/dashboard')
        }
            
        if(this.props.message) {
            toaster.notify(this.props.message, { duration: 1000 })
            this.props.resetMessage()
        }
    }

    render() {
        return(
            <div className="LoginPage">
                <section className="LoginPage-Section">
                    <p className="LoginPage-Title">Login</p>
                    <LoginForm />
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return({
        logged: state.loginReducer.logged,
        message: state.messagesReducer.message
    })
}

const mapDispatchToProps = (dispatch) => {
    return({
        loginRequest: (email, password) => dispatch(loginRequest(email, password)),
        resetMessage: () => dispatch(resetMessage())
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)