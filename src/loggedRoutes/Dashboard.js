import React from 'react'
import { Button } from 'antd'

import toaster from 'toasted-notes'
import 'toasted-notes/src/styles.css'

import { resetMessage } from '../redux/actions/messages'
import { logout } from '../redux/actions/login'
import { connect } from 'react-redux'
 
import './Dashboard.css'

class Dashboard extends React.Component {

    componentDidUpdate() { 
        if(this.props.message) {
            toaster.notify(this.props.message, { duration: 1000 })
            this.props.resetMessage()
        }
        if(this.props.loggedOut) {
            this.props.history.push('/')
            toaster.notify('Successfully logged out!', { duration: 1000 })
        }
    }

    render() {
        return(
            <div className="Dashboard">
                <section className="Dashboard-Section">
                    <p className="Dashboard-Title">Dashboard</p>
                    <Button type="primary" htmlType="button" onClick={ () => this.props.logout() }>
                        Logout
                    </Button>
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return({
        loggedOut: state.loginReducer.loggedOut,
        message: state.messagesReducer.message
    })
}

const mapDispatchToProps = (dispatch) => {
    return({
        logout: () => dispatch(logout()),
        resetMessage: () => dispatch(resetMessage())
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)