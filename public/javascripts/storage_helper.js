var IS_STORAGE = typeof(Storage) !== "undefined";
console.log(IS_STORAGE+" storage");

//-----Helper_Functions-----//
function storageSetUp() {
  if (IS_STORAGE) {
    //do setup if needed
  } else {
    //error
    console.log("No Storage");
  }
}

function getStorageJSON(key){
  if(IS_STORAGE){
    var val = JSON.parse(localStorage.getItem(key));
    return val;
  }
}

function getStorage(key){
  if(IS_STORAGE){
    var val = localStorage.getItem(key);
    return val;
  }
}

function setStorageJSON(key,val){
  if(IS_STORAGE){
    localStorage.setItem(key,JSON.stringify(val));
  }
}

function setStorage(key,val){
  if(IS_STORAGE){
    localStorage.setItem(key,val);
  }
}
