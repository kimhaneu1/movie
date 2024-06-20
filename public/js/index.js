let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");
  let captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}

const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/original';


function moviePoster() {
    fetch('/movies')
    .then(response => response.json()) // 응답을 JSON으로 파싱
    .then(json => {
        const ul = document.querySelector('#posters');
        ul.innerHTML = '';
        if (json.results && Array.isArray(json.results)) { // 'results'로 수정
            for (let i = 0; i < 6; i++) {
                 ul.innerHTML += `
                <div class="mySlides">
                <div class="numbertext">1 / 6</div>
                  <img src="${IMAGE_BASE_URL}${json.results[i].poster_path}" style="width:250px">
               </div>`
            
                ul.innerHTML += `<img src="${IMAGE_BASE_URL}${json.results[i].poster_path}" width="250px">`;
            }
        } else {
            ul.innerHTML = `<li>No movies found</li>`;
        }
        console.log(json);
    })
    .catch(error => console.error('Error fetching movies:', error));
}

// moviePoster()