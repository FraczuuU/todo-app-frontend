import React from 'react'
import {
    Form,
    Input,
    Button,
    Icon
} from 'antd'

import toaster from 'toasted-notes'
import 'toasted-notes/src/styles.css'

import { resetPassword, checkToken, resetInvalidToken, resetTokenReverse } from '../redux/actions/forgot-password'
import { resetMessage } from '../redux/actions/messages'
import { connect } from 'react-redux'

import './ResetPasswordPage.css'
  
  class ChangePasswordPage extends React.Component {
    state = {
      confirmDirty: false,
      autoCompleteResult: [],
      token: ''
    }

    componentWillMount = async () => {
      const { match: { params }, checkToken } = this.props
      this.setState({ token: params.token })
      checkToken(params.token)
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.message) {
          toaster.notify(this.props.message, { duration: 1000 })
          this.props.resetMessage()
        }

        if(this.props.invalidToken) {
          this.props.history.push('/')
          this.props.resetInvalidToken()
        }

        if(this.props.resetToken) {
          this.props.history.push('/')
          this.props.resetTokenReverse()
        }

        if(this.props.newPassword !== prevProps.newPassword) {
          this.props.form.setFieldsValue({
            newPassword: '',
            confirmNewPassword: ''
          })
        }

    }
  
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.props.resetPassword(this.state.token, values.newPassword)
          this.props.form.setFieldsValue({
            newPassword: '',
            confirmNewPassword: ''
          })
        }
      })
    }
  
    handleConfirmBlur = e => {
      const value = e.target.value
      this.setState({ confirmDirty: this.state.confirmDirty || !!value })
    }

    compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('newPassword')) {
        callback('Passwords don\'t match!');
      } else {
        callback();
      }
    };
  
    validateToNextPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirmNewPassword'], { force: true });
      }
      callback();
    };
  
    render() {
      const { getFieldDecorator } = this.props.form
      return (
        <div className="ResetPasswordPage">
          <div className="ResetPasswordPage-Container">
            <section className="ResetPasswordPage-Section">
              <span className="ResetPasswordPage-Title">Forgot Password</span>
              <Form onSubmit={this.handleSubmit}>
                <Form.Item hasFeedback >
                  {getFieldDecorator('newPassword', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your new password!',
                      },
                      {
                        min: 5,
                        message: 'Password has to be at least 5 characters long!',
                      },
                      {
                        validator: this.validateToNextPassword,
                      },
                    ],
                  })(<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="New Password" />)}
                </Form.Item>

                <Form.Item hasFeedback >
                  {getFieldDecorator('confirmNewPassword', {
                    rules: [
                      {
                        required: true,
                        message: 'Please confirm your new password!',
                      },
                      {
                        validator: this.compareToFirstPassword,
                      },
                    ],
                  })(<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Confirm New Password" />)}
                </Form.Item>

                <Form.Item >
                  <Button className="ResetPasswordPage-Button" type="primary" htmlType="submit">
                    Change Password
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
  
const ResetPasswordPage = Form.create({ name: 'ChangePasswordForm' })(ChangePasswordPage)

const mapStateToProps = (state) => {
    return({
      message: state.messagesReducer.message,
      invalidToken: state.forgotPasswordReducer.invalidToken,
      resetToken: state.forgotPasswordReducer.resetToken
    })
}

const mapDispatchToProps = (dispatch) => {
    return({
        resetPassword: (token, password) => dispatch(resetPassword(token, password)),
        checkToken: (token) => dispatch(checkToken(token)),
        resetInvalidToken: () => dispatch(resetInvalidToken()),
        resetTokenReverse: () => dispatch(resetTokenReverse()),
        resetMessage: () => dispatch(resetMessage())
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage)