function main(){
  storageSetUp();
  var player = new Player("Nick");
  //console.log(player);

  var rat = new Enemy("rat");
  //console.log(rat);

  //stroing player in text format
  var temp = JSON.stringify(player);
  console.log(temp);

  //cast back to player
  var temp2 = JSON.parse(temp);
  temp2 = Object.assign(new Player, temp2);
  console.log(temp2);
}

function createNewPlayer(){
  var name = document.getElementById("playerName").value;
  var player = new Player(name);
}

$(document).ready(function(){
  //document.getElementById("output").innerHTML = "test<br>test2"
  main();
});
