const form = document.getElementById('form')
const input = document.getElementById('input')
const main = document.getElementById('main')
const output = document.getElementById('output')
const sidebar = document.getElementById('sidebar')
//=====KEYS
// AIzaSyDlQ8XSyh1XGlLrc-pAVhLK1bYz-n6r69I
// AIzaSyBKUxdckpCIi9UI7OVOBCPu1-DmFf4nzsk
// AIzaSyBoTMtAHDAz17LPZK_rYBMZRJ-W_bGcG4s

const RESULTS = 20;
const KEY = '&key=AIzaSyBxZB0ajL4nqlvjeOWalZq_m4dgwlhUaUA'
const API = 'https://www.googleapis.com/youtube/v3/search?&part=snippet&maxResults='+ RESULTS + '&type=video' + KEY +'&q='

const getVideos = async (videoName = '', render) => {
    const request = await fetch(API + videoName)
    const response = await request.json()
    renderVideos(response.items, 'output')
}

const renderVideos = (videos = [], render) => {
    if (render == 'output') {
        output.innerHTML = '';
        sidebar.style.display = 'none'
output.style.flex = ' 0 1 95%'

    }
  
    videos.map(item => {
        const card = document.createElement('div')
        const tittle = document.createElement('h2')
        const img = document.createElement('img')

        card.className = 'card'
        tittle.className = 'title'


        tittle.textContent = item.snippet.title.length > 30 
        ? item.snippet.title.substring(0, 30) + '...' 
        : item.snippet.title;

    img.src=item.snippet.thumbnails.medium.url
        card.append(img,tittle)
            output.append(card)
       
        
        card.addEventListener('click', ()=> renderDetail(item.id.videoId, videos))
  
})
}



const renderDetail = async (id, videos) =>{
    sidebar.style.display = 'block'
output.style.flex = ' 0 1 65%'

    sidebar.innerHTML = ''
    output.innerHTML = `
    <iframe width="950" height="534" src="https://www.youtube.com/embed/${id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `;

    videos.map(item => {
        const card = document.createElement('div')
        const tittle = document.createElement('h2')
        const img = document.createElement('img')

        card.className = 'card'
        tittle.className = 'title'


        tittle.textContent = item.snippet.title.length > 30 
        ? item.snippet.title.substring(0, 30) + '...' 
        : item.snippet.title;

    img.src=item.snippet.thumbnails.medium.url
        card.append(img,tittle)
            sidebar.append(card)
       
        
        card.addEventListener('click', ()=> renderDetail(item.id.videoId, videos))
  
})

}




form.addEventListener('submit', (event)=>{
    event.preventDefault();
getVideos(input.value, 'output')
})
getVideos()



