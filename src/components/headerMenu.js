import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'gatsby';
import Logo from '../vectors/isotype.svg';

const { Header } = Layout;
const role = "logged";

function HeaderMenu({
  handleLoginModal
}) {

  return (
    <Header className='header'>
      <Menu mode="horizontal" defaultSelectedKeys={['0']}>
        <Menu.Item key="0" className="ant-menu-no-line">          
          <Logo className='menu-logo'/>
        </Menu.Item>
        <Menu.Item key="1">
          <Link className='nav-link' to='/'>Home</Link>
        </Menu.Item>
        {role === 'logged' && 
          <Menu.Item key="2">
            <Link className='nav-link' to="/account">Account</Link>
          </Menu.Item>
        }
        <Menu.Item key="3" className="ant-menu-no-line" style={{float: 'right'}}>
          <Link
            className='nav-link'
            to='/'
            onClick={handleLoginModal}>Login</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
}

export default HeaderMenu;