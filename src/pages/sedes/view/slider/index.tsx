import React from 'react';
import style from './index.module.scss'
import ulog from 'ulog'


import {connect} from 'react-redux';
import Redux from "redux";

import { Tabs, Radio } from 'antd';
import { Table, Tag } from 'antd';

import ReactJson from "react-json-view";
import _ from "lodash";

import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const { TabPane } = Tabs;
let log = ulog('sedes/nodes/view')

interface Props {
    [x: string]: any
};

interface State {

};

const data = [
    {
        name: 'VISUAL', Atendidos: 25, "En cola": 56, Abandono:21,
    },
    {
        name: 'RECEPCIÓN', Atendidos: 231, "En cola": 312, Abandono: 0,
    },
    {
        name: 'EKG', Atendidos: 32, "En cola": 323, Abandono: 21,
    },
    {
        name: 'CONSULTORIO', Atendidos: 23, "En cola": 322, Abandono: 15,
    },
    {
        name: 'PSICOLOGIA', Atendidos: 34, "En cola": 57, Abandono: 21,
    },
    {
        name: 'CAJA', Atendidos: 65, "En cola": 123, Abandono: 12,
    },
    {
        name: 'RESULTADOS', Atendidos: 94, "En cola": 54, Abandono: 32,
    },
    {
        name: 'LABORATORIO', Atendidos: 43, "En cola": 63, Abandono: 2,
    },
    {
        name: 'AUDIOMETRIA', Atendidos: 63, "En cola": 45, Abandono: 3,
    },
    {
        name: 'RADIOLOGIA', Atendidos: 56, "En cola": 76, Abandono: 3,
    },
    {
        name: 'ODONTOLOGIA', Atendidos: 36, "En cola": 32, Abandono: 3,
    },
    {
        name: 'SALA MULTIPLE', Atendidos: 77, "En cola": 76, Abandono: 4,
    },
    {
        name: 'TELEMEDICINA', Atendidos: 67, "En cola": 56, Abandono: 5,
    },
    {
        name: 'CARDIOLOGIA', Atendidos: 73, "En cola": 31, Abandono: 1,
    },
];

class Component extends React.Component<Props, State> {
    constructor(props: Props) {
        log.log('Sedes:nodes:constructor reached');
        super(props);
        console.log('COMPONENT')
        console.log(props);
    }

    render() {
        log.log('Sedes:nodes:view:render reached');
        let tabs: any = [];

        Object.keys(this.props.data).map((key: any) => {
            console.log(key);
            let x  = _.groupBy(this.props.data[key], (item: any) => { return item.estado } )
            console.log(x)



        });
        let {...props} = this.props;
        return (
            <div className={[style.component].join(' ')} {...props}>
                <Tabs defaultActiveKey="1" tabPosition="top">
                    <TabPane tab={"Global"} key={"1"}>
                        <div className={[style.slide].join(' ')}>
                            <BarChart
                                width={2000}
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
                                <Bar dataKey="Atendidos" fill="#8884d8" />
                                <Bar dataKey="En cola" fill="#82ca9d" />
                                <Bar dataKey="Abandono" fill="#67a9cf" />
                            </BarChart>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}


export default Component;


