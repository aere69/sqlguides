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

   **Mocha** : Testing framework
   **Mongoose** : Mongoose Connection Framework

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
