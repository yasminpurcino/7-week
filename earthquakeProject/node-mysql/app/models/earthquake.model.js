//model define as funcoes e a logica Esta fica apenas esperando a chamada das funções,[7] que permite o acesso para os dados serem coletados, gravados e, exibidos. model que diz COMO FAZER as coisa (ex CRUD)

const sql = require("./db.js");


// constructor
const Earthquake = function (earthquake) {
    this.title = earthquake.title;
    this.mag = earthquake.mag;
    this.place = earthquake.place;
    this.time = earthquake.time;
    this.detail = earthquake.detail;
};

Earthquake.create = (newEarthquake, result) => {
    sql.query("INSERT INTO earthquakes SET ?", newEarthquake, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created earthquake: ", { id: res.insertId, ...newEarthquake });
        result(null, { id: res.insertId, ...newEarthquake });
    });
};

Earthquake.findById = (id, result) => {
    sql.query(`SELECT * FROM earthquakes WHERE idearthquake = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found earthquake: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Earthquake with the id
        result({ kind: "not_found" }, null);
    });
};

Earthquake.updateById = (id, earthquake, result) => {
    sql.query(
        "UPDATE earthquakes SET title = ?, mag = ?, place = ?, time = ?, detail = ?    WHERE idearthquake = ?",
        [earthquake.title, earthquake.mag, earthquake.place, earthquake.time, earthquake.detail, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Earthquake with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated earthquake: ", { id: id, ...earthquake });
            result(null, { id: id, ...earthquake });
        }
    );
};

Earthquake.findById = (id, result) => {
    sql.query(`SELECT * FROM earthquakes WHERE idearthquake = ${id}`, (err, res) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found earthquake:", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null)
    });
};

Earthquake.findAll = (title, result) => {
    let query = "SELECT * FROM earthquakes";

    if (title) {
        query += ` WHERE title LIKE '%${title}'`;

    }

    console.log(query);
    sql.query(query, (err, res) => {
        if (err) {
           // console.log("error:", err);
            result(err, null);

            return;
        }
        if (res.length) {
          //  console.log("found earthquake:", res);
            result(null, res);
            return;
        }
        result({ kind: "not_found" }, null)
    });
};

Earthquake.deleteOne = (id, result) => {
    sql.query(`DELETE FROM earthquakes WHERE idearthquake = ${id}`, (err, res) => {
        console.log(res)
        if (err) {
            console.log("error:", err);
            result(err, null);
            return;
        }

        if (res) {
            console.log("delete:", res);
            result(null, res);
            return;
        }
        result({ kind: "not_delete" }, null)
    });
};

Earthquake.deleteAll = (title, result) => {
    let query = "DELETE FROM earthquakes";

    if (title) {
        query += ` WHERE title = '${title}'`;

    }

    console.log(query);
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error:", err);
            result(err, null)
            return;
        }
        if (res) {
            result(null, res)
            return;
        }
    });
};

module.exports = Earthquake


