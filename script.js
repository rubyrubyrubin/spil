let points;
let randTal;
let antalLiv;
let speed;

// constant for id'er for elementernes container og sprite
// vegetable
const carrot_container = document.querySelector("#carrot_container");
const broccoli_container = document.querySelector("#broccoli_container");
const aubergine_container = document.querySelector("#aubergine_container");
// animal
const cow_container = document.querySelector("#cow_container");
const pig_container = document.querySelector("#pig_container");
const chicken_container = document.querySelector("#chicken_container");

window.addEventListener("load", sidenVises);

function sidenVises() {
  console.log("sidenVises");

  // lyt efter om browser window bliver storre/mindre
  window.addEventListener("resize", windowResize);
  windowResize();
  // kald windowResize 1ste gang siden vises

  // skjul andre skaerme
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#level_complete").classList.add("hide");
  // document.querySelector("#infoScreen").classList.add("hide");

  // vis start skaerm
  document.querySelector("#start_screen").classList.remove("hide");

  // klik paa start_knap til info screen
  document.querySelector("#start_knap").addEventListener("click", startGame);
}

// window.addEventListener("click", infoScreen);
// function infoScreen() {
//   console.log("infoScreen");
//   document.querySelector("#infoScreen").classList.remove("hide");

//   // klik paa start_knap
//   document.querySelector("#start_knap2").addEventListener("click", startGame);
// }

function windowResize() {
  console.log("windowResize");
  let widthScreen = document.querySelector("#screen").clientWidth;
  let myFontInProcent = 4;
  let myFont = (widthScreen / 100) * myFontInProcent;
  document.querySelector("#score").style.fontSize = myFont + "px";
  let myFontInProcent2 = 3;
  let myFont2 = (widthScreen / 100) * myFontInProcent2;
  document.querySelector("#level_complete").style.fontSize = myFont2 + "px";

  document.querySelector("#game_over").style.fontSize = myFont2 + "px";
  // document.querySelector("#start_screen").style.fontSize = myFont2 + "px";
}

function startGame() {
  console.log("startGame");

  // skjul andre skaerme
  // document.querySelector("#infoScreen").classList.add("hide");
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#level_complete").classList.add("hide");
  document.querySelector("#start_screen").classList.add("hide");

  // lyd
  document.querySelector("#groan").pause();
  document.querySelector("#ahh").pause();
  document.querySelector("#my_name").volume = 1;
  document.querySelector("#my_name").play();

  document.querySelector("#dubstep").volume = 0.2;
  document.querySelector("#dubstep").currentTime = 0;
  document.querySelector("#dubstep").play();

  const carrot = document.querySelector("#cow_container");
  const cow = document.querySelector("#cow_container");

  // nulstil point
  points = 0;
  document.querySelector("#score").textContent = points;

  // reset liv til 3
  antalLiv = 3;

  // vis antal liv
  document.querySelector("#life1").classList.remove("gray");
  document.querySelector("#life2").classList.remove("gray");
  document.querySelector("#life3").classList.remove("gray");

  // reset speed
  speed = 1;
  // start timer
  document.querySelector("#sand").classList.add("timer");
  document.querySelector("#sand").addEventListener("animationend", stopSpillet);

  //random position og delay til alle containere og fald
  randTal = Math.floor(Math.random() * 4) + 1;
  cow_container.classList.add("pos" + randTal);
  randTal = Math.floor(Math.random() * 4) + 1;
  cow_container.classList.add("delay" + randTal);
  cow_container.classList.add("fald");

  randTal = Math.floor(Math.random() * 4) + 1;
  carrot_container.classList.add("pos" + randTal);
  randTal = Math.floor(Math.random() * 4) + 1;
  carrot_container.classList.add("delay" + randTal);
  carrot_container.classList.add("fald");

  randTal = Math.floor(Math.random() * 4) + 1;
  broccoli_container.classList.add("pos" + randTal);
  randTal = Math.floor(Math.random() * 4) + 1;
  broccoli_container.classList.add("delay" + randTal);
  broccoli_container.classList.add("fald");

  randTal = Math.floor(Math.random() * 4) + 1;
  aubergine_container.classList.add("pos" + randTal);
  randTal = Math.floor(Math.random() * 4) + 1;
  aubergine_container.classList.add("delay" + randTal);
  aubergine_container.classList.add("fald");

  randTal = Math.floor(Math.random() * 4) + 1;
  pig_container.classList.add("pos" + randTal);
  randTal = Math.floor(Math.random() * 4) + 1;
  pig_container.classList.add("delay" + randTal);
  pig_container.classList.add("fald");

  randTal = Math.floor(Math.random() * 4) + 1;
  chicken_container.classList.add("pos" + randTal);
  randTal = Math.floor(Math.random() * 4) + 1;
  chicken_container.classList.add("delay" + randTal);
  chicken_container.classList.add("fald");

  // lyt efter fald animationer er done
  broccoli_container.addEventListener("animationiteration", bottomCarrot);
  aubergine_container.addEventListener("animationiteration", bottomCarrot);
  carrot_container.addEventListener("animationiteration", bottomCarrot);

  cow_container.addEventListener("animationiteration", bottomCow);
  pig_container.addEventListener("animationiteration", bottomCow);
  chicken_container.addEventListener("animationiteration", bottomCow);

  // lyt efter klik for alle elementer
  carrot_container.addEventListener("mousedown", clickVegetable);
  broccoli_container.addEventListener("mousedown", clickVegetable);
  aubergine_container.addEventListener("mousedown", clickVegetable);

  cow_container.addEventListener("mousedown", clickAnimal);
  pig_container.addEventListener("mousedown", clickAnimal);
  chicken_container.addEventListener("mousedown", clickAnimal);
}

