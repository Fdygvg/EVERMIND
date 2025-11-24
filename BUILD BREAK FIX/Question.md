add to the stand for question
sql, no sql
,

---
# Question:
what is mongodb and mongoose

## Answer:
db.students.find()
db.students.insertOne()


Think of it like raw SQL but for documents.

✅ Mongoose = a framework (ODM) on top of MongoDB

ODM = Object Document Mapper
Mongoose gives you:

Schemas

Models

Validation

Middlewares

Virtual fields

Hooks (pre-save, post-save)

Example with Mongoose:
```js
const Student = mongoose.model("Student", {
  name: String,
  age: Number,
  gpa: Number
});

Student.find();

```
---

# Question:

What is a document,collection and database in mongo db

## Answer:

A document is group of related information

```javascript
{
    name: "Mary Jane",
    age: 20,
    conutry: "France"
}
```

a collection si a group of one or more documents

## a database si a group of one or more collection

# Question:

What is the mongodb gui

## Answer:

A GUI is a software interface that lets you interact with a system visually using buttons, menus, windows, and icons—instead of typing commands.
It makes complex tools easier to use because everything is laid out visually.

In MongoDB:

MongoDB Compass is the GUI.

It lets you view, edit, query, and manage your MongoDB data using a visual interface.

You don’t need the command line to browse collections or update documents.

It connects to both local databases and Atlas cloud databases using a connection string.

Key idea:

Compass = the visual tool to work with your MongoDB data.
MongoDB Server = the actual database engine that stores the data.

---

# Question:

How do you extablish a conection with mongo bn

## Answer:

mongosh , and to exit , typr exit

```markdown
exit
```

and to clear screen type cls

---

# Question:

how can you view , create and delete all db in mongo db

## Answer:

in the terminal type

```
 show dbs
 test> show dbs
admin   40.00 KiB
config  96.00 KiB
local   40.00 KiB
```

the to open a specific db , type

use -dbname-
if you enter a name that doesnt exist then a new db will be created not not saved yet until you add some data to it
example ,
school> db.createCollection("students")
{ ok: 1 }
school> show dbs
admin 40.00 KiB
config 96.00 KiB
local 40.00 KiB
school 8.00 KiB
now school is a db , because data was added
OR
School> db.students.insertOne({name: "Spongebob", age:20, gpa:3.5})  
{
acknowledged: true,
insertedId: ObjectId('692433d74e7bb12ffbb5f8a1')
}

And to delete a db

school> db.dropDatabase()
{ ok: 1, dropped: 'school' }

## nb: this can alsp be done in mogodb compass

# Question:

How can you sort and limit objects in mongo db

## Answer:

    To list all objects ---

School> db.students.find()
[
{
_id: ObjectId('692433d74e7bb12ffbb5f8a1'),
name: 'Spongebob',
age: 20,
gpa: 3.5
}
]
To sort Text Alphabeticallly
db.students.find().sort({name: 1})
and to sort rever alphabetical
db.students.find().sort({name: -1})
now all names will list in reverse alphabeticall order
and for digits
db.students.find().sort({gpa: 1})
itll sort from smallets to biggest
db.students.find().sort({gpa: -1})
and reverse is biggest to smallest

to limit objects
db.students.find().limit(1)
and this will return onlt one ..

to combuine and use both
db.students.find().sort({gpa:-1}).limit(1)
this will retuen the highest gpa
db.students.find().sort({gpa:1}).limit(1)
this will return the lowest gpa

nb: nb this can also be done in mongo db compass, click the option menu

---

# Question:

how can you add more than one value to a db at a time

## Answer:

db.students.insertMany([{ name: "Patrick", age: 21, gpa: 3.2 },{ name: "Sandy", age: 22, gpa: 3.8 },{ name: "Squidward", age: 23, gpa: 2.9 },{ name: "Mr. Krabs", age: 45, gpa: 3.0 }])
and you lll get a reply llike
{
acknowledged: true,
insertedIds: {
'0': ObjectId('692435654e7bb12ffbb5f8a2'),
'1': ObjectId('692435654e7bb12ffbb5f8a3'),
'2': ObjectId('692435654e7bb12ffbb5f8a4'),
'3': ObjectId('692435654e7bb12ffbb5f8a5')
}
}
nb: can also be done with mongo compass

---

# Question:

