function createPlayer(){
  var form = document.getElementById('create_player_form');
  var name = document.getElementById('player_name').value;
  console.log(name);
  var player = new Player(name);
  console.log(player);
  document.getElementById("hidden_field").setAttribute('value',JSON.stringify(player));
  form.submit();
}
