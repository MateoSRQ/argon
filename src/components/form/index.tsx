import React from 'react';
import style from './index.module.scss'
import ulog from 'ulog';
import { Form, Input, Button, Radio, Select } from 'antd';

import FormInput from './input';
import FormPassword from './password';
import FormSelect from './select';
import FormTree from './tree';

const { Option } = Select;

const log = ulog('form');

interface Props {
    setSubmit: any
    children: any
}
function Component(props: Props) {
    const [form] = Form.useForm();

    const handleForm = async () => {
        log.log('Form:handleForm reached');
        try {
            let result = await form.validateFields();
            return result;
            //
        } catch (e) {
            return e;
        }
    }

    props.setSubmit(handleForm);

    return (
        <div className={[style.component].join(' ')}>
                <Form
                    layout='vertical'
                    form={form}
                >
                    {props.children}
                </Form>
            </div>
    )
}

export {
    Component as Form,
    FormInput as Input,
    FormSelect as Select,
    Option,
    FormTree as Tree,
    FormPassword as Password
}



