import React from 'react'
import {
    Form,
    Input,
    Button,
    Icon
} from 'antd'

import toaster from 'toasted-notes'
import 'toasted-notes/src/styles.css'

import { changePassword, getProfile } from '../../../redux/actions/user'
import { resetMessage } from '../../../redux/actions/messages'
import { connect } from 'react-redux'

import './ChangePasswordForm.css'
  
  class ChangePasswordForm extends React.Component {
    state = {
      confirmDirty: false,
      autoCompleteResult: []
    }

    componentWillMount() {
      this.props.getProfile()
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.message) {
          toaster.notify(this.props.message, { duration: 1000 })
          this.props.resetMessage()
        }

        if(this.props.newPassword !== prevProps.newPassword) {
          this.props.form.setFieldsValue({
            password: '',
            newPassword: '',
            confirmNewPassword: ''
          })
        }

    }
  
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.props.changePassword(values.newPassword, values.password)
          this.props.form.setFieldsValue({
            password: '',
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
        <Form onSubmit={this.handleSubmit} className="ChangePasswordForm" >

          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your password!', whitespace: true }],
            })(<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Password' />)}
          </Form.Item>

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
            <Button className="ChangePasswordForm-Button" type="primary" htmlType="submit">
              Change Password
            </Button>
          </Form.Item>
          
        </Form>
      )
    }
}
  
const SettingsPasswordForm = Form.create({ name: 'changePassword' })(ChangePasswordForm)

const mapStateToProps = (state) => {
    return({
      message: state.messagesReducer.message
    })
}

const mapDispatchToProps = (dispatch) => {
    return({
        getProfile: () => dispatch(getProfile()),
        changePassword: (newPassword, password) => dispatch(changePassword(newPassword, password)),
        resetMessage: () => dispatch(resetMessage()),
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPasswordForm)