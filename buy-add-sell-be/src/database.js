import mysql from "mysql2";

let connection;

export const db = {
  connect: () => {
    connection = mysql.createConnection({
      host: "localhost",
      user: "byandselluser",
      password: "byandselluser",
      database: "buy-and-sell",
    });
    connection.connect();
  },
  query: (queryString, escapedValues) =>
    new Promise((resolve, reject) => {
      connection.query(queryString, escapedValues, (error, results, fields) => {
        if (error) reject(error);
        resolve({ results, fields });
      });
    }),
  end: () => connection.end(),
};
