/**
 * StudentController
 *
 * @description :: Server-side logic for managing students
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


var Client = require('node-rest-client').Client;
var client = new Client();
var endpoint = "http://localhost:1337/student";
var view = "manage_students";

function clean_request_body(request_body) {
    return JSON.parse(JSON.stringify(request_body).replace(/\"\"/g, null))
}

module.exports = {

    /**
     * `StudentController.create()`
     */
    create: function (req, res) {

        var args = {
            data: clean_request_body(req.body),
            headers: {
                "Content-Type": "application/json"
            }
        };

        client.post(endpoint, args, function (data, response) {
            // return res.view('create', {success: { message: "Record added successfully"}});
            if (response.statusCode != "201") {
                req.addFlash("error", data.message.substring(data.message.indexOf("•")));
                return res.redirect(view);
            }

            req.addFlash("success", "Record created successfully");
            return res.redirect(view);

        })

    },


    /**
     * `StudentController.read()`
     */
    read: function (req, res) {

        let majors;
        // create a promise so the page doesn't try to load before the majors ist is returned
        let p1 = new Promise(
            (resolve, reject) => {
                client.get("http://localhost:1337/major", function (data, response) {
                    majors = data;
                });
            }
        )

        // don't try to get the student data until know the majors data has come back
        p1.then(
            client.get(endpoint, function (data, response) {
                return res.view(view, {
                    students: data, majors: majors
                });
            }).on('error', function (err) {
                return res.view(view, {
                    error: {
                        message: "There was an error getting the students"
                    }
                })
            })
        )

    },


    /**
     * `StudentController.update()`
     */
    update: function (req, res) {

        let studentId = req.body.student_id;
        delete req.body.student_id;

        var args = {
            data: clean_request_body(req.body),
            headers: {
                "Content-Type": "application/json"
            }
        };

        client.put(endpoint + "/" + studentId, args, function (data, response) {

            if (response.statusCode != "200") {
                req.addFlash("error", data.message);
                return res.redirect(view);
            }

            req.addFlash("success", "Record updated successfully");
            return res.redirect(view);

        })
    },

    /**
     * `StudentController.delete()`
     */
    delete: function (req, res) {

        client.delete(endpoint + "/" + req.body.student_id, function (data, response) {

            if (response.statusCode != "200") {
                req.addFlash("error", data.message);
            }

            req.addFlash("success", "Record deleted successfully");

            return res.redirect(view);

        })


    }

};
