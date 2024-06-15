const express = require('express');
const qs = require('qs');
require('dotenv').config();
const app = express();
const port = 3000;
const baseUrl = 'https://api.themoviedb.org/3';
const API_URL = `${baseUrl}/movie/popular?language=ko-KR&page=1&region=KR`;


const token = process.env.TOKEN;

app.use(express.static("public"));
app.use(express.json());
app.disable("x-powered-by");

app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  next();
});

app.get('/movies', async (req, res) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  };

  try {
    const response = await fetch(API_URL, options);
    const data = await response.json();
    console.log(data); // 데이터를 로그로 출력하여 확인
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});