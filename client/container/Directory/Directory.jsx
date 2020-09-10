import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';

import { images } from '../../static';

import { LeftMenu } from './LeftMenu';
import { UserCard } from './UserCard';

import './styles.scss';

const tableHeaderList = [
  {
    id: 'fio',
    name: 'ФИО',
  },
  {
    id: 'position',
    name: 'Должность',
  },
  {
    id: 'city',
    name: 'Город',
  },
  {
    id: 'phone',
    name: 'Телефон',
  },
  {
    id: 'structure',
    name: 'Структура',
  },
  {
    id: 'id',
    name: 'Табельный №',
  },
];

const employeeList = [
  {
    img: null,
    fio: 'Зарецкий Александр Михайлович',
    position: 'Генеральный директор',
    city: 'г. Москва, Главное отделение',
    phone: '+7 (936) 000-50-46',
    structure: 'НПФ',
    id: '881',
  },
  {
    img: null,
    fio: 'Зарецкий Александр Михайлович',
    position: 'Генеральный директор',
    city: 'г. Москва, Главное отделение',
    phone: '+7 (936) 000-50-46',
    structure: 'НПФ',
    id: '882',
  },
  {
    img: null,
    fio: 'Зарецкий Александр Михайлович',
    position: 'Генеральный директор',
    city: 'г. Москва, Главное отделение',
    phone: '+7 (936) 000-50-46',
    structure: 'НПФ',
    id: '883',
  },
  {
    img: null,
    fio: 'Зарецкий Александр Михайлович',
    position: 'Генеральный директор',
    city: 'г. Москва, Главное отделение',
    phone: '+7 (936) 000-50-46',
    structure: 'НПФ',
    id: '884',
  },
  {
    img: null,
    fio: 'Зарецкий Александр Михайлович',
    position: 'Генеральный директор',
    city: 'г. Москва, Главное отделение',
    phone: '+7 (936) 000-50-46',
    structure: 'НПФ',
    id: '885',
  },
  {
    img: null,
    fio: 'Зарецкий Александр Михайлович',
    position: 'Генеральный директор',
    city: 'г. Москва, Главное отделение',
    phone: '+7 (936) 000-50-46',
    structure: 'НПФ',
    id: '886',
  },
  {
    img: null,
    fio: 'Зарецкий Александр Михайлович',
    position: 'Генеральный директор',
    city: 'г. Москва, Главное отделение',
    phone: '+7 (936) 000-50-46',
    structure: 'НПФ',
    id: '887',
  },
  {
    img: null,
    fio: 'Зарецкий Александр Михайлович',
    position: 'Генеральный директор',
    city: 'г. Москва, Главное отделение',
    phone: '+7 (936) 000-50-46',
    structure: 'НПФ',
    id: '888',
  },
  {
    img: null,
    fio: 'Зарецкий Александр Михайлович',
    position: 'Генеральный директор',
    city: 'г. Москва, Главное отделение',
    phone: '+7 (936) 000-50-46',
    structure: 'НПФ',
    id: '889',
  },
  {
    img: null,
    fio: 'Зарецкий Александр Михайлович',
    position: 'Генеральный директор',
    city: 'г. Москва, Главное отделение',
    phone: '+7 (936) 000-50-46',
    structure: 'НПФ',
    id: '890',
  },
];

export const Directory = () => {
  const [leftMenuVisible, setLeftMenuVisible] = useState(false);
  const [userCardVisible, setUserCardVisible] = useState(false);
  const [userId, setUserId] = useState(null);

  const _handleMenuVisible = () => setLeftMenuVisible(!leftMenuVisible);
  const _handleCloseCard = () => {
    setUserId(null);
    setUserCardVisible(false);
  };
  const _handleCardVisible = (id) => {
    if (userId === id) {
      return;
    }
    if (!userCardVisible) {
      setUserCardVisible(true);
    }
    setUserId(id);
  };

  return (
    <div className="directory">
      <Row className="directory__row">
        <span className="directory__title">АО «НПФ Сбербанка»</span>
      </Row>
      <Row className="directory__row">
        <table className={`directory__table ${userCardVisible ? 'directory__table--narrow' : ''}`}>
          <thead className="directory__table-header">
            <tr className="directory__table-header-row">
              {
                tableHeaderList.map((header) => (
                  <th key={header.id} className="directory__table-header-item">{header.name}</th>
                ))
              }
            </tr>
          </thead>
          <tbody className="directory__table-body">
            {
              employeeList.map((row, index) => (
                <tr
                  key={`${row.id}-${index}`}
                  className="directory__table-body-row"
                  onClick={() => _handleCardVisible(row.id)}
                >
                  {
                    tableHeaderList.map((item) => (
                      <td key={row[item.id]} className="directory__table-cell">
                        {
                          item.id === 'fio' && <img src={images.emptyAvatar} alt="аватар" />
                        }
                        {row[item.id]}
                      </td>
                    ))
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      </Row>
      <LeftMenu
        visible={leftMenuVisible}
        onClose={_handleMenuVisible}
      />
      <UserCard
        visible={userCardVisible}
        onClose={_handleCloseCard}
      />
    </div>
  );
};

Directory.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object,
};
