import React from 'react';
import { Row, Col, Input } from 'antd';

import { images } from '../../static';

import './styles.scss';
import Avatar from './userAvatar.svg';

const menuList = [
  'Новости',
  'О Компании',
  'Фото и видео',
  'Сервисы',
  'Адаптация',
  'База знаний',
];

export const Header = () => (
  <div className="header">
    <Row className="header__row" align="middle" type="flex" justify="space-between">
      <Col className="header__logo">
        <img className="header__logo-image" src={images.SBSLogo} alt="СБЕРБАНК СЕРВИС" />
      </Col>
      <Col className="header__menu">
        {
          menuList.map((menu) => (
            <span key={menu} className="header__menu-item">{menu}</span>
          ))
        }
      </Col>
      <Col className="header__control">
        <span className="icon-bell header__control-icon" />
        <span className="icon-gear header__control-icon" />
        <div className="header__control-user">
          <Row align="middle" type="flex">
            <img src={Avatar} alt="аватар" />
            <div className="header__control-user">
              <span className="header__control-user-name">Константин</span>
              <span className="header__control-user-name">Константинопольский</span>
            </div>
          </Row>
        </div>
      </Col>
    </Row>
    <Row className="header__row" align="middle" justify="center" type="flex">
      <Input
        className="header__find"
        prefix={<span className="icon-find header__filter-icon" />}
        placeholder="Введите ФИО, должность или подразделение сотрудника"
      />
      <span className="icon-filter header__filter-icon" />
    </Row>
  </div>
);
