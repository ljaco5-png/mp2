import axios from 'axios';
import type { Bean, BeanResponse } from './types';

const BASE_URL = 'https://jellybellywikiapi.onrender.com/api';

export async function fetchAllBeans(): Promise<Bean[]> {
  const res = await axios.get<BeanResponse>(`${BASE_URL}/Beans`, {
    params: { pageSize: 114 },
  });
  return res.data.items;
}