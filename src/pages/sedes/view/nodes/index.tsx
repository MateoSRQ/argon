import React from 'react';
import style from './index.module.scss'
import ulog from 'ulog'


import {connect} from 'react-redux';
import Redux from "redux";

import faker from 'faker';

import { Tabs, Radio } from 'antd';
import { Table, Tag } from 'antd';

import ReactJson from "react-json-view";
import _ from "lodash";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const { TabPane } = Tabs;
let log = ulog('sedes/nodes/view')

interface Props {
    [x: string]: any
};

interface State {

};

const columns = [
    {
        title: 'Código',
        dataIndex: 'codigo',
        key: 'codigo',
        width: 250,
        sorter: (a:any, b:any) => { return a.codigo.localeCompare(b.codigo)},
    },
    {
        title: 'Estado',
        dataIndex: 'estado',
        key: 'estado',
        width: 150,
        sorter: (a:any, b:any) => { return a.estado.localeCompare(b.estado)},
    },
    {
        title: 'Usuario',
        dataIndex: 'usuario',
        key: 'usuario',
        width: 150,
        sorter: (a:any, b:any) => { return a.usuario.localeCompare(b.usuario)},
    },
    {
        title: 'Paciente',
        dataIndex: 'paciente',
        key: 'paciente',
        width: 150,
        sorter: (a:any, b:any) => { return a.paciente.localeCompare(b.paciente)},
    },
    {
        title: 'Atendidos',
        dataIndex: 'atendidos',
        key: 'atendidos',
        width: 100,
        sorter: (a:any, b:any) => { return a.atendidos.localeCompare(b.atendidos)},
    },
    {
        title: 'Esperando',
        dataIndex: 'esperando',
        key: 'esperando',
        width: 100,
        sorter: (a:any, b:any) => { return a.esperando.localeCompare(b.esperando)},
    },
    {
        title: 'Abandono',
        dataIndex: 'abandono',
        key: 'abandono',
        sorter: (a:any, b:any) => { return a.codigo.localeCompare(b.codigo)},
        width: 100
    },
    {
        title: 'Inicio',
        dataIndex: 'inicio',
        key: 'inicio',
        sorter: (a:any, b:any) => { return a.codigo.localeCompare(b.codigo)},
        //width: 100
    }
]



const data = [
    { name: '08:00', 'Atendidos': 0, 'En cola': 63, 'Abandonados': 0 },
    { name: '08:30', 'Atendidos': 5, 'En cola': 58, 'Abandonados': 2 },
    { name: '09:00', 'Atendidos': 7, 'En cola': 51, 'Abandonados': 2 },
    { name: '09:30', 'Atendidos': 7, 'En cola': 48, 'Abandonados': 3 },
    { name: '10:00', 'Atendidos': 9, 'En cola': 41, 'Abandonados': 3 },
    { name: '10:30', 'Atendidos': 5, 'En cola': 32, 'Abandonados': 3 },
    { name: '11:00', 'Atendidos': 8, 'En cola': 26, 'Abandonados': 4 },
    { name: '11:30', 'Atendidos': 10, 'En cola': 14, 'Abandonados': 5 },
    { name: '12:00', 'Atendidos': 8, 'En cola': 9, 'Abandonados': 7 },
    { name: '12:30', 'Atendidos': 5, 'En cola': 7, 'Abandonados': 9 },
    { name: '13:00', 'Atendidos': 8, 'En cola': 2, 'Abandonados': 10 },
    { name: '13:30', 'Atendidos': 4, 'En cola': 1, 'Abandonados': 12 },
    { name: '14:00', 'Atendidos': 3, 'En cola': 0, 'Abandonados': 14 },
];

class Component extends React.Component<Props, State> {
    constructor(props: Props) {
        log.log('Sedes:nodes:constructor reached');
        super(props);
    }

    render() {
        log.log('Sedes:nodes:view:render reached');
        let tabs: any = [];

        Object.keys(this.props.data).map((key: any) => {
            console.log(key);
            let x  = _.groupBy(this.props.data[key], (item: any) => { return item.estado } )
            console.log(x)
            let title = key + ' : ' +
                faker.random.number({min: 10, max: 30}) + 'A / ' +
                faker.random.number({min: 20, max: 50}) + 'E / ' +
                faker.random.number({min: 5, max: 15})  + 'X'
            tabs.push(
                <TabPane tab={title} key={key}>
                    <div style={{ overflowX: 'scroll', overflowY: 'hidden'}}>
                        <LineChart
                            width={1000}
                            height={100}
                            data={data}
                            margin={{
                                top: 5, right: 5, left: 5, bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                               <Tooltip />
                            <Line type="monotone" dataKey="Atendidos" stroke="#8884d8" activeDot={{ r: 8 }} />
                            {/*<Line type="monotone" dataKey="En cola" stroke="#82ca9d" />*/}
                            <Line type="monotone" dataKey="Abandonados" stroke="#91cf60" />
                        </LineChart>
                    </div>
                    <div className={[style.subtitle].join(' ')}>
                        DATA
                    </div>
                    <Table
                        columns={columns}
                        dataSource={this.props.data[key]}
                        pagination={false}
                        size="middle"
                        scroll={{x: 1100}}
                    />
                </TabPane>
            )

        });
        let {...props} = this.props;
        return (
            <div className={[style.component].join(' ')} {...props}>
                <Tabs defaultActiveKey="1" tabPosition="top">
                    {tabs}
                </Tabs>
            </div>
        )
    }
}


export default Component;


