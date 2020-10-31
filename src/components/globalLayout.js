import React from 'react';
//import netlifyIdentity from 'netlify-identity-widget';
import { Layout } from 'antd';
import { Global, css } from '@emotion/core';
import Helmet from 'react-helmet';
import 'antd/dist/antd.css';
import './globalLayout.less';
import HeaderMenu from './headerMenu';
import useSiteMetadata from '../hooks/use-sitemetadata';

const { Content, Footer } = Layout;

function GlobalLayout({children}) {

    //netlifyIdentity.open(); // open the modal
    //const user = netlifyIdentity.currentUser();
    //console.log('current user, ', user);
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
            <Layout style={{ minHeight: '100vh' }}>
                <HeaderMenu />    
                <div id="netlify-modal"></div>                
                <Layout className="site-layout">
                    <Content >
                        <main>{children}</main>                        
                    </Content>
                </Layout>
                <Footer style={{ textAlign: 'center' }}>RadicalxChange © {new Date().getFullYear()}</Footer>
            </Layout>
        </>
    );
}

export default GlobalLayout;