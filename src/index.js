import PhotosApiServices from './partials/PhotosApiServices';

import { Notify } from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '28041992-97fcb2b6c34f200cd634916b7';

const photosApiServices = new PhotosApiServices();

const refs = {
  gallery: document.querySelector('.gallery'),
  form: document.querySelector('.search-form'),
  input: document.querySelector('input[name-searchQuery]'),
  btn: document.querySelector('.submit-btn'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onBtnSubmit);

function onBtnSubmit(e) {
  e.preventDefault();

  clearGallety();
  photosApiServices.query = e.currentTarget.elements.searchQuery.value;

  photosApiServices.resetPage();
  if (data.hits === 0) {
    return Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  if (photosApiServices.query === '' || photosApiServices.query === ' ') {
    return Notify.warning('input field cannot be empty.');
  }

  photosApiServices.fetchPhotos().then(data => {
    const markup = data.hits.map(item => itemMarkup(item)).join('');
    renderItem(markup);
    Notify.success(`Hooray! We found ${data.totalHits} images.`);
    refs.loadMoreBtn.classList.remove('is-hiden');
  });
}

refs.loadMoreBtn.addEventListener('click', loadMore);

function loadMore(e) {
  e.preventDefault();
  //   console.log('click');
  photosApiServices.fetchPhotos().then(data => {
    const markup = data.hits.map(item => itemMarkup(item)).join('');
    renderItem(markup);
  });
}

function photoApiFetch() {}
// refs.gallery.addEventListener('beforeend', markup)
function renderItem(markup) {
  {
    refs.gallery.insertAdjacentHTML('beforeend', markup);
    const lightbox = new SimpleLightbox('.gallery a', {
      captionDelay: 250,
      captionsData: 'alt',
    });
    lightbox.refresh();
    refs.gallery.addEventListener('click', lightbox);
  }
}
// largeImageURL
// webformatURL;
function itemMarkup({
  largeImageURL,
  webformatURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
        <div class="photo-card">
  <a class="card-link" href="${largeImageURL}"><img class="card-image" src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</div>
      `;
}
function clearGallety() {
  refs.gallery.innerHTML = '';
}
