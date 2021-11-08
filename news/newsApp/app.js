// Custom Http Module
function customHttp() {
return {
    get(url, cb) {
      try {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.addEventListener('load', () => {
          if (Math.floor(xhr.status / 100) !== 2) {
            cb(`Error. Status code: ${xhr.status}`, xhr);
            return;
          }
          const response = JSON.parse(xhr.responseText);
          cb(null, response);
        });

        xhr.addEventListener('error', () => {
          cb(`Error. Status code: ${xhr.status}`, xhr);
        });

        xhr.send();
      } catch (error) {
        cb(error);
      }
    },
    post(url, body, headers, cb) {
      try {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.addEventListener('load', () => {
          if (Math.floor(xhr.status / 100) !== 2) {
            cb(`Error. Status code: ${xhr.status}`, xhr);
            return;
          }
          const response = JSON.parse(xhr.responseText);
          cb(null, response);
        });

        xhr.addEventListener('error', () => {
          cb(`Error. Status code: ${xhr.status}`, xhr);
        });

        if (headers) {
          Object.entries(headers).forEach(([key, value]) => {
            xhr.setRequestHeader(key, value);
          });
        }

        xhr.send(JSON.stringify(body));
      } catch (error) {
        cb(error);
      }
    },
  };
}
// Init http module
const http = customHttp();
const newsService = (function(){
  const apiKey = '5471cd3868e34869be8880262f160fde',
        apiUrl = 'https://newsapi.org/v2'

  return {
    topHeadLines(country, category, cb){
      http.get(`${apiUrl}/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`, cb)
    },
    everything(query, cb){
      http.get(`${apiUrl}/everything?q=${query}&apiKey=${apiKey}`, cb)
    }
  }
})();

const form = document.forms['newsControls'],
  countrySelect = form.elements['country'],
  serchInput = form.elements['search'],
  choiceSources = form.elements['sources']


form.addEventListener('submit', e=>{
  e.preventDefault()
  loadNews()
})

//  init selects
document.addEventListener('DOMContentLoaded', function() {
  M.AutoInit();
  loadNews()
});


// load news function 
function loadNews(){
  showLoader();
  if(!serchInput.value) newsService.topHeadLines(countrySelect.value, choiceSources.value, onGetResponce)
  else newsService.everything(serchInput.value, onGetResponce)
}

function onGetResponce(err, res){
  removeLoader()
  serchInput.value = ''
  if(err) {
    showAlert(err, 'error-msg') 
    return
  }
  if(!res.articles.length){
    showAlert('News not found' , 'warning-msg')
    return
  } 
  renderNews(res.articles)
}

function renderNews(news){
  const newsContainer = document.querySelector('.news-container .row')
  if(newsContainer) clearContainer(newsContainer)
  // newsContainer.textContent = ''
  let fragment = ''
  news.forEach(newsItem=>{
    fragment += newsTemplate(newsItem)
  })
  newsContainer.insertAdjacentHTML('afterbegin', fragment)
}


function newsTemplate({urlToImage, description, title, url}){
  return `
    <div class="col s12">
      <div class="card">
        <div class="card-image">
          <img src="${urlToImage || 'https://cs9.pikabu.ru/post_img/2017/08/10/1/1502321888125750453.jpg'}">
          <span class="card-title">${title || ''}</span>
        </div>
        <div class='card-content'>
          <p>${description || ''}</p>
        </div>
        <div class="card-action">
          <a href="${url}">Read more</a>
        </div>
      </div>
    </div>
  `
}

function showAlert(msg, type = 'success'){
  M.toast({html: msg, classes: type})
}

function clearContainer(container){
  let child = container.lastElementChild
  while(child){
    container.removeChild(child)
    child = container.lastElementChild
  }
}

function showLoader(){
  document.body.insertAdjacentHTML('afterbegin',`
    <div class="progress">
      <div class="indeterminate"></div>
    </div>
    `
  )
}

function removeLoader(){
  const loader = document.querySelector('.progress')
  if(loader) loader.remove()
}
