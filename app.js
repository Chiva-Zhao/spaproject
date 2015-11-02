/* 
 * @Author: chiva-zhao
 * @Date:   2015-10-29 18:18:44
 * @Last Modified time: 2015-11-02 12:12:24
 */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 8080;
app.use(bodyParser());
console.log('magic happens on port' + port);
app.listen(port);
var mongoose = require('mongoose');
mongoose.connect('mongodb://api:api@182.92.163.226/node-api');
mongoose.connection.on('error', function() {
    console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});
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
app.use("/api", router);