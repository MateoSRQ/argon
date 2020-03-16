import React from 'react';
import style from './index.module.scss'
import ulog from 'ulog';

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const log = ulog('loader');
const antIcon = <LoadingOutlined style={{ fontSize: 64 }} spin />;

interface Props {
    status: string
    [x: string]: any
}

interface State {
    status: string
}

export default class Component extends React.Component<Props> {
    constructor(props: Props) {
        log.log('Loader:constructor reached');
        super(props);
        this.state = {
            status: this.props.status
        };
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{}>, snapshot?: any): void {
        log.log('Loader:componentDidUpdate reached');
        if (this.props.status !== prevProps.status) {
            this.setState({status: this.props.status});
        }
    }

    render() {
        log.log('Loader:render reached');
        let {children, status, ...props} = this.props;
        let loaderClass: (string |null) =  'loading';
        switch (status) {
            case 'loading':
                loaderClass = null;
                break;
            case 'loaded':
                loaderClass = style.loaded;
                break;
        };

        return (
            <div className={[style.component].join(' ')} {...props}>
                <div className={[style.content].join(' ')}>
                    {children}
                </div>
                <div className={[style.loader, loaderClass].join(' ')} {...props}>
                    <Spin indicator={antIcon} delay={500} />
                </div>
            </div>

        )
    }
}



