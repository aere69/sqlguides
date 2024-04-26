# Users - MongoDB - CRUD operations

Simple app to use basic Create, Read, Update and Delete (CRUD) operations on a MongoDB.

1) Start a Node.js project

    ```sh
    npm init
    ```

2) Install packages

   ```sh
   npm install --save mocha nodemon mongoose
   ```

   - **Mocha** : Testing framework
   - **Mongoose** : Mongoose Connection Framework

## The database

The objective is to create a **User Model**.

- The User Model contains an schema that defines the instances to be added ot the database.
- The User Model contains the entire collection of data inside the database.
- The Schema represents the properties expected inside the Model.
- From a model we will create instances of the schema.

User Model -> Schema -> Name

```sh
Instance1 : name:'Joe'
Instance2 : name:'Alice'
Instance3 : name:'Peter'
```

## Create

Create a new instance of the schema and use the save() property to persist on the database.
A new instance has a property **.isNew** that equals to true until the instance is saved to the database.

## Queries

1) Get all

```sh
 User.find({})
```

2) Find all

```sh
User.find(criteria)
```

- Find all users matching criteria.
- Returns an array

3) Find One

```sh
User.findOne(criteria)
```

- Find the first match for criteria.
- Returns a single instance/record.

## Delete

MongoDB does not use Delete, instead uses Remove.

**Options for the schema:**

- deleteOne
- deleteMany
- findOneAndDelete
- findByIdAndDelete

**Options for the Instance of the schema:**

- deleteOne

## Update

MongoDB update record/instance on database.

**Options for the schema:**

- updateOne
- updateMany
- findOneAndUpdate
- findByIdAndUpdate

**Options for the Instance of the schema:**

- set and save

[Update Operators Documentation](https://www.mongodb.com/docs/manual/reference/operator/update/)
