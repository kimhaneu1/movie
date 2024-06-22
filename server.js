const express = require('express');
const fetch = require('node-fetch');
const qs = require('qs');
require('dotenv').config();
const app = express();
const port = 3000;

const token = process.env.TOKEN;

const baseUrl = 'https://api.themoviedb.org/3';
const API_URL = `${baseUrl}/movie/popular?language=ko-KR&page=1&region=KR`;

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
    //console.log(data); // 데이터를 로그로 출력하여 확인
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// 영화 상세 정보를 가져오는 엔드포인트
app.get('/movies/:id', async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: 'Movie ID is required.' });
  }

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  };

  const movieUrl = `${baseUrl}/movie/${id}?append_to_response=%2Fmovies%2F%3Aid&language=ko-KR`;

  try {
    fetch(movieUrl, options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch movie data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});