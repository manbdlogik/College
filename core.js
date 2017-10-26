var express=require('express');
var fs = require('fs');
var url = require('url');
var app=express(), session = require('express-session'),bodyParser = require('body-parser');
var path=require('path');
let server = require('http').Server(app);
var port = process.env.PORT || 5000;
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const fileUpload = require('express-fileupload');

process.env.PWD = process.cwd();

app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true,	 
}));

app.use(fileUpload());




// Authentication and Authorization Middleware
// var auth = function(req, res, next) {
//   if (req.session && req.session.user === "principal" && req.session.admin)
//   {
// 	  console.log(req.session);
//       return next();
//   }
//   else
//   {
// 	const page= path.join(__dirname, 'Public', 'unauth.html');	
// 	res.sendFile(page);
//   }
    
// };

//app.use(express.static(path.join(process.env.PWD, 'public')));


//app.use(express.static('Public'));
app.use('/js',express.static(__dirname+'/public/assets/js/'));
app.use('/bdslide',express.static(__dirname+'/public/assets/js/bdslide/'));
app.use('/images',express.static(__dirname+'/public/assets/images/'));
app.use('/fonts',express.static(__dirname+'/public/assets/fonts/'));
app.use('/css',express.static(__dirname+'/public/assets/css/'));
app.use('/downloadFile',express.static(__dirname+'/public/Uploaded/'));
app.use('/downloadTenders',express.static(__dirname+'/public/Tenders/'));
app.use(bodyParser.json());

app.post('/login',urlencodedParser, function (req, res) {

var dataReceived = JSON.parse(JSON.stringify(req.body));
var username=dataReceived.name;
var password=dataReceived.password;
 if(username == "principal" && password == "g01df1$h") 
  {
		console.log("login success");
    req.session.user = username;
    req.session.admin = true;    
	res.send({"userid":username,"pwd":password,"status":true});
  }
	else
	{
		console.log("login fail");
		res.send({"userid":username,"pwd":password,"status":false});
	}
});

app.get('/logout', function (req, res) {
  req.session.destroy();
  console.log("logout success");
  res.send("logged out");
});
app.post('/delete', function(req, res) 
{

  	var url_parts = url.parse(req.url, true);
 	var query = url_parts.query;
	var fileToDelete=path.join(__dirname, 'public/Uploaded/',query.filename);
	fs.unlink(fileToDelete, function (err) {
        if (err){
            console.log('err');
			res.send(true);
        }
		else
		{
			console.log('deleted');
			res.send(false);
		}
		
    });
 
});
app.post('/deleteTender', function(req, res) 
{

  	var url_parts = url.parse(req.url, true);
 	var query = url_parts.query;
	var fileToDelete=path.join(__dirname, 'public/Tenders/',query.filename);
	fs.unlink(fileToDelete, function (err) {
        if (err){
            console.log('err');
			res.send(true);
        }
		else
		{
			console.log('deleted');
			res.send(false);
		}
		
    });
 
});

app.post('/uploadTender', function(req, res) 
{

//console.log(req.files);
  if (req.files.file)
	{
		
  	let sampleFile = req.files.file;  	
   	sampleFile.mv(path.join(__dirname, 'public/Tenders/', sampleFile.name), function(err) {
    if (!err)
     {
			res.send({"status":true})
	 }
	 else
	 {
			res.send({"status":false,"error":err})
	 }
    
  })};   
 
});

app.post('/upload', function(req, res) 
{

//console.log(req.files);
  if (req.files.file)
	{
		
  	let sampleFile = req.files.file;  	
   	sampleFile.mv(path.join(__dirname, 'public/Uploaded/', sampleFile.name), function(err) {
    if (!err)
     {
			res.send({"status":true})
	 }
	 else
	 {
			res.send({"status":false,"error":err})
	 }
    
  })};   
 
});
app.get('/showDownloadables', function(req, res) 
{
var result = [];
var filePpath=path.join(__dirname, 'public/Uploaded/');
fs.readdir(filePpath, function(err, items) {    
 
    for (var i=0; i<items.length; i++) {
       result.push({"filename": items[i],"filepath":"downloadFile/"+ items[i]});
    }
	res.send(result);
});
 
});

app.get('/showTenders', function(req, res) 
{
var result = [];
var filePpath=path.join(__dirname, 'public/Tenders/');
fs.readdir(filePpath, function(err, items) {    
 
    for (var i=0; i<items.length; i++) {
       result.push({"filename": items[i],"filepath":"downloadTenders/"+ items[i]});
    }
	res.send(result);
});
 
});

app.get('/login.html',function(req,res){
	const page= path.join(__dirname, 'Public', 'login.html');

	res.sendFile(page);
	
});

app.get('/',function(req,res){
	const page= path.join(__dirname, 'Public', 'index.html');

	res.sendFile(page);
	
});

app.get('/index.html',function(req,res){
	const page= path.join(__dirname, 'Public', 'index.html');

	res.sendFile(page);
	
});

app.get('/about_us.html',function(req,res){
	const page= path.join(__dirname, 'Public', 'about_us.html');
	res.sendFile(page);
});

app.get('/faculty.html',function(req,res){
	const page= path.join(__dirname, 'Public', 'faculty.html');
	res.sendFile(page);
});
app.get('/inprogress.html',function(req,res){
	const page= path.join(__dirname, 'Public', 'inprogress.html');
	res.sendFile(page);
});
app.get('/members.html',function(req,res){
	const page= path.join(__dirname, 'Public', 'members.html');
	res.sendFile(page);
});
app.get('/photo_gallery.html',function(req,res){
	const page= path.join(__dirname, 'Public', 'photo_gallery.html');
	res.sendFile(page);
});
app.get('/pricipaldesk.html',function(req,res){
	const page= path.join(__dirname, 'Public', 'pricipaldesk.html');
	res.sendFile(page);
});

app.get('/semester.html',function(req,res){
	const page= path.join(__dirname, 'Public', 'semester.html');
	res.sendFile(page);
});
app.get('/studies.html',function(req,res){
	const page= path.join(__dirname, 'Public', 'studies.html');
	res.sendFile(page);
});
app.get('/contact_us.html',function(req,res){
	const page= path.join(__dirname, 'Public', 'contact_us.html');
	res.sendFile(page);
});
app.get('/upload.html',function(req,res){
	const page= path.join(__dirname, 'Public', 'upload.html');
	res.sendFile(page);
});
app.get('/downloads.html',function(req,res){
	const page= path.join(__dirname, 'Public', 'downloads.html');
	res.sendFile(page);
});
app.get('/tender.html',function(req,res){
	const page= path.join(__dirname, 'Public', 'tender.html');
	res.sendFile(page);
});

//console.log(__dirname+'/Public/js/');

//server.listen(port,()=>{console.log('Server running at http://127.0.0.1:'+port+'/');});
var server1 = app.listen(process.env.PORT || 5000, function () {
	var port = server1.address().port;
	console.log("Express is working on port " + port);
  });