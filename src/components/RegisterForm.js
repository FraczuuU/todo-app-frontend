import React from 'react'
import {
    Form,
    Input,
    Button,
    Icon
} from 'antd'

import { registerRequest } from '../redux/actions/register'
import { connect } from 'react-redux'

import './RegisterForm.css'
  
  class RegistrationForm extends React.Component {
    state = {
      confirmDirty: false,
      autoCompleteResult: [],
    };
  
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.props.registerRequest(values.username, values.password, values.email)
        }
      });
    };
  
    handleConfirmBlur = e => {
      const value = e.target.value;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
  
    compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Passwords don\t match!');
      } else {
        callback();
      }
    };
  
    validateToNextPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    };
  
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <Form onSubmit={this.handleSubmit} className="register-form" >
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!', whitespace: true }],
            })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />)}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  min: 5,
                  message: 'Password has to be at least 5 characters long!',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Password" />)}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input.Password  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Confirm Password" onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
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
            <Button className="register-form-button" type="primary" htmlType="submit">
              Register
            </Button>
            I want to <a href="/">login now!</a>
          </Form.Item>
            
        </Form>
      );
    }
}
  
const RegisterForm = Form.create({ name: 'register' })(RegistrationForm)

const mapStateToProps = (state) => {
    return({})
}

const mapDispatchToProps = (dispatch) => {
    return({
        registerRequest: (username, password, email) => dispatch(registerRequest(username, password, email))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)