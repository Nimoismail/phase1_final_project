const hide=document.querySelector(".hide")
hide.style.display="none"

const hideCard=document.querySelector(".hideCard")
hideCard.style.display="block"
const card=document.querySelector(".card")

const btn=document.querySelector("#btn")
const button = document.createElement('a');
    button.className = 'btn btn-outline-dark';
    button.textContent = 'Login';
    card.appendChild(button)

button.addEventListener("click",() =>{
      document.body.style.backgroundImage="none"
     
      if(hide.style.display==="none"){
            hide.style.display="block"
            
      }
      if(hideCard.style.display==="block"){
            hideCard.style.display="none"
      }
})

class PhotoGallery{
    constructor(){
      this.API_KEY = 'YOUR_API_KEY';
      this.galleryDIv = document.querySelector('.gallery');
      this.searchForm = document.querySelector('.header form');
      this.loadMore = document.querySelector('.load-more');
      this.logo = document.querySelector('.logo')
      this.pageIndex = 1;
      this.searchValueGlobal = '';
      this.eventHandle();
    }
    eventHandle(){
      document.addEventListener('DOMContentLoaded',()=>{
        this.getImg(1);
      });
      this.searchForm.addEventListener('submit', (e)=>{
        this.pageIndex = 1;
        this.getSearchedImages(e);
      });
      this.loadMore.addEventListener('click', (e)=>{
        this.loadMoreImages(e);
      })
      this.logo.addEventListener('click',()=>{
        this.pageIndex = 1;
        this.galleryDIv.innerHTML = '';
        this.getImg(this.pageIndex);
      })
    }
    async getImg(index){
      this.loadMore.setAttribute('data-img', 'curated');
      const baseURL = `https://api.pexels.com/v1/curated?page=${index}&per_page=12`;
      const data = await this.fetchImages(baseURL);
      this.GenerateHTML(data.photos)
      console.log(data)
    }
    async fetchImages(baseURL){
      const response = await fetch(baseURL, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization:"563492ad6f9170000100000121ab1be868124a05a7a954079d21e81f"
        }
      });
      const data = await response.json();
      // console.log(data);
      return data;
    }
    GenerateHTML(photos){
      photos.forEach(photo=>{
        const item= document.createElement('div');
        item.classList.add('item');
        item.innerHTML = `
        <a href='${photo.src.original}' target="_blank">
          <img src="${photo.src.medium}">
          <h3>${photo.photographer}</h3>
        </a>
        `;
        this.galleryDIv.appendChild(item)
      })
    }
    async getSearchedImages(e){
      this.loadMore.setAttribute('data-img', 'search');
      e.preventDefault();
      this.galleryDIv.innerHTML='';
      const searchValue = e.target.querySelector('input').value;
      this.searchValueGlobal = searchValue;
      const baseURL = `https://api.pexels.com/v1/search?query=${searchValue}&page=1&per_page=12`
      const data = await this.fetchImages(baseURL);
      this.GenerateHTML(data.photos);
      e.target.reset();
    }
    async getMoreSearchedImages(index){
      // console.log(searchValue)
      const baseURL = `https://api.pexels.com/v1/search?query=${this.searchValueGlobal}&page=${index}&per_page=12`
      const data = await this.fetchImages(baseURL);
      console.log(data)
      this.GenerateHTML(data.photos);
    }
    loadMoreImages(e){
      let index = ++this.pageIndex;
      const loadMoreData = e.target.getAttribute('data-img');
      if(loadMoreData === 'curated'){
        // load next page for curated]
        this.getImg(index)
      }else{
        // load next page for search
        this.getMoreSearchedImages(index);
      }
    }
  }
  
  const gallery = new PhotoGallery;