
module.exports = app => {
    const earthquakes = require("../controllers/earthquake.controller.js");
    const getEarthquake = require("../helpers/load.db.js");


    var router = require("express").Router();

    // Create a new earthquakes
    router.post("/", earthquakes.create);

      // // Retrieve all earthquakes
    router.get("/", earthquakes.getAllEarthquake); 

    // // Retrieve a single earthquakes with id
    router.get("/:id", earthquakes.findById);

    // // Update an earthquakes with id
    router.put("/:id", earthquakes.update);

    // // Delete an earthquakes with id
    router.delete("/:id", earthquakes.deleteOne);

    // // Delete all Users
    router.delete("/", earthquakes.deleteAll);

    // // Retrieve all earthquakes
    //router.get("/", earthquakes.findAll);

    app.use('/api/earthquakes', router);
};
