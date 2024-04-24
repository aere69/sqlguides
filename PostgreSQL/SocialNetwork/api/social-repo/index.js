const app = require('./src/app.js');
const pool = require('./src/pool.js');

pool
    .connect({
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'password'
    })
    .then(() => {
        app().listen(3005, () => {
            console.log('Listening on port 3005');
        });
    })
    .catch((err) => console.error(err));