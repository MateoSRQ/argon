import React from 'react';
import style from './index.module.scss'
import ulog from 'ulog'


import {connect} from 'react-redux';
import Redux from "redux";

import { Tabs, Radio } from 'antd';

import ReactJson from "react-json-view";
import _ from "lodash";

const { TabPane } = Tabs;
let log = ulog('sedes/nodes/view')

interface Props {
    [x: string]: any
};

interface State {

};

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
                    WAKA
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


