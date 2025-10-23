// function multiplyAll(arr) {
//   var product = 1;

//   for (var i=0; i < arr.length; i++){
//     for(var j=0; j < arr[i].length; j++){
//       product*= arr[i][j];
//     }
//   }
//   return product;
// }
// var product = multiplyAll([[1,2], [3,4], [5,6,7]]);
// console.log(product);


function multiply(arr) {
  var product = 1;

  for(var i = 0; i < arr.length; i++){
    for(var j = 0; j < arr[i].length; j++ ){
      console.log("Now Multiplying:", product, "x", arr[i][j]  )
      product *= arr[i][j]
      
      console.log("Product so Far:", product)
    }
  }
  return product
}

console.log(multiply([[1,2], [3,4], [5,6,7]]))
