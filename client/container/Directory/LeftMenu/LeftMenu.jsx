import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, Input, Row } from 'antd';

import { MenuToggle } from './MenuToggle';
import './styles.scss';

const dictionaryListMock = [
  'ПАО Сбербанк (ЦА)',
  'Подразделения центрального подчинения',
  'Территориальные банки',
  'Корпоративный университет Сбербанка',
  'ДЗО Экосистемы',
  'ПАО Сбербанк (ЦА)',
  'Подразделения центрального подчинения',
  'Территориальные банки',
  'Корпоративный университет Сбербанка',
  'ДЗО Экосистемы',
];

export const LeftMenu = ({ visible, onClose }) => (
  <Drawer
    className="left-menu"
    placement="left"
    getContainer={false}
    style={{ position: 'absolute' }}
    visible={visible}
    mask={false}
    closable={false}
    width={360}
  >
    <div className="left-menu__content">
      <div className="left-menu__close" onClick={onClose}>
        {
          visible
            ? <span className="icon-close" />
            : <span className="icon-directory" />
        }
      </div>
      <MenuToggle />
      {
        visible && (
          <>
            <Row className="left-menu__row">
              <Input
                className="left-menu__find"
                prefix={<span className="icon-find left-menu__content-icon" />}
                placeholder="Подразделение"
              />
            </Row>
            <Row className="left-menu__row">
              <ul className="left-menu__dictionary-list">
                {
                  dictionaryListMock.map((item) => (
                    <li key={item} className="left-menu__dictionary-item">&bull; {item}</li>
                  ))
                }
              </ul>
            </Row>
          </>
        )
      }
    </div>
  </Drawer>
);

LeftMenu.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};
