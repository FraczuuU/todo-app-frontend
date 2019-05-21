import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'

import { loginRequest } from '../redux/actions/login'
import { connect } from 'react-redux'

import './LoginForm.css'

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.loginRequest(values.username, values.password, values.remember)
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="/forgot-password">
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          I want to <a href="/register">create an account</a>
        </Form.Item>
      </Form>
    );
  }
}

const LoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

const mapStateToProps = (state) => {
  return({})
}

const mapDispatchToProps = (dispatch) => {
  return({
      loginRequest: (email, password, remember) => dispatch(loginRequest(email, password, remember))
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)