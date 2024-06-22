const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/original';

function goToMovieDetail(movieId) {
  window.location.href = `moviedetail.html?id=${movieId}`; // moviedetail.html로 이동하면서 movieId를 쿼리 파라미터로 전달
}

function moviePoster() {
  fetch('/movies')
    .then(response => response.json()) // 응답을 JSON으로 파싱
    .then(json => {
      const div = document.querySelector('.poster-group');
      div.innerHTML = '';
      if (json.results && Array.isArray(json.results)) {
        for (let i = 0; i < 4 && i < json.results.length; i++) {
          div.innerHTML += `
                <div class="poster" onclick="goToMovieDetail(${json.results[i].id})">
                  <img src="${IMAGE_BASE_URL}${json.results[i].poster_path}" class="poster-img-top" alt="...">
                  <div class="poster-body">
                    <h5 class="poster-title">${json.results[i].title}</h5>
                  </div>
                </div>`
        }
      } else {
        div.innerHTML = `<div>No movies found</div>`;
      }
      console.log(json);
    })
    .catch(error => console.error('Error fetching movies:', error));
}

moviePoster()

