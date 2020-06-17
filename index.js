'use strict';

const createRouter=require('@arangodb/foxx/router');
const router=createRouter();
const joi = require('joi');

const { db } = require("@arangodb");
const collectionName = module.context.collectionName("log");

module.context.use(router);

// Hello World route
router.get('/hello-world',(req,res)=>{
	res.send('Hello word');
})
.response(['text/plain'], 'A generic greeting')
.summary('Generic greeting')
.description('prints a generic greeting');

// Hello World route
router.get('/show-log',(req,res)=>{
	var { query } = require("@arangodb");
	var max = 13;
	var log = query`
	  FOR l IN log
	  RETURN l
	`.toArray();
	res.json(log);
});

// Hello World route
router.get('/write-log/:msg',(req,res)=>{
	var { query } = require("@arangodb");
	var max = 13;
	var log = query`
	  INSERT 
	  {
	  	_key: ${new Date()},
	  	msg: ${req.pathParams.msg}
	  } 
	  INTO log
	`.toArray();
	res.json(log);
});

router.get('/hello/:name',(req,res)=>{
	res.send(`Hello, ${req.pathParams.name}`);
})
.pathParam('name', joi.string().required(), 'Name to greet')
.response(['text/plain'], 'A personalized greeting')
.summary('Personalized greeting')
.description('Prints a personalized greeting')


