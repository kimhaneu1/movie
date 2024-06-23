const params = new URLSearchParams(window.location.search);
const movieId = params.get('id');

if (movieId) {
    fetch(`/movies/id?id=${movieId}`) // 서버에서 영화 정보를 가져오는 엔드포인트로 요청
        .then(response => response.json())
        .then(data => {
            console.log(data); // 가져온 데이터를 콘솔에 출력
            const movieDetailDiv = document.getElementById('movie-detail');
            movieDetailDiv.innerHTML = `
    <h2>${data.title}</h2>
    <p>${data.overview}</p>
    <p>평점: ${data.vote_average}</p>
    <p>개봉일: ${data.release_date}</p>
    <img src="http://image.tmdb.org/t/p/original${data.poster_path}" alt="${data.title} 포스터">
  `;
        })
        .catch(error => console.error('Error fetching movie detail:', error));
} else {
    console.error('Movie ID not found in query parameters.');
}