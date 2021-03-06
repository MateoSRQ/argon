import React from 'react';
import style from './index.module.scss'
import ulog from 'ulog'

import Modal from '../modal';



import Scrollable from 'react-custom-scrollbars';

import {connect} from 'react-redux';
import Redux from "redux";
import {ReduxState } from "../../../redux/reducers";
import { selectUserActionItem } from "../../../redux/actions";

import { Button, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import ReactJson from "react-json-view";

let log = ulog('users/view')

interface Props {
    selectUserActionItem: any,
    data: any
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



        let menu = (
            <Menu
                onClick={this.props.selectUserActionItem}
                className={[style.actionMenu].join(' ')}
            >
                <Menu.Item key="1">Nuevo usuario</Menu.Item>
                <Menu.Item key="2">2nd item</Menu.Item>
                <Menu.Item key="3">3rd item</Menu.Item>
            </Menu>
        );

        return (
            <div className={[style.component].join(' ')}>
                <div className={[style.titleContainer].join(' ')}>
                    {this.props.data?.nombre}
                </div>
                <div className={[style.actionContainer].join(' ')}>
                    <Dropdown
                        overlay={menu}
                    >
                        <Button>
                            Acciones <DownOutlined />
                        </Button>
                    </Dropdown>
                </div>
                <Scrollable className={[style.recordScroller].join(' ')}>
                    <div className={[style.recordContainer].join(' ')}>
                        {/*<ReactJson src={this.props.data} />*/}
                    </div>
                </Scrollable>
                <Modal />
            </div>
        )
    }
}

const mapStateToProps = (state: ReduxState) => {
    return {
        data: state.userViewData
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<any>) => {
    return {
         selectUserActionItem: (data: any) => dispatch(selectUserActionItem(data)),
    };
}

const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component);

export default ConnectedComponent;


