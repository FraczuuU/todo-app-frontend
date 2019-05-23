import React from 'react'
import {
    Form,
    Input,
    Button,
    Icon
} from 'antd'

import toaster from 'toasted-notes'
import 'toasted-notes/src/styles.css'

import { changeEmail, getProfile } from '../../../redux/actions/user'
import { resetMessage } from '../../../redux/actions/messages'
import { connect } from 'react-redux'

import './ChangeEmailForm.css'
  
  class ChangeEmailForm extends React.Component {
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

        if(this.props.email !== prevProps.email) {
          this.props.form.setFieldsValue({
            email: '',
            password: ''
          })
        }

    }
  
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.props.changeEmail(values.email, values.password)
          this.props.form.setFieldsValue({
            email: '',
            password: ''
          })
        }
      })
    }
  
    handleConfirmBlur = e => {
      const value = e.target.value
      this.setState({ confirmDirty: this.state.confirmDirty || !!value })
    }
  
    render() {
      const { getFieldDecorator } = this.props.form
      return (
        <Form onSubmit={this.handleSubmit} className="ChangeEmailForm" >

          <Form.Item>
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                { 
                  required: true,
                  message: 'Please input new email!', 
                  whitespace: true 
                }
              ],
            })(<Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={ this.props.email } />)}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!',
                }
              ],
            })(<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Password" />)}
          </Form.Item>

          <Form.Item >
            <Button className="ChangeEmailForm-Button" type="primary" htmlType="submit">
              Change email
            </Button>
          </Form.Item>
          
        </Form>
      )
    }
}
  
const SettingsEmailForm = Form.create({ name: 'changeEmail' })(ChangeEmailForm)

const mapStateToProps = (state) => {
    return({
      message: state.messagesReducer.message,
      email: state.userReducer.email
    })
}

const mapDispatchToProps = (dispatch) => {
    return({
        getProfile: () => dispatch(getProfile()),
        changeEmail: (email, password) => dispatch(changeEmail(email, password)),
        resetMessage: () => dispatch(resetMessage()),
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsEmailForm)