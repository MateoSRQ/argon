import React from 'react';
import style from './index.module.scss'
import ulog from 'ulog'
import {connect} from 'react-redux';

import Redux from "redux";
// import {validatePassword, selectMenuItem} from "../../redux/actions";
import {ReduxState} from "../../../redux/reducers";
import {Input, Button, Menu, Dropdown} from 'antd';
import { DownOutlined } from '@ant-design/icons';

import ReactJson from 'react-json-view';
import {fetchSede, selectSedeActionItem} from "../../../redux/actions";

const { Search } = Input;
let log = ulog('sedes/list')

interface Props {
    listData: any
    selectItem: any
    selectSedeMenu: any
};

interface State {
};

class Component extends React.Component<Props, State> {
    constructor(props: Props) {
        log.log('Sedes:list:constructor reached');
        super(props);
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick(e: string) {
        log.log('Sedes:list:handleItemClick reached');
        this.props.selectItem(e);
    }

    render() {
        log.log('Sedes:list:render reached');

        let menu = (
            <Menu
                onClick={this.props.selectSedeMenu}
                className={[style.actionMenu].join(' ')}
            >
                <Menu.Item key="1">Nueva sede</Menu.Item>
                <Menu.Item key="2">2nd item</Menu.Item>
                <Menu.Item key="3">3rd item</Menu.Item>
            </Menu>
        );


        let list = null;
        console.log('LIST')
        console.log(this.props.listData);

        list = this.props.listData.map((item: any) => {
            return (
                <div
                    key={item._id}
                    className={[style.item].join(' ')}
                    onClick={ () => { this.handleItemClick(item._id) } }
                >
                    {item.nombre}
                </div>
            );
        });

        return (
            <div className={[style.component].join(' ')}>
                <div className={[style.title].join(' ')}>
                    SEDES
                </div>
                <Search
                    placeholder="Búsqueda"
                    onSearch={value => console.log(value)}
                />
                <div className={[style.buttonContainer].join(' ')}>
                    <Dropdown
                        overlay={menu}
                    >
                        <Button block>
                            Acciones <DownOutlined />
                        </Button>
                    </Dropdown>
                </div>
                <div className={[style.list].join(' ')}>
                    {list}
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state: ReduxState) => {
    return {
         listData: state.listSedes,
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<any>) => {
    return {
        selectItem: (data: any) => dispatch(fetchSede(data)),
        selectSedeMenu: (data: any) => dispatch(selectSedeActionItem(data)),
    };
}

const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component);

export default ConnectedComponent;


