import React from 'react';
import { Row, Col, Form, Button, Input, Checkbox } from 'antd';

import { images } from '../../static';

import './styles.scss';

export const Login = () => <div className="login-page">
  <Row>
    <Col>
      <Row type="flex" className="login-page__form">
        <Row className="login-page__form-row" justify="center">
          <img className="login-page__logo" src={images.SBSLogo} alt="Вход в корпоративный портал" />
        </Row>
        <Row className="login-page__form-row login-page__form-title" justify="center">
          Введите учетные данные
        </Row>
        <Row className="login-page__form-row" justify="center">
          <Form onFinish={() => {}} layout='vertical' name="login-form" className="login-page__form-content">
            <Form.Item
              label="Логин"
              className='login-page__form-field'
              name="login"
            >
              <Input className='login-page__form-input' />
            </Form.Item>
            <Form.Item
              label="Пароль"
              className='login-page__form-field'
              name="password"
            >
              <Input.Password className='login-page__form-input' />
            </Form.Item>
            <Form.Item
              name="remember"
              className="form-checkbox-label"
            >
              <Checkbox
                className="login-page__form-checkbox"
                defaultChecked={true}
              >
                Запомнить
              </Checkbox>
            </Form.Item>
            <Row className="login-page__form-row">
              <Button htmlType='submit' className="login-page__form-button">Войти</Button>
            </Row>
          </Form>
        </Row>
      </Row>
    </Col>
    <Col className="login-page__image-col">
      <img src={images.loginPageImage} alt="авторизация" />
    </Col>
  </Row>
</div>;
