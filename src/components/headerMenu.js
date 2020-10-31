import React, { useState } from 'react';
import netlifyIdentity from 'netlify-identity-widget';
import { Layout, Menu } from 'antd';
import { Link } from 'gatsby';
import Logo from '../vectors/isotype.svg';

const { Header } = Layout;

function HeaderMenu() {

  const user = netlifyIdentity.currentUser();

  return (
    <Header className='header'>
      <Menu mode="horizontal" defaultSelectedKeys={['0']}>
        <Menu.Item key="0" className="ant-menu-no-line">          
          <Logo className='menu-logo'/>
        </Menu.Item>
        <Menu.Item key="1">
          <Link className='nav-link' to='/'>Home</Link>
        </Menu.Item>
        {user && 
          <Menu.Item key="2">
            <Link className='nav-link' to="/account">Account</Link>
          </Menu.Item>
        }
        { user &&
          <Menu.Item key="3" className="ant-menu-no-line" style={{float: 'right'}}>
            <a className='nav-link' onClick={() => netlifyIdentity.logout()}>Logout</a>
          </Menu.Item>
        || <Menu.Item key="3" className="ant-menu-no-line" style={{float: 'right'}}>
            <a className='nav-link' onClick={() => netlifyIdentity.open()}>Login</a>
          </Menu.Item>
        }        
      </Menu>
    </Header>
  );
}

export default HeaderMenu;