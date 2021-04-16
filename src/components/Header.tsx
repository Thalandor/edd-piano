import { Menu } from "antd";
import React, { useState } from "react";
import {
  AudioOutlined,
  CustomerServiceOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [current, setCurrent] = useState<string>("piano");

  const handleClick = (e: any) => {
    setCurrent(e.key);
  };
  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="piano" icon={<AudioOutlined />}>
        <NavLink to="/">Piano</NavLink>
      </Menu.Item>
      <Menu.Item key="market" icon={<DollarOutlined />}>
        <NavLink to="/market">Market</NavLink>
      </Menu.Item>
      <Menu.Item key="owned" icon={<CustomerServiceOutlined />}>
        <NavLink to="/owned">Owned pieces</NavLink>
      </Menu.Item>
    </Menu>
  );
};

export default Header;
