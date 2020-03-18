import React from 'react';
import style from './index.module.scss'
import ulog from 'ulog'
import {connect} from 'react-redux';

import Redux from "redux";
// import {validatePassword, selectMenuItem} from "../../redux/actions";
import {ReduxState} from "../../../redux/reducers";
import { Input } from 'antd';

import ReactJson from 'react-json-view';
import {fetchUser} from "../../../redux/actions";

const { Search } = Input;
let log = ulog('users/list')

interface Props {
    listData: any
    selectItem: any
};

interface State {
};

class Component extends React.Component<Props, State> {
    constructor(props: Props) {
        log.log('Users:list:constructor reached');
        super(props);
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick(e: string) {
        log.log('Users:list:handleItemClick reached');
        console.log(e);
        this.props.selectItem(e);
    }

    render() {
        log.log('Users:list:render reached');

        let list = null;
        list = this.props.listData.map((item: any) => {
            return (
                <div
                    key={item._id}
                    className={[style.item].join(' ')}
                    onClick={ () => { this.handleItemClick(item._id) } }
                >
                    {item.username}
                </div>
            );
        });

        return (
            <div className={[style.component].join(' ')}>
                <Search
                    placeholder="Búsqueda"
                    onSearch={value => console.log(value)}
                />
                <div className={[style.list].join(' ')}>
                    {list}
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state: ReduxState) => {
    return {
         listData: state.listUsers,
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<any>) => {
    return {
        selectItem: (data: any) => dispatch(fetchUser(data)),
    };
}

const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component);

export default ConnectedComponent;


