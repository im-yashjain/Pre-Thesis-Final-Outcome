var canvas;
let pokedex;
let pokemons = [];

function preload()
{
  pokedex = loadJSON("https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json");
}


function setup()
{
  canvas = createCanvas(windowWidth-10,1070);
  // canvas = createCanvas(100,100);

  canvas.position((windowWidth/2)-(width/2),(windowHeight/2)-(height/2));
  for(var i = 0; i<pokedex.pokemon.length;i++)
  {
    pokemons[i] = new pokemon(pokedex.pokemon[i],random(0,width),random(0,height));
  }
  // pokemons[2].printParameters();
  // pokemons[2].show();
  background(255);

}

function draw()
{
  background(0);
  for(var i = 0; i<pokemons.length;i++)
  {
    pokemons[i].show();
    pokemons[i].applybehaviours(pokemons);
  }
}
