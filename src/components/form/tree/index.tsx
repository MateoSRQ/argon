import React from 'react';
import style from './index.module.scss'
import ulog from 'ulog';
import { Form } from 'antd';
import { TreeSelect } from 'antd';

const log = ulog('form.item');

interface Props {
    name: string
    [x: string]: any
}

export default function Component(props: Props) {
    let {label, name, rules, data, children, ...itemprops} = props;
    return (
        <Form.Item
            label={label}
            name={name}
            rules={rules}
        >
            <TreeSelect
                {...itemprops}

            />
        </Form.Item>
    )
}




