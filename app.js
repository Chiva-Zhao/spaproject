/* 
 * @Author: chiva-zhao
 * @Date:   2015-10-29 18:18:44
 * @Last Modified by:   anchen
 * @Last Modified time: 2015-10-30 22:46:55
 */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 8080;
app.use(bodyParser());
console.log('magic happens on port' + port);
app.listen(port);
var mongoose = require('mongoose');
mongoose.connect('mongodb://182.92.163.226/node-api');
var Speaker = require('./server/models/speaker');
var router = express.Router();
router.use(function(req, res, next) {
    console.log('Request comming from client');
    next();
});
router.get('/', function(req, res) {
    res.json({
        message: 'Hello SPA,the api is working!'
    });
});
router.route('/speakers')
// create a speaker when the method passed is POST
.post(function(req, res) {
    var speaker = new Speaker();
    speaker.name = req.body.name;
    speaker.company = req.body.company;
    speaker.title = req.body.title;
    speaker.description = req.body.description;
    speaker.picture = req.body.picture;
    speaker.schedule = req.body.schedule;
    speaker.save(function(err) {
        if (err) res.send(err);
        res.json({
            message: 'speaker succecssfully created!'
        });
    });
})
// get all the speakers when a method passed is GET
.get(function(req, res) {
    Speaker.find(function(err, speakers) {
        if (err) res.send(err);
        res.json(speakers);
    });
});
router.route('/speakers/:speaker_id').get(function(req, res) {
    Speaker.findById(req.params.speaker_id, function(err, speaker) {
        if (err) res.send(err);
        res.json(speaker);
    });
})
// update the speaker by id
.put(function(req, res) {
    Speaker.findById(req.params.speaker_id, function(err, speaker) {
        if (err) res.send(err);
        // set the speakers properties (comes from the request)
        speaker.name = req.body.name;
        speaker.company = req.body.company;
        speaker.title = req.body.title;
        speaker.description = req.body.description;
        speaker.picture = req.body.picture;
        speaker.schedule = req.body.schedule;
        // save the data received
        speaker.save(function(err) {
            if (err) res.send(err);
            // give some success message
            res.json({
                message: 'speaker successfully updated!'
            });
        });
    });
})
// delete the speaker by id
.delete(function(req, res) {
    Speaker.remove({
        _id: req.params.speaker_id
    }, function(err, speaker) {
        if (err) res.send(err);
        // give some success message
        res.json({
            message: 'speaker successfully deleted!'
        });
    });
});
app.use("/api", router);