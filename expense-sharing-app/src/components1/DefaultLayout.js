import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: #001529;
  color: white;
`;

const UsernameContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownMenu = styled.div`
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: absolute;
  right: 0;
  top: 30px;
  background-color: white;
  color: black;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
`;

const DropdownItem = styled(Link)`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  &:hover {
    background-color: #ddd;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

function DefaultLayout(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const user = JSON.parse(localStorage.getItem('expense-app'));

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <Layout>
      <Header>
        <h1 className="logo">DASHBOARD</h1>
        <UsernameContainer>
          <h1 className="username" onClick={handleDropdownToggle}>{user.name}</h1>
          <DropdownMenu show={showDropdown}>
            <DropdownItem to="/create-group">Create Group</DropdownItem>
            <DropdownItem to="/group-management">Group Display</DropdownItem>
            {/* <DropdownItem to="/main-content">Group Management</DropdownItem> */}
          </DropdownMenu>
        </UsernameContainer>
      </Header>
      <Content>
        {props.children}
      </Content>
    </Layout>
  );
}

export default DefaultLayout;
