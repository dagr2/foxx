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
	sort l._key desc
	limit 5000
	  RETURN l
	`.toArray();
	res.json(log);
});

router.put('/write-text',(req,res)=>{
	var { query } = require("@arangodb");
	var max = 13;
	var s=req.body;
	var log = query`
	  INSERT 
	  {
	  	_key: ${new Date()},
	  	msg: ${JSON.parse(s).msg}
	  } 
	  INTO log
	`.toArray();
	res.json(log);
});

router.put('/write-object',(req,res)=>{
	var { query } = require("@arangodb");
	var max = 13;
	var s=req.body;
	var log = query`
	  INSERT 
	  {
	  	_key: ${new Date()},
	  	doc: ${JSON.parse(s)}
	  } 
	  INTO log
	`.toArray();
	res.json(log);
});

router.get('/log-view-text',(req,res)=>{
	res.set('Content-Type', 'text/html');
	res.send(`
<html>
<head>
<style>
html,body,#table{
width:100%;
height:100%;
}
</style>
<script  src="https://code.jquery.com/jquery-3.3.1.min.js"  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="  crossorigin="anonymous"></script>  	
		<link rel="stylesheet" href="https://cdn3.devexpress.com/jslib/19.2.5/css/dx.common.css" />
		<link rel="stylesheet" href="https://cdn3.devexpress.com/jslib/19.2.5/css/dx.light.css" /><script src="https://cdn3.devexpress.com/jslib/19.2.5/js/dx.all.js"></script>
<script>
$(function(){
$('#table').dxDataGrid({
dataSource:'./show-log',
		pager: {
			showPageSizeSelector: true,
			allowedPageSizes: [10, 20, 50, 100, 1000],
			showNavigationButtons: true
		},
		paging: {
			pageSize: 100
		},
		sorting: {
			mode: 'single'
		},
rowAlternationEnabled: true,
		columns: [{
			dataField: "_key",
			sortOrder: 'desc',
			dataType: 'datetime',
			format: "dd.MM.yyyy, HH:mm:ss" //"MM/dd/yyyy HH:mm"
		}, "msg"],
})
})
</script>
</head>
<body><div id='table'></div></body>
</html>
`);
});


