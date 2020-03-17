import React from 'react';
import style from './index.module.scss'
import ulog from 'ulog'
import { connect } from 'react-redux';

import Redux from "redux";
import { setUserModalState, saveUser } from "../../../redux/actions";
import { ReduxState } from "../../../redux/reducers";

import { Modal, Button } from 'antd';
import { Form, Input, Password } from '../../../components/form';
import { DownOutlined } from '@ant-design/icons';
import Loader from "../../../components/loader";

let log = ulog('users/modal')

interface Props {
    visible: boolean
    setState: any
    save: any
};

interface State {
};

class Component extends React.Component<Props, State> {
    protected handleSubmit: any;
    constructor(props: Props) {
        log.log('Users:modal:constructor reached');
        super(props);
        this.handleOk = this.handleOk.bind(this);
    }

    async handleOk() {
        log.log('Users:modal:handleOk reached');
        const r = await this.handleSubmit();
        console.log(r);
        this.props.save(r);
    }

    render() {
        log.log('Users:modal:render reached');
        return (
            <Modal
                title="Registro de nuevo usuario"
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={() => {this.props.setState(false) }}
                width={400}
            >
                <div className={[style.formContainer].join(' ')}>
                    <Form setSubmit={(e:any) => { this.handleSubmit = e}} >
                        <Input
                            label="Nombre"
                            name="nombre"
                            rules={[{required: true, message: 'Ingrese su nombre'}]}
                        />
                        <Input
                            label="Usuario"
                            name="username"
                            rules={[{required: true, message: 'Ingrese su nombre de usuario'}]}
                        />
                        <Password
                            label="Contraseña"
                            name="password"
                            type="password"
                            rules={[{required: true, message: 'Ingrese su contraseña'}]}
                        />
                    </Form>
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = (state: ReduxState) => {
    return {
        visible: state.modalUsersState
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<any>) => {
    return {
        setState: (data: any) => dispatch(setUserModalState(data)),
        save: (data: any) => dispatch(saveUser(data))
        // selectMenuItem: (data: any) => dispatch(selectMenuItem(data)),
    };
}

const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component);

export default ConnectedComponent;


