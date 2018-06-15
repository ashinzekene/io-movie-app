'use strict';

const state = {
  movies: [],
  page: 1
};

if (location.href.search('index.html') > -1 || location.href.search(/src\/$/) > -1) {
  fetchMovies();
} else if (location.href.search(/movie.html#\d+/) > -1) {
  const movie = localStorage.getItem('currentMovie');
  localStorage.removeItem('currentMovie');
  if (movie) {
    renderSingleMovie(JSON.parse(movie));
  }
  const movieId = location.hash.substr(1);
  // fetch(`https://movie-ease.herokuapp.com/api/movies/one/${movieId}`)
  //   .then(res => res.json())
  //   .then(console.log);
}
window.addEventListener('online', e => console.log('App is now online', e));
window.addEventListener('offline', e => console.log('App is now offline', e));
document.addEventListener('pointerup', e => {
  const tar = e.target;
  if (tar.matches('#butRefresh')) {
    state.page = 1;
    reload(e);
  } else if (tar.matches('.movie, .movie > *')) {
    console.log('kjsdkjdfjkjjk');
    const movieDetails = state.movies[tar.dataset.id];
    localStorage.setItem('currentMovie', JSON.stringify(movieDetails));
    open(`movie.html#${tar.dataset.movieId}`, '_self');
  } else if (tar.matches('#load-more-button')) {
    state.page++;
    (async () => {
      tar.textContent = 'Loading...';
      await fetchMovies();
      tar.textContent = 'Load More';
    })();
  }
});

const renderMovie = ({ id, poster_path, title, vote_average }, i) =>
  `<div data-id='${i}' data-movie-id='${id}' class='movie'>
    <img height='auto' data-id='${i}' data-movie-id='${id}' src='https://image.tmdb.org/t/p/w500${poster_path}'
      alt='${title}' class='movie-img'></img>
    <div class='movie-container'>
      <div class='movie-title'>${title}</div>
      <div class='movie-subtitle'>
        <span class='rating'>Ratings:</span>
        ${getRating(vote_average)}
        </div>
    </div>
  </div>`;

/**
 * Inserts HTML String into an element at a given selector
 * @param {String} sel Selector of HTMELement
 * @param {String} str HTMLString
 * @param {'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend'} pos position in dom to insert string
 */
function insertIntoDom(sel, str, pos = 'beforeend') {
  const elem = document.querySelector(sel);
  elem && elem.insertAdjacentHTML(pos, str);
}

const insertMovie = movie => insertIntoDom('.movies-container', movie);

async function fetchMovies() {
  hide('#load-more-button');
  try {
    const res = await fetch('https://movie-ease.herokuapp.com/api/movies/latest/' + state.page).then(res => res.json());
    JSON.parse(res)
      .results.map(movie => {
        state.movies.push(movie);
        return movie;
      })
      .map(renderMovie)
      .forEach(insertMovie);
    show('#load-more-button');
  } catch (err) {
    console.log(err);
    const error = `
    <div style='text-align: center; padding: 40px 0px;'>
      A network error occurred, Are you online?
    </div>
    `;
    insertIntoDom('.movies-container', error);
  }
  hide('.loader');
}

function renderSingleMovie(movie) {
  const q = document.querySelector.bind(document);
  q('h1.header__title').textContent = movie.title;
  q('.movie-image').style.backgroundImage = movie.poster_path;
  q('.movie-image').textContent = movie.release_date;
  q('.movie-details').textContent = movie.overview;
  // movie.vote_average
}

function hide(selector) {
  document.querySelector(selector) ? (document.querySelector(selector).style.display = 'none') : null;
}

function show(selector) {
  document.querySelector(selector) ? (document.querySelector(selector).style.display = 'initial') : null;
}

function routePage() {
  if (!location.hash) {
    console.log('Going home');
  } else {
    console.log(location.hash.replace('#/movie/', ''));
  }
}

function changeHash(elem) {
  const id = elem.dataset.id;
  const movieId = elem.dataset.movieId;
  history.pushState({}, id, `#movie/${movieId}`);
}

function reload() {
  state.pageNo = 1;
  document.querySelector('.movies-container').innerHTML = '';
  show('.loader');
  fetchMovies();
}

function getRating(rating) {
  let no = Number((rating / 2).toFixed(0));
  return Array(no)
    .fill('')
    .reduce((prev, curr) => prev + '❤', '');
}

/**
 *
 * SERVICE WORKER REGISTRATION
 *
 */

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', e => {
//     const reg = window.navigator.serviceWorker.register('/sws.js');
//     console.log('service worker registered');
//   });
// } else {
//   console.log('No service worker here');
// }
