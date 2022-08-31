const axios = require("axios");
const sql = require("../models/db.js");
const Earthquake = require("../models/earthquake.model.js")



function loadEarthquakes(earthquakeData) {
    const listEarthquake = []
    for (let quake of earthquakeData.features) {
      //  console.log("quake = " + quake.propeties)
      //  console.log(JSON.stringify(quake))
        const earthquake = new Earthquake({
            title: quake.properties.title,
            mag: quake.properties.mag,
            place: quake.properties.place,
            time: new Date(quake.properties.time),
            detail: quake.properties.detail,

        });

        listEarthquake.push(earthquake)
        sql.query("INSERT INTO earthquakes SET ?", earthquake, (err, res) => {
            if (err) {
                console.log("error: ", err);
                console.log(err)
                console.log(data)
            }
            if (res) {
                //console.log(res)
            }
            

        });
    } 
    console.log("list=" + listEarthquake.length)
    return listEarthquake
    

}

         //will fetch earthquakes from API if needed
function checkFetchEarthquakes(result) {
    sql.query("SELECT * FROM earthquakes", (err, res) => {
        if (err) {
            result(err, null)
            return 
        }
        console.log(res)

        if (res.length == 0)
        {
            axios.get('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2022-01-01&endtime=2022-01-02')
            .then(response => {
                let listEarthquake = loadEarthquakes(response.data)
                console.log("list2= "+ listEarthquake.length )
                result(null, response.data.features);
            })
            .catch((error) => {   
                console.log(error)
                result (error, null)
            });
        }
        else {
            result(null, res)
        }
    })
}


module.exports = {checkFetchEarthquakes }