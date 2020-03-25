import React from 'react';
import style from './index.module.scss'
import ulog from 'ulog'
import { connect } from 'react-redux';

import Redux from "redux";
import { setSedesModalState, saveSede } from "../../../redux/actions";
import { ReduxState } from "../../../redux/reducers";

import { Modal, Button } from 'antd';
import { ConfigProvider } from 'antd';
import esEs from 'antd/es/locale/es_ES';
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
        log.log('Sedes:modal:constructor reached');
        super(props);
        this.handleOk = this.handleOk.bind(this);
    }

    async handleOk() {
        log.log('Sedes:modal:handleOk reached');
        const r = await this.handleSubmit();
        this.props.save(r);
    }

    render() {
        log.log('Sedes:modal:render reached');
        return (
            <ConfigProvider locale={esEs}>
                <Modal
                    title="Nueva sede"
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
                                label="Código"
                                name="codigo"
                                rules={[{required: true, message: 'Ingrese su código'}]}
                            />
                            <Input
                                label="Descripción"
                                name="descripcion"
                                rules={[{required: true, message: 'Ingrese su descripción'}]}
                            />
                        </Form>
                    </div>
                </Modal>
            </ConfigProvider>
        )
    }
}

const mapStateToProps = (state: ReduxState) => {
    return {
        visible: state.modalSedesState
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<any>) => {
    return {
        setState: (data: any) => dispatch(setSedesModalState(data)),
        save: (data: any) => dispatch(saveSede(data))
        // selectMenuItem: (data: any) => dispatch(selectMenuItem(data)),
    };
}

const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component);

export default ConnectedComponent;


