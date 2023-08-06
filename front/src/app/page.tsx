'use client';

import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { Row } from 'antd';

interface WeightLog {
  weight: number;
  date: string;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const baseUrl = 'http://localhost:3000';

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '',
    },
  },
};

async function getWeightLog(headers: {}, router: AppRouterInstance) {
  return axios
    .get(`${baseUrl}/weight_logs`, { headers })
    .then((response: AxiosResponse<WeightLog[]>) => {
      return response.data;
    })
    .catch((_error) => {
      console.log(_error);
      window.alert('ログインしてください');
      router.push('/signin');
      return [] as WeightLog[];
    });
}

export default function Graph() {
  const router = useRouter();
  const [weightLog, setWeightLog] = useState<WeightLog[]>([]);
  const labels = weightLog.map((log) => log.date);
  const data = {
    labels,
    datasets: [
      {
        label: '',
        data: weightLog.map((log) => log.weight),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  }
  useEffect(() => {
    (async () => {
      const client = Cookies.get('client');
      const uid = Cookies.get('uid');
      const accessToken = Cookies.get('access-token');
      const headers = {
        'access-token': accessToken,
        client: client,
        uid: uid,
      };
      setWeightLog(await getWeightLog(headers, router));
    })();
  }, []);
  return (
    <>
      <Row justify="center">
        <h1>体重グラフ</h1>
      </Row>
      <Line options={options} data={data} />
    </>
  )
}
