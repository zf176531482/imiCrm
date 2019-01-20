import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import { Checkbox, Alert, Icon } from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';

const { Tab, Email, UserName, Password, Mobile, Captcha, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          // type,
        },
      });
    }
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { login, submitting } = this.props;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.bg}>
          <img src={require('../../assets/login-bg.png')} alt="" />
          <img
            src={require('../../assets/login-bg2.png')}
            style={{ height: '91%', marginRight: '60px' }}
            alt=""
          />
        </div>
        <div className={styles.loginBox}>
          <h1 className={styles.title}>Valve Doctor Solutions</h1>
          <div className={styles.logo}>
            <img src={require('../../assets/login_logo.png')} alt="" />
          </div>
          <div className={styles.main}>
            <Login
              defaultActiveKey={type}
              onTabChange={this.onTabChange}
              onSubmit={this.handleSubmit}
              ref={form => {
                this.loginForm = form;
              }}
            >
              {login.status === 'ERROR' &&
                !submitting &&
                this.renderMessage(formatMessage({ id: 'app.login.message-invalid-credentials' }))}
              <Email
                name="username"
                placeholder={`${formatMessage({ id: 'app.login.username' })}`}
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.username.required' }),
                  },
                ]}
              />
              <Password
                name="password"
                placeholder={`${formatMessage({ id: 'app.login.password' })}`}
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.password.required' }),
                  },
                ]}
                onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
              />
              <Submit loading={submitting}>
                <FormattedMessage id="app.login.login" />
              </Submit>
            </Login>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
