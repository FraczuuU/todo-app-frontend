import React from 'react'
import {
    Form,
    Input,
    Button,
    Icon
} from 'antd'

import toaster from 'toasted-notes'
import 'toasted-notes/src/styles.css'

import { changeUsername, getProfile } from '../../../redux/actions/user'
import { resetMessage } from '../../../redux/actions/messages'
import { connect } from 'react-redux'

import './ChangeUsernameForm.css'
  
  class ChangeUsernameForm extends React.Component {
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

        if(this.props.username !== prevProps.username) {
          this.props.form.setFieldsValue({
            username: '',
            password: ''
          })
        }

    }
  
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.props.changeUsername(values.username, values.password)
          this.props.form.setFieldsValue({
            username: '',
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
        <Form onSubmit={this.handleSubmit} className="ChangeUsernameForm" >

          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input new username!', whitespace: true }],
            })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={ this.props.username } />)}
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
            <Button className="ChangeUsernameForm-Button" type="primary" htmlType="submit">
              Change Username
            </Button>
          </Form.Item>
          
        </Form>
      )
    }
}
  
const SettingsUsernameForm = Form.create({ name: 'changeUsername' })(ChangeUsernameForm)

const mapStateToProps = (state) => {
    return({
      message: state.messagesReducer.message,
      username: state.userReducer.username
    })
}

const mapDispatchToProps = (dispatch) => {
    return({
        getProfile: () => dispatch(getProfile()),
        changeUsername: (username, password) => dispatch(changeUsername(username, password)),
        resetMessage: () => dispatch(resetMessage()),
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsUsernameForm)