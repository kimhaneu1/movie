const params = new URLSearchParams(window.location.search);
const movieId = params.get('id');

if (movieId) {
    fetch(`/movies/id?id=${movieId}`) // 서버에서 영화 정보를 가져오는 엔드포인트로 요청
        .then(response => response.json())
        .then(data => {
            console.log(data); // 가져온 데이터를 콘솔에 출력
            const movieDetailDiv = document.getElementById('movie-detail');
            movieDetailDiv.innerHTML = `
    
    <div class="container my-5">
        <div class="p-5 text-center bg-body-tertiary rounded-3">
            <h1 class="text-body-emphasis">${data.title}</h1>
            <p class="col-lg-8 mx-auto fs-5 text-muted">
            ${data.overview}
            </p>
            <p>평점: ${Math.floor(data.vote_average * 10) / 10}</p>
            <p>개봉일: ${data.release_date}</p>
            <img class="img-fluid mb-5" src="http://image.tmdb.org/t/p/original${data.poster_path}" alt="${data.title} 포스터">
            <div class="d-inline-flex gap-2 mb-5">
            <button class="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill" type="button">
                예고편 보러가기
            </button>
            <button class="btn btn-outline-secondary btn-lg px-4 rounded-pill" type="button">
                예매하기
            </button>
            </div>
        </div>
    </div>
  `;
        })
        .catch(error => console.error('Error fetching movie detail:', error));
} else {
    console.error('Movie ID not found in query parameters.');
}

// const params = new URLSearchParams(window.location.search);
// const movieId = params.get('id');

// if (movieId) {
//     fetch(`/movies/id?id=${movieId}`) // 서버에서 영화 정보를 가져오는 엔드포인트로 요청
//         .then(response => response.json())
//         .then(data => {
//             console.log(data); // 가져온 데이터를 콘솔에 출력
//             const movieDetailDiv = document.getElementById('movie-detail');
//             movieDetailDiv.innerHTML = `
//     <h2>${data.title}</h2>
//     <p>${data.overview}</p>
//     <p>평점: ${data.vote_average}</p>
//     <p>개봉일: ${data.release_date}</p>
//     <img src="http://image.tmdb.org/t/p/original${data.poster_path}" alt="${data.title} 포스터">
//   `;
//         })
//         .catch(error => console.error('Error fetching movie detail:', error));
// } else {
//     console.error('Movie ID not found in query parameters.');
// }