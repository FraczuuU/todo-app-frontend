import React from 'react'
import RegisterForm from '../components/RegisterForm'

import toaster from 'toasted-notes'
import 'toasted-notes/src/styles.css'

import { resetMessage } from '../redux/actions/messages'
import { connect } from 'react-redux'

import './RegisterPage.css'

class RegisterPage extends React.Component {

    componentDidUpdate() {
        if(this.props.message) {
            toaster.notify(this.props.message, { duration: 1000 })
            this.props.resetMessage()
        }

        if(this.props.registered) {
            this.props.history.push('/')
        }
    }

    render() {
        return(
            <div className="RegisterPage">
                <section className="RegisterPage-Section">
                    <span className="RegisterPage-Title">Register</span>
                    <RegisterForm />
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return({
        message: state.messagesReducer.message,
        registered: state.registerReducer.registered
    })
}

const mapDispatchToProps = (dispatch) => {
    return({
        resetMessage: () => dispatch(resetMessage())
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage)