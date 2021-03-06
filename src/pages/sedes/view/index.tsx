import React from 'react';
import style from './index.module.scss'
import ulog from 'ulog'
import _ from 'lodash';

import Modal from '../modal';
import Slider from './slider';
import Nodes from './nodes';

import Scrollable from 'react-custom-scrollbars';

import {connect} from 'react-redux';
import Redux from "redux";
import {ReduxState } from "../../../redux/reducers";
import { selectUserActionItem } from "../../../redux/actions";

import { Button, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import ReactJson from "react-json-view";

const { Panel } = Collapse;
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
        console.log('DATA')
        let json = null;
        let nodes = null;
        if (this.props.data) {
            json  = <Slider data={this.props.data.nodos}/>
            nodes = <Nodes data={this.props.data.nodos}/>
        }


        return (
            <div className={[style.component].join(' ')}>
                <div className={[style.titleContainer].join(' ')}>
                    {this.props.data?.nombre}
                </div>
                <div className={[style.subtitleContainer].join(' ')}>
                    {this.props.data?.descripcion}
                </div>

                <Scrollable className={[style.recordScroller].join(' ')}>
                    <div className={[style.recordContainer].join(' ')}>
                        <Collapse bordered={false} defaultActiveKey={['1', '2']}>
                            <Panel header="Cuadro de mando" key="1">
                                {json}
                            </Panel>
                            <Panel header="Datos" key="2">
                                {nodes}
                            </Panel>
                        </Collapse>
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

    }
}

const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component);

export default ConnectedComponent;


