const settings = require("./settings");

let knex = require('knex')({
  client: 'pg',
  connection: {
    user : settings.user,
    password: settings.password,
    database: settings.database,
    host: settings.host,
    port: settings.port,
    ssl: settings.ssl
  }
});

knex("famous_people")
  .insert({first_name: process.argv[2],
            last_name: process.argv[3],
            birthdate: process.argv[4]})
  .asCallback((err,result) =>{
    console.log(result)
    knex.select().from("famous_people").asCallback((err,rows) => {
    console.log(rows);
  });
});

