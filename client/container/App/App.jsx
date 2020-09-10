import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

import './styles.scss';

const { Content } = Layout;

export const App = ({ component: Component, pageProps }) => (
    <Layout>
      <Header />
      <Content>
        <Component {...pageProps} />
      </Content>
      <Footer />
    </Layout>
);

App.propTypes = {
  component: PropTypes.func.isRequired,
  pageProps: PropTypes.object,
};
