import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;
const consumerKey = import.meta.env.VITE_CONSUMER_KEY;
const consumerSecret = import.meta.env.VITE_CONSUMER_SECRET; 

export async function get(endpoint: string, productParams?: any) {
    const authHeader = {
        // o btoa é uma função do javascript que converte uma string para base64
        Authorization: `Basic ${btoa(`${consumerKey}:${consumerSecret}`)}`
    };
    return axios.get(baseUrl + endpoint, { headers: authHeader, params: productParams })
}

export async function post(endpoint: string, data: any) {
    const authHeader = {
        Authorization: `Basic ${btoa(`${consumerKey}:${consumerSecret}`)}`
    };
    return axios.post(baseUrl + endpoint, data, { headers: authHeader })
}
