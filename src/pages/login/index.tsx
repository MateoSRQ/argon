import React from 'react';
import Redux from 'redux';
import style from './index.module.scss'
import ulog from 'ulog';

import { Button } from 'antd';
import Loader from '../../components/loader';
import { Form, Input, Password } from '../../components/form';

import { connect } from "react-redux";
import 'antd/dist/antd.css';

import {  ReduxState } from '../../redux/reducers';
import {validatePassword, } from "../../redux/actions";

import Master from '../master';

const log = ulog('app');
ulog.level = ulog.INFO;
ulog.enable('');

interface Props {
    validatePassword: any,
    status: string | null
};

interface State {

};

class Component extends React.Component<Props, State> {

    protected handleSubmit: any;
    constructor(props: Props) {
        log.log('Login:constructor reached');
        super(props);
        this.clickSubmit = this.clickSubmit.bind(this);
        this.state = {
            loginStyle: null
        }
    }

    async clickSubmit() {
        log.log('Login:clickSubmit reached');
        let result = await this.handleSubmit();
        if (!result.errorFields) {
            this.props.validatePassword({
                username: result.username,
                password: result.password
            })
        }
    }
    //
    // componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
    //     if (prevProps.status !== this.props.status) {
    //         let self = this;
    //         if (this.props.status == 'fail') {
    //
    //         }
    //     }
    // }

    render() {
        log.log('Login:render reached');

        let loginStyle = null;
        if (this.props.status) {
            loginStyle = style.wobble;
        }

        return (
            <div className={[style.component].join(' ')}>
                <div className={[style.loginContainer, loginStyle].join(' ')}>
                    <Loader status='loaded'>
                        <img src="./images/logo.png" className={[style.logo].join(' ')}/>
                        <div className={[style.formContainer].join(' ')}>
                            <Form setSubmit={(e:any) => { this.handleSubmit = e}} >
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
                            <div className={[style.footer].join(' ')}>
                                <Button block onClick={this.clickSubmit}> Ingresar </Button>
                            </div>
                        </div>
                    </Loader>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: ReduxState) => {
    return {
        status: state.loginStatus
        // current: state.appCurrentComponent,
        // sedes: state.listSedes,
        // status: state.appStatus
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<any>) => {
    return {
        validatePassword: (data: any) => dispatch(validatePassword(data)),
    };
}

const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component);

export default ConnectedComponent;
