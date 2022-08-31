const express = require("express");
const axios = require("axios");
const redis = require("redis");
const app = express();
const port = process.env.PORT || 3000;
var cron = require('node-cron');
let redisClient;

(async () => {
  redisClient = redis.createClient();
  redisClient.on("error", (error) => console.error(`Error : ${error}`));
  await redisClient.connect();
})();


async function fetchApiData(species) {
  const apiResponse = await axios.get(
    `https://www.fishwatch.gov/api/species/${species}`
  );
  console.log("Request sent to the API");
  return apiResponse.data;
}

async function clearApiCache(req, res) {
  console.log('cleared cache')

  redisClient.flushall((err, sucess) => {
    if (err) {
      throw new Error(err);
    }
    console.log(sucess); // will be true if successfull
  });


  res.send({ result: 'cache cleared' })
}

async function getSpeciesData(req, res) {
  const species = req.params.species;
  let results;
  let isCached = false;
  try {
    const cacheResults = await redisClient.get(species);
    if (cacheResults) {
      isCached = true;
      results = JSON.parse(cacheResults);
    } else {
      results = await fetchApiData(species);
      if (results.length === 0) {
        throw "API returned an empty array";
      }
      await redisClient.set(species, JSON.stringify(results), {
        EX: 180,
        NX: true,
      });

    }
    res.send({
      fromCache: isCached,
      data: results,
    });
  } catch (error) {
    console.error(error);
    res.status(404).send("Data unavailable");
  }
}

function clearApiCache(req, res) {

  let cleared = false;
  try {
    redisClient.flushAll();
    console.log('cleared cache')
    cleared = true;
  }
  catch (error) {
    console.log(error)
  }
  res.send({ cacheCleared: cleared })
}





app.get("/fish/:species", getSpeciesData);
app.get("/clearApiCache", clearApiCache);
app.listen(port, () => {
  console.log(`App listening on port ${port}`);

  var task = cron.schedule('* * * * * *', () => {
    console.log('Task submitted successfully');
  });

  setTimeout(() => {
    task.stop();
  }, 2000);

  setTimeout(() => {
    task.start();
  }, 5000);

  setTimeout(() => {
    task.stop();
  }, 8000);

});




// async function fetchApiData(id) {
//   const apiResponse = await axios.get(
//     `https://jsonplaceholder.typicode.com/posts${id}`
//   );
//   console.log("Request sent to the API");
//   return apiResponse.data;
// }
// async function getPostsData(req, res) {
//   const species = req.params.id;
//   let results;
//   let isCached = false;
//   try {
//     const cacheResults = await redisClient.get(id);
//     if (cacheResults) {
//       isCached = true;
//       results = JSON.parse(cacheResults);
//     } else {
//       results = await fetchApiData(id);
//       if (results.length === 0) {
//         throw "API returned an empty array";
//       }
//       await redisClient.set(species, JSON.stringify(results), {
//         EX: 180,
//         NX: true,
//       });

//     }
//     res.send({
//       fromCache: isCached,
//       data: results,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(404).send("Data unavailable");
//   }
// }
// app.get("/posts/:id", getSpeciesData);
// app.listen(port, () => {
//   console.log(`App listening on port ${port}`);
// });




//http://localhost:3000/fish/american-lobster
//http://localhost:3000/fish/atlantic-cod
//http://localhost:3000/fish/atlantic-chub-mackerel
//http://localhost:3000/fish/crimson-jobfish
//http://localhost:3000/fish/cobia
//http://localhost:3000/fish/pacific-wahoo








