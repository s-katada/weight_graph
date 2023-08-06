'use client';

import { Button, ConfigProvider, DatePicker, Form, Input, Row, Spin } from 'antd';
import 'dayjs/locale/ja';
import locale from 'antd/locale/ja_JP';

import React from 'react';

interface Parameter {
  date: string;
  weight: number;
}

const initParameter = {
  date: '',
  weight: 0,
};

export default function Register() {
  const [loading, setLoading] = React.useState(false);
  const [parameters, setParameters] = React.useState<Parameter>(initParameter);
  console.log(parameters)
  return (
    <>
      <Spin spinning={loading} >
        <Row justify='center'>
          <h1>記録</h1>
        </Row>
        <Row justify='center'>
          <Form
            layout='vertical'
            onFinish={(value: Parameter) => {
              console.log(value);
            }}
          >
            <Form.Item
              label='日付'
              name='date'
            >
              <ConfigProvider locale={locale}>
                <DatePicker
                  format='YYYY-MM-DD'
                  onChange={value => {
                    if (null === value) {
                      return;
                    }
                    const date = value.toDate();
                    setParameters({
                      ...parameters,
                      date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
                    });
                  }}
                />
              </ConfigProvider>
            </Form.Item>
            <Form.Item
              label='体重'
              name='weight'
            >
              <Input
                type='number'
                onChange={event => {
                  const value = event.target.value;
                  setParameters({
                    ...parameters,
                    weight: Number(value),
                  });
                }}
              />
            </Form.Item>
            <Row justify='center'>
              <Form.Item>
                <Button
                  htmlType='submit'
                  type='primary'
                >
                  登録
                </Button>
              </Form.Item>
            </Row>
          </Form>
        </Row>
      </Spin>
    </>
  );
}
