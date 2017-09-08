//creates a generic enemy
function Enemy(name){
  this.name = name;
  this.max_hp = 10;
  this.hp = 10;
  this.dmg = 5;
  this.xp_reward = 5;
}

Enemy.prototype.getDamage = function(){
  return this.dmg;
};

Enemy.prototype.damage = function(damage){
  this.hp=Math.max(this.hp-damage,0);
};
