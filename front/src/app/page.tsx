'use client';

import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import axios from 'axios';
import { useEffect, useState } from 'react';

async function getWeightLog() {
  return axios.get('http://localhost:3000/weight_logs')
              .then((response) => {
                console.log(response);
              })
              .catch((error) => {
                console.log(error);
              });
}

export default function Home() {
  useEffect(() => {
    getWeightLog();
  }, []);
  return (
    <Layout>
      <Content>
        <h1>Home</h1>
      </Content>
    </Layout>
  )
}
