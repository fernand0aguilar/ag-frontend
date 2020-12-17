import React, { useState } from 'react';
import { Link } from 'gatsby';
import styled from 'react-emotion';

import { Layout, Menu } from 'antd';
import theme from '../../config/theme';

const { Sider } = Layout;
const { SubMenu } = Menu;

const CustomSider = styled(Sider)`
  background-color: ${theme.colors.greyMedium};
`;

const SideMenu = () => {
  const [current, setCurrent] = useState(0);

  const handleClick = e => {
    setCurrent({
      current: e.key,
    });
  };

  return (
    <CustomSider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      theme="light"
    >
      <div className="logo" />
      <Menu
        theme="light"
        onClick={handleClick}
        style={{}}
        defaultOpenKeys={['sub1']}
        selectedKeys={[current]}
        mode="inline"
      >
        <SubMenu key="sub1" title="Work">
          <Menu.Item>
            <Link to="hello-world">First Phase</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="hello-world">Second Phase</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="hello-world">Third Phase</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title="About">
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu key="sub4" title="Contact">
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu>
      </Menu>
    </CustomSider>
  );
};

export default SideMenu;
