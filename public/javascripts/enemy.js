//creates a generic enemy
function Enemy(name,lvl,type,zone){

  //null zone type
  if(zone==null){
    //null type
    if(type==null){
      //generic rat enemy
      this.name = "rat";
      this.max_hp = 10+(2*lvl);
      this.hp = this.max_hp;
      this.atk = 5+(1.5*lvl);
      this.def = 8+(1.2*lvl);
      this.xp_reward = 3*lvl;
    }
  }

  //after all cases
  //force the name if it is not null
  if(name!=null){
    this.name=name;
  }
}

Enemy.prototype.getDamage = function(){
  return this.atk;
};

Enemy.prototype.damage = function(damage){
  var damage_dealt = Math.floor(damage*(1-(this.def/(100+this.def))));
  this.hp=Math.max(this.hp-damage_dealt,0);
  return damage_dealt;
};
