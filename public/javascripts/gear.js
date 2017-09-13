//---TODO---// Check if this is fair distribution
const gear_rarity_legendary = 0.01;
const gear_rarity_epic = gear_rarity_legendary+0.05;
const gear_rarity_rare = gear_rarity_epic+0.1;
const gear_rarity_uncommon = gear_rarity_rare+0.24;
//common would then be 60%

//fixed to make weapons
function Gear(lvl,rarity,slot){

}

function gear_generate(lvl){
  var rand = Math.random();
  var slot = "weapon";
  var rarity;
  if(rand<=gear_rarity_legendary){
    rarity=0;
  } else if(rand<=gear_rarity_epic){
    rarity=1;
  } else if(rand<=gear_rarity_rare){
    rarity=2;
  } else if(reand<=gear_rarity_uncommon){
    rarity=3;
  } else{
    //common
    rarity=4;
  }
  var gear = new Gear(lvl,rarity,slot);
  return gear;
}
