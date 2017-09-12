//global vars
//prefixed with battle_ to avoid name duplication
var battle_enemy;
var battle_player;

//playerData will be saved in the local storage, just grab it using this function.
function getPlayerData(){
  Object.assign(new Player, player);
  var player = getStorageJSON("player_data");
  player = Object.assign(new Player, player);
  return player;
}

//generate an enemy based on lvl, type, and zone
function generateEnemy(lvl,type,zone){
  var enemy = new Enemy(null,lvl,type,zone);
  return enemy;
}

function writeBattleInfo(){
  document.getElementById("battle_info").innerHTML = ("Player HP: "+battle_player.hp+"/"+battle_player.max_hp+"<br>"+
battle_enemy.name+" HP: "+battle_enemy.hp+"/"+battle_enemy.max_hp);
}

//called when the player presses the attack button
//enemy attacks after the player for now, no speed stuff
function playerAttack(){
  var damage_dealt = battle_enemy.damage(battle_player.getDamage());
  var damage_taken = battle_player.damage(battle_enemy.getDamage());

  document.getElementById("battle_msg").innerHTML = ("You dealt: "+damage_dealt+"<br>"+"Enemy dealt: "+damage_taken);
  writeBattleInfo();
}

//setup the battle scene
//-generate enemy, etc
function main(){
  battle_enemy=generateEnemy(battle_player.lvl,null,null);
  writeBattleInfo();
}

$(document).ready(function(){
  battle_player = getPlayerData();
  if(battle_player.name=="null"){
    window.location.href = "/createplayer";
  }
  //else we have a vaild player
  main();
});
