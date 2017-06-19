/**
 * GradeController
 *
 * @description :: Server-side logic for managing gradess
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


var Client = require('node-rest-client').Client;
var client = new Client();
//var endpoint = "http://localhost:1337/grade";
//var view = "manage_grades";
//var managedModel = req.param('model');
var managedModel;
var endpoint = "http://localhost:1337/";
var view = "manage_" + managedModel + "s";
var idField = managedModel + "_id";

function clean_request_body(request_body) {
    console.log(request_body);
    return JSON.parse(JSON.stringify(request_body).replace(/\"\"/g, null))
}

module.exports = {

    /**
     * `GenericController.create()`
     */
    create: function (req, res) {
        managedModel = req.options.viewName;
        delete req.body[managedModel + "_id"];
        var args = {
            data: clean_request_body(req.body),
            headers: {
                "Content-Type": "application/json"
            }
        };

        client.post(endpoint + managedModel, args, function (data, response) {
            // return res.view('create', {success: { message: "Record added successfully"}});
            if (response.statusCode != "201") {
                req.addFlash("error", data.message.substring(data.message.indexOf("•")));
                return res.redirect("manage_" + managedModel + "s");
            }

            req.addFlash("success", "Record created successfully");
            return res.redirect("manage_" + managedModel + "s");

        })

    },


    /**
     * `GenericController.read()`
     */
    read: function (req, res) {
        managedModel = req.options.viewName;
        client.get(endpoint + managedModel, function (data, response) {
            return res.view("manage_" + managedModel + "s", {
                modelData: data
            });
        }).on('error', function (err) {
            return res.view("manage_" + managedModel + "s", {
                error: {
                    message: "There was an error getting the " + managedModel + "s"
                }
            })
        })

    },


    /**
     * `GenericController.readwmajors()`
     *  this will return the requested model as well as list of related model data
     */
    readwdata: function (req, res) {
        managedModel = req.options.viewName;
        let returndata = new Object();
        let promises = [];
        if (typeof req.options.addModels != "undefined") {
            let addModels = req.options.addModels;
            console.log("additional views: " + addModels.length);
            for (let i = 0; i < addModels.length; i++) {
                let model = addModels[i] ;
                // create a promise so the page doesn't try to load before the majors list is returned
                let p1 = new Promise(
                    (resolve, reject) => {
                        client.get("http://localhost:1337/" + model, function (data, response) {
console.log("inside promise");
console.log(data);
                            returndata[model+ "s"] = data;
                        });
                    }
                )
                promises.push(p1);
            }
            console.log(returndata);
        }
        // don't try to get the model data until know the referenced data has come back
        Promise.all(promises).then(
            client.get(endpoint + managedModel, function (data, response) {
                returndata.modelData = data;
                console.log(returndata);
                return res.view("manage_" + managedModel + "s", returndata
                );
            }).on('error', function (err) {
                return res.view("manage_" + managedModel + "s", {
                    error: {
                        message: "There was an error getting the " + managedModel + "s"
                    }
                })
            })
        )
    },
    /**
     * `GenericController.update()`
     */
    update: function (req, res) {
        managedModel = req.options.viewName;
        // remove any id fields present in data so don't get errors when trying to update
        let modelId = req.body[managedModel + "_id"];
        delete req.body[managedModel + "_id"];

        var args = {
            data: clean_request_body(req.body),
            headers: {
                "Content-Type": "application/json"
            }
        };
        client.put(endpoint + managedModel + "/" + modelId, args, function (data, response) {

            if (response.statusCode != "200") {
                req.addFlash("error", data.message);
                return res.redirect("manage_" + managedModel + "s");
            }

            req.addFlash("success", "Record updated successfully");
            return res.redirect("manage_" + managedModel + "s");

        })
    },

    /**
     * `GenericController.delete()`
     */
    delete: function (req, res) {
        managedModel = req.options.viewName;
        client.delete(endpoint + managedModel + "/" + req.body[managedModel + "_id"], function (data, response) {

            if (response.statusCode != "200") {
                req.addFlash("error", data.message);
            }

            req.addFlash("success", "Record deleted successfully");

            return res.redirect("manage_" + managedModel + "s");

        })


    }

};