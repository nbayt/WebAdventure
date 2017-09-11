//creates a generic enemy
function Enemy(name){
  this.name = name;
  this.max_hp = 10;
  this.hp = 10;
  this.dmg = 5;
  this.def = 10;
  this.xp_reward = 5;
}

Enemy.prototype.getDamage = function(){
  return this.dmg;
};

Enemy.prototype.damage = function(damage){
  var damage_dealt = Math.floor(damage*(1-(this.def/(100+this.def))));
  this.hp=Math.max(this.hp-damage_dealt,0);
};

Enemy.prototype.generate = function(lvl,type,zone){
  
}
