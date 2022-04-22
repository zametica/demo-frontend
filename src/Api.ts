import axios from 'axios';

const Api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'content-type': 'application/json',
    'accpet': 'application/json',
  }
});

export const getAvailableSlots = (date: string, duration: number) => 
  Api.get(`/slots?date=${date}&duration=${duration}`);

export const bookSlot = (start_time: Date, end_time: Date) =>
  Api.post('/slots', { start_time, end_time });