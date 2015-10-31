/* 
 * @Author: chiva
 * @Date:   2015-10-31 12:55:34
 * @Last Modified time: 2015-10-31 17:14:07
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SpeakerSchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    company: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    picture: {
        type: String,
        default: ''
    },
    schedule: {
        type: String,
        default: ''
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Speaker', SpeakerSchema);