import React from 'react';
import style from './index.module.scss'
import ulog from 'ulog'

import { Carousel, Radio } from 'antd';

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
        let {children, ...props} = this.props;
        return (
            <Carousel className={[style.component].join(' ')} {...props}>
                {children}
            </Carousel>
        )
    }
}


export default Component;


