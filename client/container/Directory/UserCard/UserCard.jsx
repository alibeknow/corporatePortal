import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Drawer, Row, Tabs } from 'antd';

import { CardToggle } from './CardToggle';
import avatarMock from './photoMock.svg';
import './styles.scss';

const { TabPane } = Tabs;

export const UserCard = ({ visible, onClose }) => (
  <Drawer
    className="user-card"
    placement="right"
    getContainer={false}
    style={{ position: 'absolute' }}
    visible={visible}
    mask={false}
    closable={false}
    width={500}
  >
    <div className="user-card__content">
      <div className={`user-card__close ${!visible ? 'user-card__close--hide' : ''}`} onClick={onClose}>
        <span className="icon-close" />
        <CardToggle />
      </div>
      {
        visible && (
          <>
            <Row className="user-card__row user-card__row--large">
              <span className="user-card__dictionary-title">
                АО «НПФ Сбербанка» - Сектор технического сопровождения
              </span>
            </Row>
            <Row className="user-card__row">
              <Col className="user-card__username">
                <span className="user-card__username-text">Мельников</span>
                <span className="user-card__username-text">Дмитрий Александрович</span>
              </Col>
              <Col className="user-card__avatar">
                <img src={avatarMock} alt="аватар" />
              </Col>
              <Row className="user-card__user-position">
                Ведущий системный администратор — НПФ
              </Row>
            </Row>
            <Row className="user-card__row">
              <Tabs defaultActiveKey="1" type="card">
                <TabPane tab="Card Tab 1" key="1">
                  Content of card tab 1
                </TabPane>
              </Tabs>
            </Row>
            <Row className="user-card__row">
              <Button className="user-card__button">В избранное</Button>
              <Button className="user-card__button">Получить контакт QR</Button>
            </Row>
          </>
        )
      }
    </div>
  </Drawer>
);

UserCard.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};
