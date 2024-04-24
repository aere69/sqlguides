# Social Network

Simple Node.js code sample using API to connect to PostgreSQL Database. Including database migration examples.

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

