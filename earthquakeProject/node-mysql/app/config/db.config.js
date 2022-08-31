console.log(process.env['DB_HOST'])

module.exports = {
    
    HOST: process.env.MY_DB_HOST,
    USER: process.env.MY_DB_USER,
    PASSWORD: process.env.MY_DB_PASSWORD,
    DB: process.env.MY_DB_NAME,
    port: process.env.MY_DB_PORT,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };

// module.exports = {
//     HOST: "localhost",
//     USER: "root",
//     PASSWORD: "boris2811",
//     DB: "earthquakes"
// }  