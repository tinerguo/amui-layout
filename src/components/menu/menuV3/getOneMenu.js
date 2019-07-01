/**
 * Created by tiner on 2019/6/24.
 */


function getMenu(arr){
  var obj = {};
  for(let i =0;i<arr.length;i++){
    if(arr[i].url && arr[i].children <= 0){
        obj = arr[i];
        break;
    }
    if(arr[i].children && arr[i].children.length > 0){
      obj = getMenu(arr[i].children);
      break;
    }
  }
  return obj;
}


export {
  getMenu
}


