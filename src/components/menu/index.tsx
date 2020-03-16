import React from 'react';
import style from './index.module.scss'
import ulog from 'ulog';

import { Menu } from 'antd';
import 'antd/dist/antd.css';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const log = ulog('menu');

interface Props {
    items: any
    [x: string]: any
}
export default class Component extends React.Component<Props> {
    constructor(props: Props) {
        log.log('Menu:constructor reached');
        super(props);
    }

    render() {
        log.log('Menu:render reached');
        function generateItems(items: any): any {
            return items.map((item: any) => {
                switch (item.type) {
                    case 'submenu':
                        return (
                            <SubMenu key={item.key} title={item.title}>
                                {generateItems(item.children)}
                            </SubMenu>
                        )
                        break;
                    case 'itemgroup':
                        return (
                            <Menu.ItemGroup key={item.key} title={item.title}>
                                {generateItems(item.children)}
                            </Menu.ItemGroup>
                        )
                        break;
                    case 'item':
                        return (
                            <Menu.Item key={item.key}>{item.title}</Menu.Item>
                        )
                        break;
                }
            })
        }

        let {...props} = this.props;

        return (
            <div className={[style.component].join(' ')}>
                <Menu
                    //onClick={this.handleClick}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    {...props}
                >
                    {generateItems(this.props.items)}
                </Menu>
            </div>
        )
    }
}



