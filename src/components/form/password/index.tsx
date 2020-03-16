import React from 'react';
import style from './index.module.scss'
import ulog from 'ulog';
import { Form, Input } from 'antd';

const log = ulog('form.item');

interface Props {
    name: string
    [x: string]: any
}

export default function Component(props: Props) {
    let {label, name, rules, ...itemprops} = props;
    return (
        <div className={[style.component].join(' ')}>
            <Form.Item
                label={label}
                name={name}
                rules={rules}
            >
                <Input.Password {...itemprops} />
            </Form.Item>
        </div>
    )
}




