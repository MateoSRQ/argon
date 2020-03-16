import React from 'react';
import style from './index.module.scss'
import ulog from 'ulog'
import {connect} from 'react-redux';

import Redux from "redux";
// import {validatePassword, selectMenuItem} from "../../redux/actions";
import {ReduxState} from "../../../redux/reducers";
import { Input } from 'antd';
const { Search } = Input;

let log = ulog('users/list')

interface Props {
};

interface State {
};

class Component extends React.Component<Props, State> {
    constructor(props: Props) {
        log.log('Users:list:constructor reached');
        super(props);
    }

    render() {
        log.log('Users:list:render reached');
        return (
            <div className={[style.component].join(' ')}>
                <Search
                    placeholder="input search text"
                    onSearch={value => console.log(value)}
                />
            </div>
        )
    }
}

const mapStateToProps = (state: ReduxState) => {
    return {
        // current: state.appCurrentComponent,
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<any>) => {
    return {
        // selectMenuItem: (data: any) => dispatch(selectMenuItem(data)),
    };
}

const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component);

export default ConnectedComponent;


