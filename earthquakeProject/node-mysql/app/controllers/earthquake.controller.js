//const redisClient = require("../cache.js");
 
const Earthquake = require("../models/earthquake.model.js");
const EarthquakeHelper = require("../helpers/load.db.js");
const GetEarthquake = require("../helpers/load.db.js");


// Create and Save a new Earthquake
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // define the propreties I want from my Api to transform in object 
    const earthquake = new Earthquake({
        title: req.body.title,
        mag: req.body.mag,
        place: req.body.place,
        time: req.body.time,
        detail: req.body.detail,

    });

    
    Earthquake.create(earthquake, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Earthquake."
            });
        else res.send(data);
    });
};
exports.update = (req, res) => {
    
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    Earthquake.updateById(
        req.params.id,
        new Earthquake(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Earthquake with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Earthquake with id " + req.params.id
                    });
                }
            } else {
                res.send(data);

            }
        }
    );
};


exports.findAll = (req, res) => {
    const title = req.query.title;
    Earthquake.findAll(title, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding earthquakes"
                    
            });
            return
        }
        if (data.length == 0) {
            EarthquakeHelper.fetchEarthquake()
        }
        res.send(data);
    }
    );
};


exports.findById = (req, res) => {

    Earthquake.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Earthquake with id ${req.params.id}.`
                });
                return
            }
            res.status(500).send({
                message: "Error updating Earthquake with id " + req.params.id
            });
            return
        }
        res.send(data);
    }
    );
};



exports.deleteOne = (req, res) => {
    Earthquake.deleteOne(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error delete Earthquake with id " + req.params.id
            });

            return
        }
        res.send(data)
    });
};


exports.deleteAll = (req, res) => {
    Earthquake.deleteAll(req.query.title, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error"
            });

            return
        }
        res.send(data)
    })
}


exports.getAllEarthquake = async (req, res) =>{
  
        GetEarthquake.checkFetchEarthquakes((err, data) =>{

            if (err) {
                console.log(err)
                res.status(500).send({
                    message: "Error"
                });
        
                return
            }
            res.send(data)
        })
    }  








