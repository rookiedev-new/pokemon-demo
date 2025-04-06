const poketext = document.querySelector(".textdata");
const formstart = document.querySelector(".linkform");
const Card = document.querySelector(".datacard");

formstart.addEventListener("submit", async (event) => {
  event.preventDefault();
  const pokedata = poketext.value;

  if (pokedata) {
    try {
      let response = await datatransfer(pokedata);
      display(response);
    } catch (error) {
      displayerror(error);
    }
  } else {
    displayerror("please enter pokmeon");
  }
});
async function datatransfer(pokmeon) {
  const API = `https://pokeapi.co/api/v2/pokemon/${pokmeon}`;
  const response = await fetch(API);
  if (!response.ok) {
    throw new Error("Could not find pokemon");
  }
  return await response.json();
}


 function display(detail){
const  {name,
sprites: {other: {['official-artwork']: { front_default: image }}},
types,
abilities}=detail;

const typeList = types.map(t => t.type.name);
  const abilityList = abilities.map(a => a.ability.name);


const pokemonname=document.createElement("p");
const pokemonimg=document.createElement("img");
const pokemontype=document.createElement("p");
const pokemoeskill=document.createElement("p");

Card.textContent = "";
Card.style.display = "flex";
pokemonname.textContent=name;
pokemonname.classList.add("pokename");
pokemonimg.src=image;
pokemonimg.alt="name";
pokemonimg.classList.add("image");
pokemontype.textContent=` abilities: ${abilityList.toString()}`;
pokemontype.classList.add("poketype");;

pokemoeskill.textContent=`Type: ${typeList.toString()}`;
pokemoeskill.classList.add("pokeability");


Card.appendChild(pokemonname);
Card.appendChild(pokemonimg);
Card.appendChild(pokemontype);
Card.appendChild(pokemoeskill);

}

function displayerror(msg) {
  const message = document.createElement("p");
  message.textContent = msg;
  message.classList.add("errordisplay");
  Card.textContent = "";
  Card.style.display = "flex";
  Card.appendChild(message);
}
