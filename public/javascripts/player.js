function Player(name){
  this.name = name;
  this.max_hp = 100;
  this.hp = 100;
  this.max_mp = 100;
  this.mp = 100;
  this.xp=0;
  this.lvl=1;

  var gear = new Object();
  gear.weapon = null;
  gear.armor = null;
  gear.shield = null;
  this.gear = gear;
}

Player.prototype.damage = function(damage){
  this.hp=Math.max(this.hp-damage,0);
};

//returns the damage they would deal
Player.prototype.getDamage = function(){
  return 5+this.lvl*2;
};

Player.prototype.heal = function(heal){
  this.hp=Math.min(this.max_hp,this.hp+heal);
};

Player.prototype.restore = function(){
  this.hp=this.max_hp;
  this.mp=this.max_mp;
};

Player.prototype.earnXp = function(xp){
  this.xp+=xp;
  var required_xp = this.lvl*10
  if(this.xp>=required_xp){
    this.lvl++;
    this.xp-=required_xp
    this.max_hp+=15;
    this.max_mp+=15;
    this.restore();
  }
};