what are the different data types in mongo db

## Answer:

Asting is a series of tesxt in quotes, double or single quotes
boolean
School> db.students.insertOne({name: "Larry Loser", age: 32, double:2.8, boolean: false, date: new Date(), null: null, courses: ["Biology", "Agric"], object: {street:"123 Fake Street", city: "Bikini Bottom"},)

---

# Question:

what is the find method and the projection parameter in mongo db

## Answer:

you can use it to find specific thing in you db, if tehy exist youll get the full object
db.students.find({name: "Spongebob"})

[
{
_id: ObjectId('692433d74e7bb12ffbb5f8a1'),
name: 'Spongebob',
age: 20,
gpa: 3.5
}
]
and if they dont you get no reply
School> db.students.find({name: "Larry"})

to find boolean

```javascript
db.students.find({ admission: true });
```

and to use more than one you can do it by using commas

```javascript
db.students.find({ admission: true, gpa: 4.0 });
```

the projection parameter ,

```javascript
School >
  db.students.find({}, { name: true })[
    ({ _id: ObjectId("692433d74e7bb12ffbb5f8a1"), name: "Spongebob" },
    { _id: ObjectId("692435654e7bb12ffbb5f8a2"), name: "Patrick" },
    { _id: ObjectId("692435654e7bb12ffbb5f8a3"), name: "Sandy" },
    { _id: ObjectId("692435654e7bb12ffbb5f8a4"), name: "Squidward" },
    { _id: ObjectId("692435654e7bb12ffbb5f8a5"), name: "Mr. Krabs" },
    { _id: ObjectId("692436528d2c7b97aff756db"), name: "SpongeBob" })
  ];
```

mongo db will put in the id by default so to avoid that , just set id as false
School> db.students.find({}, {\_id:false, name:true})
[
{ name: 'Spongebob' },
{ name: 'Patrick' },
{ name: 'Sandy' },
{ name: 'Squidward' },
{ name: 'Mr. Krabs' },
{ name: 'SpongdeBob' }
]
nb:this c an also be done in compass, click on the optopns butoon

---

# Question:

How do you update a domunet in mongo db

## Answer:

School> db.students.updateOne({name: "Spongebob"}, {$set:{fullTime:true}})
{
acknowledged: true,
insertedId: null,
matchedCount: 1,
modifiedCount: 1,
upsertedCount: 0
}
School> db.students.find({name: "Spongebob"})
[
{
_id: ObjectId('692433d74e7bb12ffbb5f8a1'),
name: 'Spongebob',
age: 20,
gpa: 3.5,
fullTime: true
}
]
School>

it is recommetb to update by unique id incase of duplicate names

```js
db.students.updateOne(
  { _id: objectId("'692433d74e7bb12ffbb5f8a1") },
  { $set: { fullTime: false } }
);
```

and to remove a field use the $unset value 
School> db.students.updateOne({_id: ObjectId("692433d74e7bb12ffbb5f8a1")}, {$unset:{fullTime:""}})
{
acknowledged: true,
insertedId: null,
matchedCount: 1,
modifiedCount: 1,
upsertedCount: 0
}
School> db.students.find({name: "Spongebob"})
[
{
_id: ObjectId('692433d74e7bb12ffbb5f8a1'),
name: 'Spongebob',
age: 20,
gpa: 3.5
}
]
and to update multipl fields , use the updateMany

db.students.updateMany({}, {$set:{employed:true}})

you can also use update many method to check if a field exists to make a change

db.students.updatemany({employed:{$exists:true}}, {$set: {employed:false}})
nb: this can also be done in mongo db compass

---

# Question:

how do you delete documents in mongo db shell

## Answer:

To delete a singular doc
db.students.deleteOne({name: "Larry"})

and to delete many
School> db.students.deleteMany({employed:false})
{ acknowledged: true, deletedCount: 3 }

---

# Question:

what are comparison Query operators

## Answer:

normally they retirn data based on valur comparisons
example :
db.students.find({name: {$ne:"Spongebob"}})
this will return everyname that is not sponge bob

db.students.find({age: {$lt:25}})
this will return all studnent less than 25
db.students.find({age: {$lte:25}})
this will return all studnent less than or equal to 25

db.students.find({age: {$gt:25}})
this will return all studnent greater than 25
db.students.find({age: {$gte:25}})
this will return all studnent greater than or erual to
25

you can combi ne two ,
db.students.find({gpa:{$gte:3, $lte:4}})
this will give you all stupdent with gpa withing that range

---

# Question:
what is the in and nin mongo db query operator

## Answer:
$in is a MongoDB query operator that matches documents where a field’s value is in the specified array.

$in is a MongoDB query operator that matches documents where a field’s value is in the specified array.

Think of $in like asking:

“Give me all the students whose name is in this list.”

The list can be any set of values you want. MongoDB checks each document and returns it if the field matches any value in the list.
Example
```js
Suppose your students collection has these documents:

{ name: "Spongebob", age: 20 }
{ name: "Patrick", age: 21 }
{ name: "Sandy", age: 22 }
{ name: "Squidward", age: 23 }


Query:

db.students.find({ name: { $in: ["Spongebob", "Patrick", "Sandy"] } })


MongoDB checks each document:

"Spongebob" → in the list ✅ → returned

"Patrick" → in the list ✅ → returned

"Sandy" → in the list ✅ → returned

"Squidward" → not in the list ❌ → skipped

Result:

{ name: "Spongebob", age: 20 }
{ name: "Patrick", age: 21 }
{ name: "Sandy", age: 22 }

while `$nin` does the opposite
db.students.find({name:{$nin:["Spongebob", "Patrick", "Sandy" ]}})
```
nb: can also be done on mongo db , compass
---
# Question:
what are mongo db , logical query operators


## Answer:
logical operators return data based on expressins that evaluate to true or false 
```js
`$and` Both are true
db.students.find({$and: [{employed:false}, {age:{$gte:30}}]})
`$not` 
db.students.find({age:{$not :{$gte:30}}})
can be used when finding objects with null fields
`$nor` Both need to be false 

db.students.find({$nor: [{employed:true}, {age:{$gte:10}}]})
`$or` one is true the either id falst , or both an be true, bu both can nevwr be false
db.students.find({$or: [{employed:false}, {age:{$gte:30}}]})

```

---
# Question:
What are indexes in mongo db
## Answer:
An index in MongoDB is like the index in a book: it helps the database find data fast without scanning every single document.

```js
Manual indexes: Create on fields you query or sort frequently:

db.students.createIndex({ gpa: 1 })  // ascending
db.students.createIndex({ gpa: -1 }) // descending


1 vs -1:

1 → ascending order (small → large)

-1 → descending order (large → small)

Usage: Indexes help with find() and sort() queries.

One-time setup: Create an index once per field or combination; MongoDB uses it automatically for matching queries.
```
you can view all index in a collection
```js
School> db.students.getIndexes()
[
  { v: 2, key: { _id: 1 }, name: '_id_' }
]
// id is there by default 
```
and you can also drop indexes by 
```js
db.students.dropIndex("_id_")
```
nb: can also be done in mongo db, compass, go to the index tab and create a new index
---
# Question:
how can you see how quieries run in mongo db 

## Answer:
```js
Use .explain() with your query:

db.students.find({ gpa: { $gte: 3 } }).explain("executionStats")


"executionStats" is the mode that gives detailed performance info.
```

---
# Question:
how do you view creacte and delete collections in mongo db

## Answer:

```js
`show colections`
to view all collections 
db.createCollection("teachers", {capped: true, size:10000000, max:100, })

"capped" means putting limits 
when capped is selected you need to put your limits 
"size:"10000000 is 10 mb 
"max": this is the max amount amount of documents in that collection
`autoIndexId` - this is either true or false 
That option is basically an old setting that told MongoDB not to automatically create the _id index when making a collection.

and to drop a collection 
```

```js
db.teachers.drop()
```


---
# Question:
What is the replace method in mongodb

## Answer:
MongoDB gives you only one replace method:
```js
db.students.replaceOne(
  { name: "Patrick" },       // filter
  { name: "Patrick", age: 25, employed: true }   // new document
)
What it does:

Finds one document matching the filter

Replaces the entire document

Anything not in the replacement is deleted
```

---
# Question:

## Answer:
```js
```

---
# Question:

## Answer:
```js
```

---
# Question:

## Answer:
```js
```

---
# Question:

## Answer:
```js
```

---
# Question:

## Answer:
```js
```

---
# Question:

## Answer:
```js
```

---
# Question:

## Answer:
```js
```

---
