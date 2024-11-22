import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
const items = [

    {
        key: '',
        label: (
            <NavLink to={'/'}>
                Users
            </NavLink>

        ),
    },
    {
        key: 'clients',
        label: (
            <NavLink to={'/clients'}>
                Clients
            </NavLink>
        ),
    },
    {
        key: 'notas',
        label: (
            <NavLink to={'/notas'}>
                Notas
            </NavLink>
        ),
    },
];


const Navbar = () => {
    const actualUrl = window.location.href
    const currentUrl = actualUrl.slice(22)
    const [current, setCurrent] = useState(currentUrl);
    const onClick = (e) => {
        setCurrent(e.key);
    };
    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} className='mb-5 bg-slate-200' />;
};
export default Navbar;