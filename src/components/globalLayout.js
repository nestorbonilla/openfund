import React from 'react';
import {
    useNetlifyIdentity,
    IdentityContextProvider,
  } from 'react-netlify-identity-widget';
  import 'react-netlify-identity-widget/styles.css';
import { Layout } from 'antd';
import { Global, css } from '@emotion/core';
import Helmet from 'react-helmet';
import 'antd/dist/antd.css';
import './globalLayout.less';
import HeaderMenu from './headerMenu';
import useSiteMetadata from '../hooks/use-sitemetadata';

const { Content, Footer } = Layout;

function GlobalLayout({children}) {

    const identity = useNetlifyIdentity("https://openfund.netlify.app/.netlify/identity");

    //const [showLoginModal, setShowLoginModal] = useState(false);
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
            <IdentityContextProvider value={identity}>
                <Layout style={{ minHeight: '100vh' }}>
                    <HeaderMenu />                    
                    <Layout className="site-layout">
                        <Content >
                            <main>{children}</main>                        
                        </Content>
                    </Layout>
                    <Footer style={{ textAlign: 'center' }}>RadicalxChange © {new Date().getFullYear()}</Footer>
                </Layout>
            </IdentityContextProvider>
        </>
    );
}

export default GlobalLayout;