// ********      VEGETABLE/CARROT     *********** //
function clickVegetable() {
  console.log("clickVegetable");
  // lyd
  document.querySelector("#veg").volume = 1;
  document.querySelector("#veg").currentTime = 0;
  document.querySelector("#veg").play();

  // ryd op, ikke klikke den samme flere gange
  this.removeEventListener("mousedown", clickVegetable);

  // stop fald animation
  this.classList.add("frys");

  // points
  points--;
  document.querySelector("#score").textContent = points;

  // points
  if (points >= 6) {
    speed = 3;
  } else if (points >= 3) {
    console.log("speed 2");
    speed = 2;
  }

  // start forsvind animationer for sprite element (firstElementChild er sprite elementet)
  this.firstElementChild.classList.add("drej");

  // lyt efter forsvind animationer er done
  this.addEventListener("animationend", genstartCarrot);
}

function genstartCarrot() {
  console.log("genstartCarrot");
  console.log(this);
  //ryd op, fjern alt fra container og sprite
  this.classList = "";
  // this er sprite, parent er container
  this.firstElementChild.classList = "";

  // genstarte fald animationen ved at fjerne og add den i samme funktion
  this.offsetLeft;

  // random position til container
  randTal = Math.floor(Math.random() * 4) + 1;
  this.classList.add("pos" + randTal);

  // start fald animation element
  this.classList.add("fald");

  // lyt efter klik element
  this.addEventListener("mousedown", clickVegetable);
}

function bottomCarrot() {
  console.log("bottomCarrot");

  this.removeEventListener("animationiteration", bottomCarrot);

  points++;
  document.querySelector("#score").textContent = points;

  this.classList = "";
  // this er sprite, parent er container
  this.firstElementChild.classList = "";

  // genstarte fald animationen ved at fjerne og add den i samme funktion
  this.offsetLeft;

  // random position til container
  randTal = Math.floor(Math.random() * 4) + 1;
  this.classList.add("pos" + randTal);

  // start fald animation element
  this.classList.add("fald");

  // lyt efter klik element
  this.addEventListener("mousedown", clickVegetable);
}

