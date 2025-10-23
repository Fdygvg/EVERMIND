const source = [1,2,3,4,5,6,7,8,9,10]

function removeFirstTwo(two){
  const [ , , ...arr] = two;
  console.log(arr)
  return arr;
}
console.log(removeFirstTwo(source));