'use client';

import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

interface WeightLog {
  weight: number;
  date: string;
}

async function getWeightLog() {
  return axios
    .get('http://localhost:3000/weight_logs')
    .then((response: AxiosResponse<WeightLog[]>) => {
      return response.data;
    })
    .catch((_error) => {
      return [] as WeightLog[];
    });
}

export default function Home() {
  const [weightLog, setWeightLog] = useState<WeightLog[]>([]);
  console.log(weightLog);
  useEffect(() => {
    (async () => {
      setWeightLog(await getWeightLog());
    })();
  }, []);
  return (
    <Layout>
      <Content>
        <h1>Home</h1>
      </Content>
    </Layout>
  )
}