// ********      ANIMAL/COW     *********** //
function clickAnimal() {
  console.log("clickAnimal");
  // lyd
  document.querySelector("#phew").volume = 1;
  document.querySelector("#phew").currentTime = 0;
  document.querySelector("#phew").play();

  // ryd op, ikke klikke den samme flere gange
  this.removeEventListener("mousedown", clickAnimal);

  // stop fald animation
  this.classList.add("frys");

  // get points
  points++;
  document.querySelector("#score").textContent = points;

  // points
  if (points >= 6) {
    speed = 3;
  } else if (points >= 3) {
    console.log("speed 2");
    speed = 2;
  }

  // start forsvind animationer for sprite element (firstElementChild er sprite elementet)
  this.firstElementChild.classList.add("drej");

  // lyt efter forsvind animationer er done
  this.addEventListener("animationend", genstartCow);
}

function genstartCow() {
  console.log("genstartCow");
  console.log(this);
  //ryd op, fjern alt fra container og sprite
  this.classList = "";
  this.firstElementChild.classList = "";

  // genstarte fald animationen ved at fjerne og add den i samme funktion
  this.offsetLeft;

  // random position til container
  randTal = Math.floor(Math.random() * 4) + 1;
  this.classList.add("pos" + randTal);

  // start fald animation element
  this.classList.add("fald");

  // lyt efter klik element
  this.addEventListener("mousedown", clickAnimal);
}

function bottomCow() {
  console.log("bottomCow");
  // lyd
  document.querySelector("#ahh").volume = 1;
  document.querySelector("#ahh").currentTime = 0;
  document.querySelector("#ahh").play();

  this.removeEventListener("animationiteration", bottomCow);

  //miste life - Tilføj grå til det liv man er nået til, der efter tæl en ned på liv
  document.querySelector("#life" + antalLiv).classList.add("gray");
  antalLiv--;

  this.classList = "";
  // this er sprite, parent er container
  this.firstElementChild.classList = "";

  // genstarte fald animationen ved at fjerne og add den i samme funktion
  this.offsetLeft;

  // random position til container
  randTal = Math.floor(Math.random() * 4) + 1;
  this.classList.add("pos" + randTal);

  // start fald animation element
  this.classList.add("fald");

  // lyt efter klik element
  this.addEventListener("mousedown", clickAnimal);

  if (antalLiv <= 0) {
    console.log("ikke flere life");
    stopSpillet();
  }
}

// STOP SPILLET //
function stopSpillet() {
  console.log("stopSpillet");
  document.querySelector("#dubstep").pause();

  // end timer
  document.querySelector("#sand").classList.remove("timer");
  document.querySelector("#sand").removeEventListener("animationend", stopSpillet);

  //  fjern alle elementers container og sprite
  carrot_container.classList = "";
  carrot_sprite.classList = "";
  cow_container.classList = "";
  cow_sprite.classList = "";

  //  fjern alle event listener for alle containere
  carrot_container.removeEventListener("animationiteration", genstartCarrot);
  carrot_container.removeEventListener("animationend", genstartCarrot);
  carrot_container.removeEventListener("mousedown", clickVegetable);

  cow_container.removeEventListener("animationiteration", genstartCow);
  cow_container.removeEventListener("animationend", genstartCow);
  cow_container.removeEventListener("mousedown", clickAnimal);

  if (antalLiv <= 0) {
    gameover();
  } else if (points >= 3) {
    levelComplete();
  } else {
    gameover();
  }
}

function gameover() {
  console.log("GAME OVER");
  document.querySelector("#ahh").pause();
  document.querySelector("#groan").volume = 1;
  document.querySelector("#groan").play();

  // vis gameover screen
  document.querySelector("#game_over").classList.remove("hide");

  // udskriv points
  document.querySelector("#game_over_points").textContent = "" + points + "";

  // klick genstart1
  document.querySelector("#genstart1").addEventListener("click", sidenVises);

  //Klik på exit
  document.querySelector("#exit1").addEventListener("click", sidenVises);
}

function levelComplete() {
  console.log("levelComplete");
  document.querySelector("#groan").pause();
  document.querySelector("#ahh").pause();
  document.querySelector("#laugh").play();

  // vis levelComplete screen
  document.querySelector("#level_complete").classList.remove("hide");

  // udskriv points
  document.querySelector("#level_complete_points").textContent = " " + points + " ";

  //Klik på genstart2
  document.querySelector("#genstart2").addEventListener("click", sidenVises);

  //Klik på exit
  document.querySelector("#exit2").addEventListener("click", sidenVises);
}
