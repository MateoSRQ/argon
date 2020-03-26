import React from 'react';
import style from './index.module.scss'
import ulog from 'ulog'


import {connect} from 'react-redux';
import Redux from "redux";

import { Tabs, Radio } from 'antd';
import { Table, Tag } from 'antd';

import ReactJson from "react-json-view";
import _ from "lodash";

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
            tabs.push(
                <TabPane tab={key} key={key}>
                    <Table
                        columns={columns}
                        dataSource={this.props.data[key]}
                        pagination={false}
                        size="small"
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


