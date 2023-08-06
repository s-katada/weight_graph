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
      text: '体重グラフ',
    },
  },
};

async function getWeightLog() {
  const client = localStorage.getItem('client')
  const uid = localStorage.getItem('uid')
  const accessToken = localStorage.getItem('access-token')
  const headers = {
    'access-token': accessToken,
    client: client,
    uid: uid,
  }
  return axios
    .get(`${baseUrl}/weight_logs`, { headers })
    .then((response: AxiosResponse<WeightLog[]>) => {
      return response.data;
    })
    .catch((_error) => {
      return [] as WeightLog[];
    });
}

export default function Graph() {
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
  console.log(localStorage.getItem('client'))
  useEffect(() => {
    (async () => {
      setWeightLog(await getWeightLog());
    })();
  }, []);
  return (
    <Line options={options} data={data} />
  )
}
