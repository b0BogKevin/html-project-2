
let startButton = document.querySelector("#start");
startButton.addEventListener("click", ()=>
{
   startButton.style.display = "none"; 
   start()
   burst()
})
  
  function start() {
   points = 0;
   let ki = "";
   let cards = [];
   let randCards = [];
   for (let i = 0; i < 10; i++) {
    //  cards.push(`
    //  <div id="item" data-value="${i}" data-locked="0" onclick="change(this);"></div>`);

   cards.push( `<div id="item" data-value="${i}" data-locked="0" onclick="change(this);">
  <div id="belso">
    <div id="kulso">
    </div>
    <div id="hatoldal">
    <img src="../images/${i}.png" style="height:100% ;width:100%;border-radius:10px;">
    </div>
  </div>
</div>`);

cards.push(`<div id="item"  data-value="${i}" data-locked="0" onclick="change(this);">
  <div id="belso">
    <div id="kulso">
    </div>
    <div id="hatoldal">
    <img src="../images/${i}.png" style="height:100% ;width:100%;border-radius:10px;">
    </div>
  </div>
</div>`);
   // cards.push(`
   // <div id="item" data-value="${i}" data-locked="0" onclick="change(this);"></div>`);
   }
   for (let i = 20; i > 0; i--) {
      var rand = Math.floor(Math.random() * i);
      randCards.push(cards[rand]);
      cards.splice(rand,1);
   }

   ki += '<grid id="grid">'
   for (let i = 0; i < 20; i++) {
      ki+=randCards[i];
   }

   ki+= '</grid>'
   document.getElementById('content').innerHTML = ki;
}

let flipped = []
let points = 0;

function change(obj) {
   let card = obj.querySelector('#belso')
if (obj.dataset.locked == 0 &&flipped.length<2) {

   card.classList.toggle("isflipped")
   obj.dataset.locked = 1
   flipped.push(obj);
   
   if (flipped.length == 2) {
      setTimeout(() => {
      if (flipped[0].dataset.value == flipped[1].dataset.value) {
         flipped[0].style.opacity = 0;
         flipped[1].style.opacity = 0;


      points+=1;
      if (points==10) {
         document.getElementById("content").innerHTML = "<h1 class='win' id='win'>NYERT</h1>"
         playConfetti()


         setTimeout(() => {
            clearCanvas();
            start()
         }, 5000);
      }
      }
      else{

         flipped[0].querySelector('#belso').classList.toggle("isflipped")
         flipped[1].querySelector('#belso').classList.toggle("isflipped")

         flipped[0].dataset.locked = 0
         flipped[1].dataset.locked = 0
      }
      flipped.splice(0,2);
      }, 500);
      
   }
}  
}


