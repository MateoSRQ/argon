import React from 'react';
import Redux from 'redux';
import 'antd/dist/antd.css';
import style from './index.module.scss'
import ulog from 'ulog';

import Loader from '../../components/loader';

import { connect } from "react-redux";
import { ReduxState } from '../../redux/reducers';
//import { fetchSedes } from "../../redux/actions";
import { selectMenuItem } from "../../redux/actions";

import Login from '../login';
import Master from '../master';

const log = ulog('app');
ulog.level = ulog.INFO;
ulog.enable('');

interface Props {
    // from store
    sedes: any
    status: string
    current: string
    // dispatch
    //fetchSedes: any
    selectItem: any
};

interface State {
}

class Component extends React.Component<Props, State> {
    constructor(props: Props) {
        log.log('App:constructor reached');
        super(props);
    }

    componentDidMount(): void {
        log.log('App:componentDidMount reached');
        //this.props.fetchSedes();
        this.props.selectItem({key: '1'});
    }

    render() {
        log.log('App:render reached');
        let currentComponent = null;
        switch (this.props.current) {
            case 'users':
                currentComponent = <Master current={this.props.current}/>
                break;
            case 'sedes':
                currentComponent = <Master current={this.props.current}/>
                break;
            case 'login':
                currentComponent = <Login />
                break;
            default:
                currentComponent = <Master current={this.props.current}/>
                break;
        };

        return (
            <Loader status={this.props.status}>
                <div className={[style.component].join(' ')}>
                    {currentComponent}
                </div>
            </Loader>
        )
    }
}

const mapStateToProps = (state: ReduxState) => {
    return {
        current: state.appCurrentComponent,
        sedes: state.listSedes,
        status: state.appStatus
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<any>) => {
    return {
        //fetchSedes: (sedes: any) => dispatch(fetchSedes(sedes)),
        selectItem: (payload: any) => dispatch(selectMenuItem(payload))
    };
}

const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component);

export default ConnectedComponent;
