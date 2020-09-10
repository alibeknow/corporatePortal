import React from 'react';
import { Button, Col, Row } from 'antd';

import { images } from '../../static';

import './styles.scss';

const footerLinkLeft = [
  'Новости',
  'О Компании',
  'Фото и видео',
  'Телефонный справочник',
];

const footerLinkRight = [
  'Сервисы',
  'Адаптация',
  'База знаний',
  'Личный кабинет',
];

export const Footer = () => (
  <div className="footer">
    <Row className="footer__row">
      <Col className="footer__logo-col">
        <img src={images.SBSLogo} alt="СБЕРБАНК СЕРВИС" />
        <span className="footer__rights">© ПАО Сбербанк</span>
      </Col>
      <Col className="footer__nav-col">
        <Col className="footer__link-col">
          {
            footerLinkLeft.map((item) => (
              <span key={item} className="footer__nav-item">{item}</span>
            ))
          }
        </Col>
        <Col className="footer__link-col">
          {
            footerLinkRight.map((item) => (
              <span key={item} className="footer__nav-item">{item}</span>
            ))
          }
        </Col>
      </Col>
      <Col className="footer__button-col">
        <Button className="footer__button">Написать руководству компании</Button>
      </Col>
    </Row>
  </div>
);
