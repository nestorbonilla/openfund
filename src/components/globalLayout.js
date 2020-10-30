import React, { useState } from 'react';
import { Layout } from "antd";
import { Global, css } from '@emotion/core';
import Helmet from 'react-helmet';
import 'antd/dist/antd.css';
import './layout.less';
import HeaderMenu from './headerMenu';
import LoginModal from './loginModal';
import useSiteMetadata from '../hooks/use-sitemetadata';

const { Content, Footer } = Layout;

function GlobalLayout({children}) {

    const [showLoginModal, setShowLoginModal] = useState(false);
    const { title, description } = useSiteMetadata();

    return (
        <>
            <Global
                styles={css`
                `}
            />
            <Helmet>
                <html lang="en" />
                <title>{title}</title>
                <meta name="description" content={description} />
            </Helmet>
            <Layout style={{ minHeight: '100vh' }}>
                <HeaderMenu
                    handleLoginModal={() => setShowLoginModal(true)} />
                <LoginModal
                    data-testid='login-form'
                    show={showLoginModal}
                    handleOnClose={() => setShowLoginModal(false)}
                />
                <Layout className="site-layout">
                    <Content >
                        <main>{children}</main>
                    </Content>
                </Layout>
                <Footer style={{ textAlign: 'center' }}>RadicalxChange © 2020</Footer>
            </Layout>
        </>
    );
}

export default GlobalLayout;