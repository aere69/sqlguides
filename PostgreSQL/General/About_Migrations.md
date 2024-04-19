# About Schema Migrations

Some tips and clues about implementing migrations with Node.js

Package options to be installed :
- npmjs.com/package/node-pg-migrate
- npmjs.com/package/db-migrate

For the follwing I am going to use node-pg-migrate

1) Install npmjs.com/package/node-pg-migrate

2) Edit package.json

```js
{
	...
	"scripts": {
		"migrate": "node-pg-migrate"
	},
	...
}
```

3) Run the following command to create a schema migration

```js
npm run migrate create table comments
```

This will create the following file in the folder migrations
  xxxxxxxx_table-comments.json

4) Edit the file

```js
exports.shorthands = undefined;

exports.up = pgm => {
	pgm.sql(`
		CREATE TABLE comments (
			id SERIAL PRIMARY KEY,
			created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
			contents VARCHAR(240) NOT NULL
		);
	`);
};

exports.down = pgm => {
	pgm.sql(`
		DROP TABLE comments;
	`);
};
```
5) Make the call to execute the migration.

**Database environment variable (Windows):**
postgres://postgres:[PASSWORD]@localhost:5432/<databaseName>

**GIT BASH:**
DATABASE_URL=postgres://postgres:<PASSWORD>@localhost:5432/<databaseName> npm run migrate up

**CMD:**
set DATABASE_URL=postgres://postgres:<PASSWORD>@localhost:5432/<databaseName>&&npm run migrate up

**PowerShell:**
$env:DATABASE_URL="postgres://postgres:<PASSWORD>@localhost:5432/<databaseName>"; npm run migrate up
