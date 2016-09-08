/**
 * ViddyGameController
 *
 * @description :: Server-side logic for managing viddy games
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Client = require('node-rest-client').Client;
var client = new Client();
var endpoint = "http://localhost:1337/viddygames"

module.exports = {

  /**
   * `ViddyGameController.create()`
   */
  create: function (req, res) {

        if(req.method != "POST"){
          return res.view('create');
        }

        var args = {
            data: req.body,
            headers: { "Content-Type": "application/json" }
        };

        client.post(endpoint, args, function (data, response) {
            // return res.view('create', {success: { message: "Record added successfully"}});
            if(response.statusCode != "201"){
                return res.view('create', {error:{message: response.statusMessage + ": " + data.reason}});
            }

            return res.view('read', {success:{message: "Record created successfully"}});


        })

  },


  /**
   * `ViddyGameController.read()`
   */
  read: function (req, res) {

    client.get(endpoint, function (data, response) {
        return res.view('read', {viddygames: data});
    }).on('error', function (err) {
        return res.view('read', {error: { message: "There was an error getting the records"}});
    });

  },


  /**
   * `ViddyGameController.update()`
   */
  update: function (req, res) {
    return res.json({
      todo: 'update() is not implemented yet!'
    });
  },


  /**
   * `ViddyGameController.delete()`
   */
  delete: function (req, res) {
    return res.json({
      todo: 'delete() is not implemented yet!'
    });
  }
};
