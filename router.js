/* 
* @Author: chiva
* @Date:   2015-10-30 14:45:24
* @Last Modified by:   anchen
* @Last Modified time: 2015-10-30 15:07:36
*/
var express = require('express');
var Speaker = require('./server/models/speaker');
var router = express.Router();
router.use(function (req,res,next) {
	console.log('Request comming from client');
	next();
});
router.get('/',function(req,res){
	res.json({message:'Hello SPA,the api is working!'});
});