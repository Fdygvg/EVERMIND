var recordCollection = {
  2548: {
    albumTitle: "Slippery When Wet",
    artist: "Bon Jovi",
    tracks: ["Let It Rock", "You Give Love a Bad Name"],
  },
  2468: {
    albumTitle: "1999",
    artist: "Prince",
    tracks: ["1999", "Little Red Corvette"],
  },
  1245: {
    artist: "Robert Palmer",
    tracks: [],
  },
  5439: {
    albumTitle: "ABBA Gold",
  },
};
var backUp = recordCollection;

function updateRecords(records, id, prop, value) {
  if (prop !== "tracks" && value !== "") {
    records[id][prop] = value;
  } else if (prop === "tracks" && !records[id][prop]) {
    records[id][prop] = [value];
  } else if (prop === "tracks" && value !== "") {
    records[id][prop].push(value);
  } else if (value === "") {
    delete records[id][prop];
  }
  return records;
}

// console.log(
//   updateRecords(recordCollection, 2468, "tracks", "Never Gonna Give You")
// );





const jsonString = '{"name": "John", "age": 30, "city": "New York"}';
const jsonString1 = "name"

console.log(jsonString1)
console.log(jsonString)

var jsonArr = JSON.parse(jsonString1)
console.log(jsonArr)