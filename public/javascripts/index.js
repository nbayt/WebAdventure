$(document).ready(function(){
  var player = player_data;
  console.log(player);
  var valid_player = false;
  if(player.name!='null'){
    valid_player=true;
    //store the player data
    setStorageJSON("player_data",player);
  }
  else{
    //TODO hide some page content here.
    window.location.href = "/createplayer";
  }
});
