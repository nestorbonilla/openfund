import React, { useState } from 'react';
import { Link } from 'gatsby';
import IdentityModal, { useIdentityContext } from 'react-netlify-identity-widget';
import { Layout, Menu } from 'antd';
import { Global, css } from '@emotion/core';
import Helmet from 'react-helmet';
import 'antd/dist/antd.css';
import 'react-netlify-identity-widget/styles.css'; // delete if you want to bring your own CSS
import './globalLayout.less';
import HeaderMenu from './headerMenu';
import LoginModal from './loginModal';
import useSiteMetadata from '../hooks/use-sitemetadata';
import Logo from '../vectors/isotype.svg';

const { Header, Content, Footer } = Layout;

function GlobalLayout({children}) {

    const identity = useIdentityContext();
    const [dialog, setDialog] = React.useState(false);
    const name = (identity && identity.user && identity.user.user_metadata && identity.user.user_metadata.name) || "NoName";
    console.log('user now, ', name);

    console.log(JSON.stringify(identity));
    const isLoggedIn = identity && identity.isLoggedIn;

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
                {/*<HeaderMenu
                    handleLoginModal={() => setShowLoginModal(true)} />
                <LoginModal
                    data-testid='login-form'
                    show={showLoginModal}
                    handleOnClose={() => setShowLoginModal(false)}
                /> */}
                <Header className='header'>
                    <Menu mode="horizontal" defaultSelectedKeys={['0']}>
                        <Menu.Item key="0" className="ant-menu-no-line">          
                            <Logo className='menu-logo'/>
                        </Menu.Item>
                        <Menu.Item key="1">
                            <Link className='nav-link' to='/'>Home</Link>
                        </Menu.Item>
                        {isLoggedIn ? <Menu.Item key="2"><Link className='nav-link' to="/account">Account</Link></Menu.Item> : <></>}
                        {/* {role === 'logged' && 
                        <Menu.Item key="2">
                            <Link className='nav-link' to="/account">Account</Link>
                        </Menu.Item>
                        } */}
                        {/* <Menu.Item key="3" className="ant-menu-no-line" style={{float: 'right'}}>
                        <Link
                            className='nav-link'
                            to='/'
                            onClick={handleLoginModal}>Login</Link>
                        </Menu.Item> */}
                        {isLoggedIn ? `Hello ${name}, Log out here!` : "LOG IN"}
                    </Menu>
                </Header>
                <Layout className="site-layout">
                    <Content >
                        <main>{children}</main>
                        <IdentityModal showDialog={dialog} onCloseDialog={() => setDialog(false)} />
                    </Content>
                </Layout>
                <Footer style={{ textAlign: 'center' }}>RadicalxChange © 2020</Footer>
            </Layout>
        </>
    );
}

export default GlobalLayout;