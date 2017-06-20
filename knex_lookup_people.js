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


let print = (rows) => {
  console.log(`- 1: ${rows[0].first_name} ${rows[0].last_name} born ${rows[0].birthdate}`);
};

console.log("Searching...")
//SELECT * FROM famous_people
knex.select().from("famous_people")
.where('first_name', '=', process.argv[2])
.asCallback((err,rows) => {
  if (rows.length) {
    console.log(`Found ${rows.length} person(s) by the name ${rows[0].first_name}`);
    print(rows);
  }

});