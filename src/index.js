import { Notify } from 'notiflix';
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '28041992-97fcb2b6c34f200cd634916b7';

const refs = {
  gallery: document.querySelector('.gallery'),
  form: document.querySelector('.search-form'),
  input: document.querySelector('input[name-searchQuery]'),
  btn: document.querySelector('.submit-btn'),
};
console.log(refs.input);
// const r = `${BASE_URL}?key=${API_KEY}&q=cat&image_type=photo&orientation=horizontal&safesearch=true`;
// console.log(r);

function fetchPhotos(name) {
  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`
  )
    .then(resp => {
      return resp.json();
    })
    .catch(error => console.log(error));
}

refs.form.addEventListener('submit', onBtnSubmit);

function onBtnSubmit(e) {
  e.preventDefault();
  //   console.log(e);
  //   console.log('search');
  const itemsToSearch = e.currentTarget.elements.searchQuery.value;
  console.log(itemsToSearch);
  if (!itemsToSearch) {
    refs.gallery.innerHTML = '';
    return;
  }
  fetchPhotos(itemsToSearch).then(data => {
    console.log(data);
    const markup = data.hits.map(item => itemMarkup(item)).join('');
    refs.gallery.insertAdjacentHTML('beforeend', markup);
  });
}
// refs.gallery.addEventListener('beforeend', markup)
function renderItem(data) {
  refs.gallery.innerHTML = '';
  refs.gallery.innerHTML = itemMarkup(data);

  //   const markup = countryMarkup(country[0]);
  //   refs.countryInfo.innerHTML = markup;
}

function itemMarkup({
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
        <div class="photo-card">
  <img src="${largeImageURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
    ${likes}
      <b>Likes</b>
    </p>
    <p class="info-item">
    ${views}
      <b>Views</b>
    </p>
    <p class="info-item">
    ${comments}
      <b>Comments</b>
    </p>
    <p class="info-item">
    ${downloads}
      <b>Downloads</b>
    </p>
  </div>
</div>
      `;
}
