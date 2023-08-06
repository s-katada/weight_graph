'use client';

import { Button, Col, Form, Input, Row, Space, Spin } from 'antd';
import axios from 'axios';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Parameter {
  email: string;
  password: string;
}

const baseUrl = 'http://localhost:3000';

function authentication(parameter: Parameter, setLoading: React.Dispatch<React.SetStateAction<boolean>>, router: AppRouterInstance) {
  const email = parameter.email;
  const password = parameter.password;
  const requestData = {
    email: email,
    password: password,
  };

  axios.post(baseUrl + '/auth/sign_in', requestData)
    .then((response) => {
      localStorage.setItem('access-token', response.headers['access-token']);
      localStorage.setItem('client', response.headers['client']);
      localStorage.setItem('uid', response.headers['uid']);
      alert('ログインしました!');
      setLoading(false);
      router.push('/');
    })
    .catch((error) => {
      alert(error);
      setLoading(false);
    });
};

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <>
      <Spin spinning={loading} tip='ログイン中...' size='large'>
        <Row justify="center">
          <Col>
            <Space direction="vertical">
              <h1>Sign In</h1>
            </Space>
          </Col>
        </Row>
        <Row justify="center">
          <Form
            layout='vertical'
            onFinish={(e: Parameter) => {
              setLoading(true);
              authentication(e, setLoading, router);
            }}>
            <Form.Item
              label="Email"
              name={'email'}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name={'password'}
            >
              <Input />
            </Form.Item>
            <Row justify="center">
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Sign In
                </Button>
              </Form.Item>
            </Row>
          </Form>
        </Row>
      </Spin>
    </>
  );
}


