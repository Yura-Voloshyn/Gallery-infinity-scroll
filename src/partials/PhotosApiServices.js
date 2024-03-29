import axios from 'axios';
// import { data } from 'infinite-scroll';
const BASE_URL = 'https://pixabay.com/api/';

export default class PhotosApiServices {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  async fetchPhotos() {
    const options = {
      key: '28041992-97fcb2b6c34f200cd634916b7',
      q: '',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: this.page,
      per_page: 40,
    };

    const url = `${BASE_URL}?key=${options.key}&q=${this.searchQuery}&image_type=${options.image_type}&orientation=${options.orientation}&safesearch=${options.safesearch}&page=${this.page}&per_page=${options.per_page}`;

    return await axios
      .get(url, options)
      .then(resp => {
        this.page += 1;

        //   console.log(resp.data);
        return resp.data;
      })
      //   .then(r => {
      //     this.page += 1;
      //   })
      .catch(error => console.log(error));
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
