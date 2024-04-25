# Social Network

Simple Node.js code sample using API to connect to PostgreSQL Database. Including database migration examples.

All related files are contained in the [api/social-repo](https://github.com/aere69/sqlguides/tree/main/PostgreSQL/SocialNetwork/api/social-repo) folder.

1) Start Node.js project

```js
npm init -y (initialize Node.js project)
```

2) Install needed dependencies

```js
npm install dedent express jest node-pg-migrate nodemon pg pg-format supertest
```

3) Edit package.json

Modify the scripts section as follows:

```js
  "scripts": {
    "migrate": "node-pg-migrate",
    "start": "nodemon index.js"
  },
```

4) generate a new migration to initialize the database.

npm run migrate create add users table

Edit the file on the migration folder, specify the up and down (rollback) actions.

5) run the migration.

Mac
DATBASE_URL=postgres://USERNAME@localhost:5432/socialnetwork npm run migrate up

Windows GitBASH
DATBASE_URL=postgres://USERNAME:PASSWORD@localhost:5432/socialnetwork npm run migrate up

Windows CMD
set DATBASE_URL=postgres://USERNAME:PASSWORD@localhost:5432/socialnetwork&&npm run migrate up

Windows PowerShell
$env:DATBASE_URL="postgres://USERNAME:PASSWORD@localhost:5432/socialnetwork"; npm run migrate up

6) Start the code. Check files for configuration.

7) Run the app.

```js
node index.js
```

8) Use Postman or Visual Studio Extension REST Client to test.



## Testing

Use Jest for testing.

1) Edit package.json

Modify the scripts section as follows:

```js
  "scripts": {
    "migrate": "node-pg-migrate",
    "start": "nodemon index.js",
	"test": "jest"
  },
```

if you want tests to be ran in parallel the add '--no-cache' after jest.

2) Create tests inside code

3) run the tests

```js
npm run test
```

## Schema

Schemas can be tought of as folders inside a database.
To access a specific schema add the name to the table name. i.e. test.users or public.users

```sql
SHOW search_path
```

will show the order to look. **"$user", public** by default.

To change the search_path so it would look at **test** first:

```sql
SET search_path TO test, public
```

To use schemas with parallel tests:

1) Connect to PostresSQL
2) Create a new user (role) 
3) Create a new schema with the same name as the user created
4) Connect to the database with the user.