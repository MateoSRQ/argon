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

import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import ReactJson from "react-json-view";

let log = ulog('users/view')

interface Props {
    selectUserActionItem: any,
    data: any
};

interface State {

};

const data = [
    {
        name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    },
    {
        name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    },
    {
        name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
    },
    {
        name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
    },
    {
        name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
    },
    {
        name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
    },
    {
        name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
    },
];

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
            json  = <ReactJson src={this.props.data} collapsed={true}/>
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
                        <Slider style={{height: '450px'}}>
                            <div style={{width: '100%', height: '100%', backgroundColor: '#ff0000'}}>
                                {json}
                            </div>
                            <div style={{width: '100%', height: '100%', backgroundColor: '#00ff00'}}>
                                <BarChart
                                    width={1000}
                                    height={300}
                                    data={data}
                                    margin={{
                                        top: 5, right: 30, left: 20, bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="pv" fill="#8884d8" />
                                    <Bar dataKey="uv" fill="#82ca9d" />
                                </BarChart>
                            </div>
                        </Slider>
                        {nodes}
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


