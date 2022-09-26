import { stringify } from 'query-string'
import axios from 'axios';
interface RequestOptions {
  method: 'get' | 'post' | 'put'
  headers?: HeadersInit
  body?: BodyInit
}

// Todo: accomodate non-JSON requests
const request = async (url: string, options: RequestOptions) => {
  const ops: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  }

  if (options.body) {
    ops.body = JSON.stringify(options.body)
  }

  const response = await fetch(url, ops)
  const data: any = await response.json()

  return response.ok ? data : Promise.reject(data)
}

export const get = async (url: string, params?: any) => {
  const query = params ? `?${stringify(params)}` : ''
  return request(`${url}${query}`, { method: 'get' })
}