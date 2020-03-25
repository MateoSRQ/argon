import React from 'react';
import style from './index.module.scss'
import ulog from 'ulog'
import {connect} from 'react-redux';

import Scrollable from 'react-custom-scrollbars';

import Menu from '../../components/menu';
import Loader from '../../components/loader';

import UserList from '../users/list';
import UserView from '../users/view';
import SedesList from '../sedes/list';
import SedesView from '../sedes/view';

import Redux from "redux";
import { validatePassword, selectMenuItem } from "../../redux/actions";
import { ReduxState } from "../../redux/reducers";

let log = ulog('master')

interface Props {
    selectMenuItem: any
    current: string,
    listStatus: string,
    viewStatus: string
};
interface State {
};

class Component extends React.Component<Props, State> {
    constructor(props: Props) {
        log.log('Master:constructor reached');
        super(props);
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
        log.log('Master:componentDidUpdate reached');
        if (this.props !== prevProps) {

        }
    }


    render() {
        log.log('Master:render reached');
        let items = [
            {
                type: 'submenu',
                key: 'sub1',
                title: 'Mantenimiento',
                children: [
                    {
                        type: 'itemgroup',
                        key: 'g1',
                        title: 'Item 1',
                        children: [
                            {type: 'item', key: 1, title: 'Usuarios'},
                            {type: 'item', key: 2, title: 'Sedes'}
                        ]
                    },
                    {
                        type: 'itemgroup',
                        key: 'g2',
                        title: 'Item 2',
                        children: [
                            {type: 'item', key: 3, title: 'Option 3'},
                            {type: 'item', key: 4, title: 'Option 4'}
                        ]
                    }
                ]
            },
            {
                type: 'submenu',
                key: 'sub2',
                title: 'Navigation 2',
                children: [
                    {
                        type: 'itemgroup',
                        key: 'g3',
                        title: 'Item 3',
                        children: [
                            {type: 'item', key: 5, title: 'Option 5'},
                            {type: 'item', key: 6, title: 'Option 6'}
                        ]
                    },
                    {
                        type: 'itemgroup',
                        key: 'g4',
                        title: 'Item 4',
                        children: [
                            {type: 'item', key: 7, title: 'Option 7'},
                            {type: 'item', key: 8, title: 'Option 8'}
                        ]
                    }
                ]
            }
        ];
        let leftContent = null;
        let rightContent = null;
        switch (this.props.current) {
            case 'users':
                leftContent = <UserList />
                rightContent = <UserView />
                break;
            case 'sedes':
                leftContent = <SedesList />
                rightContent = <SedesView />
                break;
        };

        return (
            <div className={[style.component, style.fadeIn].join(' ')}>
                <div className={[style.zero].join(' ')}></div>
                <div className={[style.one].join(' ')}>
                    <div className={[style.container].join(' ')}>
                        <div className={[style.id].join(' ')}>
                            <div className={[style.container].join(' ')}>
                                ID
                            </div>
                        </div>
                        <div className={[style.menuContainer].join(' ')}>
                            <Scrollable
                                // autoHeight={true}
                                hideTracksWhenNotNeeded={true}
                            >
                                <div className={[style.menuScroller].join(' ')}>
                                    <Menu
                                        items={items}
                                        onSelect={this.props.selectMenuItem}
                                    />
                                </div>
                            </Scrollable>
                        </div>

                    </div>
                </div>
                <div className={[style.two].join(' ')}>
                    <div className={[style.container].join(' ')}>
                        <div className={[style.container].join(' ')}>
                            <Loader status={this.props.listStatus}>
                                {leftContent}
                            </Loader>
                        </div>
                    </div>
                </div>
                <div className={[style.three].join(' ')}>
                    <div className={[style.container].join(' ')}>
                        <Loader status={this.props.viewStatus}>
                            <div className={[style.container].join(' ')}>
                                {rightContent}
                            </div>
                        </Loader>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: ReduxState) => {
    return {
        listStatus: state.listStatus,
        viewStatus: state.viewStatus
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<any>) => {
    return {
        selectMenuItem: (data: any) => dispatch(selectMenuItem(data)),
    };
}

const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component);

export default ConnectedComponent;


