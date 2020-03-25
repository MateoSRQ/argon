import React from 'react';
import style from './index.module.scss'
import ulog from 'ulog'


import {connect} from 'react-redux';
import Redux from "redux";

import { Button, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import ReactJson from "react-json-view";

let log = ulog('users/view')

interface Props {
    [x: string]: any
};

interface State {

};

class Component extends React.Component<Props, State> {
    constructor(props: Props) {
        log.log('Users:view:constructor reached');
        super(props);
    }

    render() {
        log.log('Users:view:render reached');
        let {...props} = this.props;
        return (
            <div className={[style.component].join(' ')} {...props}>
                {this.props.children}
            </div>
        )
    }
}


export default Component;


