const api_conv = "https://api.rss2json.com/v1/api.json?rss_url=";

let array = [];

async function fetchRssDetails(feed) {
    //debugger
  let arr;
  try {
    await fetch(api_conv + feed)
      .then((res) => res.json())
      .then((data) => {
        arr = data;
      })
      .catch((err) => {
        return null;
      });
  } catch (err) {
    return null;
  }
  return arr;
}
async function fetchData() {
  //debugger
  for (let i = 0; i < magazines.length; i++) {
    let x = await fetchRssDetails(magazines[i]);
    array.push(x);
  }
}
function addToDOM(array){
  for(let j=0; j<array.length; j++){
    let cardheader = document.createElement('DIV')
    cardheader.setAttribute("class", "card")
    cardheader.innerHTML = `
      <div class="card-header" id="headingOne">
        <h5 class="mb-0">
        
          <button id="indexchange" class="btn btn-light fa fa-chevron-up" style="font-family: "Montserrat";
           " data-toggle="collapse" data-target="#${j}" aria-expanded="false" aria-controls="collapseOne">
          
            ${array[j].feed.title}
           
          </button>
          
        </h5>
      </div>
  
      <div id="${j}" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
        <div class="card-body">
          <div id="myCarousel${j}" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner" id="carouselinner${j}">
            </div>
            
          </div>
          <div class=mx-2>
          <a class="carousel-control-next " href="#myCarousel${j}" data-slide="next" style="background color: white">
          <span class="carousel-control-next-icon">
          <i class="fa fa-angle-right fa-2x"></i>
          </span>    
          
        </a>
          </div>
          
        </div>
      </div>
     
`
    document.getElementById("accordion").append(cardheader)

    if(j !== 0){
      document.getElementById("indexchange").setAttribute("class", "btn btn-light collapsed fa fa-chevron-up")
      document.getElementById(j).setAttribute("class", "collapse")
      document.getElementById("indexchange").setAttribute("aria-expanded", "true")
    }

    for(let i=0; i<array[0].items.length;i++){
      let carouselitemactiveappend = document.createElement('DIV')
      if(i != 0){
        carouselitemactiveappend.setAttribute("class","carousel-item")
      }else{
        carouselitemactiveappend.setAttribute("class","carousel-item active")
      }
      carouselitemactiveappend.innerHTML = `<div class="card">
                                              <a href="${array[j].items[i].link}" style="color:black;text-decoration:none;">
                                              <img class="card-img-top" src="${array[j].items[i].enclosure.link}" alt="">
                                              <div class="card-body" style="">
                                                <h3 class="card-title mt-2">${array[j].items[i].title}</h3>
                                                <p style="color=grey">${array[j].items[i].author} • ${new Date(array[0].items[0].pubDate).toLocaleDateString()}</p>
                                                <p class="card-text">${array[j].items[i].description}</p>
                                              </div>
                                              </a>
                                            </div>`
      document.getElementById("carouselinner"+j).appendChild(carouselitemactiveappend)
    }
  }
  

}
$(".rotate").click(function(){
  $(this).toggleClass("down")  ; 
})
async function init() {
    await fetchData();
    addToDOM(array);
    //addAll();
  }
  
 
