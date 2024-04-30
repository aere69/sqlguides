# MusicAPI

Bare bones of a MusicAPI. -- In Progress --

## Search text

Search for specific text witin a field/column

```js
Model.find({text = { $search: criteria.name }});
```

An index is required.

  MongoDB indexes are for singel columns.

How to create an index:

1) Open mongo cli.

```sh
mongo
```

2) Show databases

```sh
show dbs
```

3) Specify the database/collection to work with

```sh
use <dn_name>
```

4) Create de Index

```sh
db.<db_name>.createIndex( { <field_name>: "text" })
```
