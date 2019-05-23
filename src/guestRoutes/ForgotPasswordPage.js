import React from 'react'
import { Input, Icon, Button, Form } from 'antd'

import toaster from 'toasted-notes'
import 'toasted-notes/src/styles.css'

import { sendForgotPassword } from '../redux/actions/forgot-password'
import { resetMessage } from '../redux/actions/messages'
import { connect } from 'react-redux'
 
import './ForgotPasswordPage.css'

class ForgottenPasswordPage extends React.Component {

    componentDidUpdate() {        
        if(this.props.message) {
            toaster.notify(this.props.message, { duration: 2000 })
            this.props.resetMessage()
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            this.props.sendForgotPassword(values.email)
            this.props.form.setFieldsValue({
              email: ''
            })
          }
        })
      }

    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <div className="ForgottenPasswordPage">
                <div className="ForgottenPasswordPage-Container">
                    <section className="ForgottenPasswordPage-Section">
                    <span className="ForgottenPasswordPage-Title">Forgot Password</span>
                    <Form onSubmit={this.handleSubmit} className="ForgottenPasswordPage-Form" >
                        <Form.Item>
                            {getFieldDecorator('email', {
                            rules: [
                                {
                                 type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ],
                            })(<Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="E-mail" />)}
                        </Form.Item>
                        <Form.Item >
                            <Button className="ForgottenPasswordPage-Button" type="primary" htmlType="submit">
                                Send E-mail
                            </Button>
                            I want to <a href="/">login now!</a>
                        </Form.Item>
                            
                        </Form>
                        </section>
                </div>
            </div>
        )
    }
}

const ForgotPasswordPage = Form.create({ name: 'forgotPassword' })(ForgottenPasswordPage)

const mapStateToProps = (state) => {
    return({
        message: state.messagesReducer.message
    })
}

const mapDispatchToProps = (dispatch) => {
    return({
        resetMessage: () => dispatch(resetMessage()),
        sendForgotPassword: (email) => dispatch(sendForgotPassword(email))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage)