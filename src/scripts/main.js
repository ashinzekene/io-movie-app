'use strict';

const refreshButton = document.querySelector('#butRefresh');
const state = {};

state.pageNo = 1;

refreshButton.addEventListener('pointerup', reload);

function reload() {
  state.pageNo = 1;
  document.querySelector('.movies-container').innerHTML = '';
  showLoader();
  fetchMovies();
}

function getRating(rating) {
  let no = Number(rating.toFixed(0));
  return Array(no)
    .fill('')
    .reduce((prev, curr) => prev + '❤', '');
}

const renderMovie = movie =>
  `<div class="movie">
  <img src="./images/ekene.jpg" alt="${movie.title}" class="movie-img"></img>
  <div class="movie-container">
    <div class="movie-title">${movie.title}</div>
    <div class="movie-subtitle">${getRating(movie.vote_average)}</div>
  </div>
</div>`;

/**
 * Inserts HTML String into an element at a given selector
 * @param {String} sel Selector of HTMELement
 * @param {String} str HTMLString
 * @param {"beforebegin" | "afterbegin" | "beforeend" | "afterend"} pos position in dom to insert string
 */
function insertIntoDom(sel, str, pos = 'beforeend') {
  const elem = document.querySelector(sel);
  elem && elem.insertAdjacentHTML(pos, str);
}

const insertMovie = movie => insertIntoDom('.movies-container', movie);

function fetchMovies() {
  setTimeout(() => {
    testData.map(renderMovie).forEach(insertMovie);
    hideLoader();
  }, 1500);
}

fetchMovies();

function hideLoader() {
  document.querySelector('.loader').style.display = 'none';
}

function showLoader() {
  document.querySelector('.loader').style.display = 'initial';
}
