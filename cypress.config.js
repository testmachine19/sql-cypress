const { defineConfig } = require("cypress");
const mysql = require("mysql");

module.exports = defineConfig({
  env: {
    db: {
      host: "https://www.db4free.net",
      user: "slava001",
      password: "Loko9061161566!",
      database: "test_for_educate",
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        queryDb: (query) => {
          return queryTestDb(query, config);
        },
      });
    },
  },
});

function queryTestDb(query, config) {
  const connection = mysql.createConnection(config.env.db);
  return new Promise((resolve, reject) => {
    connection.connect((error) => {
      if (error) {
        reject(error);
        return;
      }

      connection.query(query, (queryError, results) => {
        connection.end();
        if (queryError) {
          reject(queryError);
        } else {
          resolve(results);
        }
      });
    });
  });
}
