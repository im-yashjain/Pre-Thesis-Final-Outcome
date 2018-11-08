class pokemon
{

  constructor(pkmon,pX,pY)
  {

    this.ID = pkmon.num;
    this.name = pkmon.name;
    this.hite = pkmon.height;
    this.type = pkmon.type;
    this.weakness = pkmon.weaknesses;
    this.posX = pX;
    this.posY = pY;
    this.direction = random(0,TWO_PI);
    let num = parseFloat(this.hite);
    this.radius = num*30;
    this.speed = 1;
  }

  printParameters()
  {
    // print("ID:",this.ID," name:",this.name," height:",this.hite,"radius:",this.radius,"X:",this.posX,"Y:",this.posY);
    print(this.type[0]);
  }

  show()
  {
    push();
    noFill();
    stroke(255);
    translate(this.posX,this.posY);
    rotate(this.direction);
    ellipse(0,0,this.radius*2,this.radius*2);
    line(0,0,this.radius,0);
    pop();
  }

  applybehaviours(otherPKMONS)
  {
    this.stayInside();
    this.touch(otherPKMONS);
    this.overlap(otherPKMONS);
    this.straightMotion();

  }
  straightMotion()
  {
    let dx = this.speed * cos(this.direction);
    let dy = this.speed * sin(this.direction);
    this.posX += dx;
    this.posY += dy;
  }

  stayInside()
  {
    if(this.posX<this.radius) this.posX=this.radius;
    if(this.posY<this.radius) this.posY=this.radius;
    if(this.posX>width-this.radius) this.posX=width-(this.radius);
    if(this.posY>height-this.radius) this.posY=height-(this.radius);
  }

  touch(otherPKMONS)
  {
    let other = otherPKMONS;
    for( var i=0; i<other.length;i++)
    {
      if( other[i] != this)
      {
       let dis = this.calcDistance(other[i].posX,other[i].posY);
       if(dis<=(this.radius+other[i].radius)) this.direction+=PI/360;
       // print("circle:",i," dis=",dis," min=",(this.radius+other[i].radius)/2," direction=",this.direction);
      }
    }
  }

  overlap(otherPKMONS)
  {
    let others = otherPKMONS;
    for (var i=0;i<others.length;i++)
    {
      if(others[i] != this)
      {
        let dis = this.calcDistance(others[i].posX,others[i].posY);
        if(dis<(this.radius+others[i].radius))
        {
          let bx = (others[i].posX-this.posX)/dis;
          let by = (others[i].posY-this.posY)/dis;

          this.posX -= this.speed*bx;
          this.posY -= this.speed*by;
        }
      }
    }
  }

  calcDistance(X,Y)
  {
    return dist(this.posX,this.posY,X,Y);
  }


}
