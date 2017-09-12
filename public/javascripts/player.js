/*
  ----------------------------
  -----------TO DO------------
  ----------------------------

    * Add class default stats
      * Mage
      * Warrior
      * Paladin
      * Thief
    * Add more stat types
    * Create gear
    * Add level curve with stat growth

*/

function Player(name){
  this.name = name;
  this.max_hp = 100;
  this.hp = 100;
  this.max_mp = 100;
  this.mp = 100;
  this.xp=0;
  this.lvl=1;
  this.def=10;
  this.atk=10;

  //-----TODO-----//
  //class types and different generation for each

  //-----TODO-----//
  // Add deafult gear
  //var gear = new Object();
  //gear.weapon.name = "empty";
  //gear.armor.name = "empty";
  //gear.shield.name = "empty";
  //this.gear = gear;
}

//deals damage to the player, reduced by armor
Player.prototype.damage = function(damage){
  var damage_dealt = Math.floor(damage*(1-(this.def/(100+this.def))));
  this.hp=Math.max(this.hp-damage_dealt,0);
  return damage_dealt;
};

//returns the damage they would deal
Player.prototype.getDamage = function(){
  return this.atk;
};

Player.prototype.heal = function(heal){
  this.hp=Math.min(this.max_hp,this.hp+heal);
};

Player.prototype.healPercent = function(percent_heal){
  var heal = this.max_hp*percent_heal;
  this.hp=Math.min(this.max_hp,this.hp+heal);
}

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
