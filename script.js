var articles=[];


let currentArticleIndex = 0;
const articlesPerPage =10;



async function fetchNews() {

const API_ENDPOINT =`https://newsapi.org/v2/everything?q=tesla&from=2023-06-26&sortBy=publishedAt&apiKey=${API_KEY}`;
try {
const response = await fetch(API_ENDPOINT);

const data= await response.json();
articles = data.articles;

return articles;



 
} catch (e){
console.error(e);
return [];
}


}


function updateNewsDisplay(news_articles){

const mainElement= document.querySelector('main');

mainElement.innerHTML = '';




const currentArticles=news_articles.slice(currentArticleIndex,currentArticleIndex + articlesPerPage);





currentArticles.forEach( article   =>{ 
const articleElement= document.createElement("div");
articleElement.classList.add("article");

const titleElement=document.createElement('h2');
titleElement.textContent=article.title;

const imageElement = document.createElement("img");
imageElement.src=article.urlToImage;
imageElement.alt=article.title;

const descriptionElement= document.createElement("p");
descriptionElement.textContent=article.description;

const linkElement=document.createElement("a");
linkElement.href=article.url;
linkElement.textContent = "Read more";
linkElement.classList.add("read-more");




articleElement.appendChild(titleElement);
mainElement.appendChild(articleElement);
articleElement.appendChild(imageElement);
articleElement.appendChild(descriptionElement);
articleElement.appendChild(linkElement);
mainElement.appendChild(articleElement);


});
updatePagination(articles.length);

}
function updatePagination(totalArticles){
const totalPages = Math.ceil(totalArticles/articlesPerPage);

const paginationElement=socument.querySelector('.pagination');
paginationElement.innerHTML='';

for (let i=1;i<totalPages;i++)
{
const pageButton=document.createElement("button");
pageButton.textContent=i;
pageButton.addEventListener("click",()=> {
    currentArticleIndex=(i-1)*articlesPerPage;
    updateNewsDisplay(articles);


}  );

paginationElement.appendChild(pageButton);

}

const allButtons=document.querySelectorAll(".pagination button");
allButtons.forEach(button => allButtons.classList.remove("active"));
allButtons[currentArticleIndex/articlesPerPage].classList.add("active");

const prevButton=document.querySelector('.prev-button');
const nextButton=document.querySelector('.next-button');



}




async function loadNews()
{
const articlesData = await fetchNews();

updateNewsDisplay(articlesData);

updatePagination(articlesData.length)


}

document.addEventListener("DOMContentLoaded",loadNews);