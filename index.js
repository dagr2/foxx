'use strict';

const createRouter=require('@arangodb/foxx/router');
const router=createRouter();
const joi = require('joi');

const { db } = require("@arangodb");
const collectionName = module.context.collectionName("log");

module.context.use(router);

router.get('/show-log',(req,res)=>{
	var { query } = require("@arangodb");
	var max = 13;
	var log = query`
	  FOR l IN log
	  RETURN l
	`.toArray();
	res.json(log);
});

router.put('/write-log',(req,res)=>{
	var { query } = require("@arangodb");
	var max = 13;
	var m="";
	var d=req.body.data;
	s=String.fromCharCode(...d);
	var log = query`
	  INSERT 
	  {
	  	_key: ${new Date()},
	  	msg: ${s}
	  } 
	  INTO log
	`.toArray();
	res.json(log);
});

router.get('/log-view',(req,res)=>{
	var { query } = require("@arangodb");
	var max = 13;
	var logs = query`
	  FOR e in log return e	`.toArray();
	var table=`<table>${logs.map(e=>'<tr><td>'+e._key+'</td><td>'+e.msg+'</td></tr>')}</table>`;
	res.set('Content-Type', 'text/html');
	res.send(`<html><body>${table}</body></html>`);
});


