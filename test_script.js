const pg = require("pg");
const settings = require("./settings");

const client = new pg.Client({
  user : settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.host,
  port: settings.port,
  ssl: settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Cant connect!")
  }
  let query_command = `SELECT * FROM famous_people
                        WHERE first_name = $1::text`;


let print = (result) => {
  console.log(`- 1: ${result.rows[0].first_name} ${result.rows[0].last_name} born ${result.rows[0].birthdate}`);
};

  console.log("Searching...");
  client.query(query_command, [process.argv[2]], (err, result) => {
    if (err) {
      return console.error("Cant do the query", err);
    }
    console.log(`Found ${result.rowCount} person(s) by the name ${result.rows[0].first_name}`);
    print(result);
    client.end();
  });
});