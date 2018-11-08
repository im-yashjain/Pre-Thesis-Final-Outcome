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

  canvas.position((windowWidth/2)-(width/2),(windowHeight/2)-(height/2));
  for(var i = 0; i<pokedex.pokemon.length;i++)
  {
    pokemons[i] = new pokemon(pokedex.pokemon[i],random(0,width),random(0,height));
  }
  background(255);

}

function draw()
{
  for(let i=0;i<pokemons.length;i++)
  {
    let pokemon1 = pokemons[i];
    for(let j=0;j<pokemons.length;j++)
    {
      var weak=0,same=0;
      let pokemon2 = pokemons[j];
      if(i!=j)
      {
        let dis = dist(pokemon1.posX,pokemon1.posY,pokemon2.posX,pokemon2.posY);
        if(dis<=(pokemon1.radius+pokemon2.radius))
        {
          var colour = map(dis,0,(pokemon1.radius+pokemon2.radius),255,0);
          var alpha = map(dis,0,(pokemon1.radius+pokemon2.radius),255,50);
          for(var k=0;k<pokemon2.type.length;k++)
          {
            for(var l=0;l<pokemon1.weakness.length;l++)
            {
              if(pokemon2.type[k]==pokemon1.weakness[l])
              {
                weak++;
              }
            }
          }
          for(var k=0;k<pokemon1.type.length;k++)
          {
            for(var l=0;l<pokemon2.weakness.length;l++)
            {
              if(pokemon1.type[k]==pokemon2.weakness[l])
              {
                weak++;
              }
            }
          }
          for(var k=0;k<pokemon1.type.length;k++)
          {
            for(var l=0;l<pokemon2.type.length;l++)
            {
              if(pokemon1.type[k]==pokemon2.type[l])
              {
                same++;
              }
            }
          }

          if(same>weak)
          {
            stroke(0,255,0,alpha);
          }
          else if(weak>same)
          {
            stroke(255,0,0,alpha);
          }
          else
          {
            stroke(255,207,60,alpha);
          }
          strokeWeight(.1);
          line(pokemon1.posX,pokemon1.posY,pokemon2.posX,pokemon2.posY);
        }
      }
    }
  }

  for(var i = 0; i<pokemons.length;i++)
  {
    pokemons[i].applybehaviours(pokemons);
  }
}
