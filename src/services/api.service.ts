import axios from 'axios';

const BASE_URL = import.meta.env.VITE_APP_URL || 'http://localhost:3000';
const CONSUMER_KEY = 'ck_40c9f3169536c820861c42ee720909ee5e5e8c82';
const CONSUMER_SECRET = 'cs_699cee7d6d2da769b733284b345413ba7b52e209'; 

export async function get(url: string) {
    const authHeader = {
        // o btoa é uma função do javascript que converte uma string para base64
        Authorization: `Basic ${btoa(`${CONSUMER_KEY}:${CONSUMER_SECRET}`)}`
    };
    return axios.get(BASE_URL + url, { headers: authHeader })
}