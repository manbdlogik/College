var express=require('express');
var app=express();
var path=require('path');
var port = process.env.PORT || 8080;

// app.use('/Scripts',express.static(__dirname+'/Views/Scripts/'));
app.get('/',function(req,res){
	res.sendFile('Index.html',{root:path.join(__dirname,'./public')});
});

app.get('/Administration',function(req,res){
	res.sendFile('Administration.html',{root:path.join(__dirname,'./public')});
});

app.get('/Eticket.pdf',function(req,res){
	res.sendFile('Eticket.pdf',{root:path.join(__dirname,'./public')});
	//res.redirect('/Administration.html');
});



app.listen(port,()=>{console.log('Server running at http://127.0.0.1:'+port+'/');});