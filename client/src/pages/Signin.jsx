import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const resp = await fetch('/login', {
          method: 'POST',
          headers: new Headers({
            "Content-Type": "application/json"
          }),
          body: JSON.stringify(values),
        });

        const data = await resp.json();

        if (data.auth === true) {
          this.props.setAuth(true, data.userid);
        }
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form" style={{
        width: '300px',
        margin: '1em auto'
      }}>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
        </FormItem>
        <FormItem>
          {/* {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
            )}<br/>
          <a className="login-form-forgot" href="">Forgot password</a><br/> */}
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button><br/>
          {/* Or <a href="">register now!</a> */}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(NormalLoginForm);