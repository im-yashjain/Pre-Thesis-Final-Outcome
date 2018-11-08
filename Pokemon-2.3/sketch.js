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
  // background(255);
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
          // print("same:",same,"weak:",weak);

          if(same>weak)
          {
            stroke(63,254,63,alpha);
            // print("green");
          }
          else if(weak>same)
          {
            stroke(255,64,64,alpha);
            // print("red");
          }
          else
          {
            stroke(125,85,253,alpha);
            // print("blue");
          }
          noFill();
          strokeWeight(.1);
          let intersectionPoints = intersectCircles(pokemon1.posX, pokemon1.posY, pokemon1.radius, pokemon2.posX, pokemon2.posY, pokemon2.radius);
          if (intersectionPoints != null)
          {
            var x3 = intersectionPoints[0];
            var y3 = intersectionPoints[1];
            var x4 = intersectionPoints[2];
            var y4 = intersectionPoints[3];
            ellipse(x3, y3, dis/2, dis/2);
            ellipse(x4, y4, dis/2, dis/2);
          }
        }
      }
    }
  }

  for(var i = 0; i<pokemons.length;i++)
  {
    // pokemons[i].show();
    pokemons[i].applybehaviours(pokemons);
  }
  // fill(255,1);
  // rect(0,0,width,height);
}

function intersectCircles(x0,y0,r0,x1,y1,r1)
{
  var d = dist(x0, y0, x1, y1);
  if (d > r0 + r1) return null; // no solutions
  if (d < abs(r0 - r1)) return null; // no solutions
  if ((d == 0) && (r0 == r1)) return null; // infinite number of solutions

  var a = (r0*r0 - r1*r1 + d*d) / (2*d);
  var h = sqrt(r0*r0 - a*a);
  var x2 = x0 + a * (x1 - x0) / d;
  var y2 = y0 + a * (y1 - y0) / d;
  var x3 = x2 + h * (y1 - y0) / d;
  var y3 = y2 - h * (x1 - x0) / d;
  var x4 = x2 - h * (y1 - y0) / d;
  var y4 = y2 + h * (x1 - x0) / d;

  let intersectionPoints = [x3, y3, x4, y4];
  return intersectionPoints;
}
