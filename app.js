const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const { spawn } = require('child_process');



app=express();
app.use(express.json());

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
 res.sendFile("/index.html");
});
app.get("/index.html",function(req,res){
    res.sendFile("/index.html");
   });
app.get("/signup.html",function(req,res){
    res.sendFile(__dirname+"/signup.html");
   });

app.get("/extractive.html",function(req,res){
    res.sendFile(__dirname+"/extractive.html");
   });
app.get("/abstractive.html",function(req,res){
    res.sendFile(__dirname+"/abstractive.html");
   });
  


app.post("/signup.html",function(req,res){
const Fname=req.body.fname;
const Lname=req.body.lname;
const Email=req.body.email;

 var data={
    members:[
        {
            email_address:Email,
            status:"subscribed",
            merge_fields:{
                FnameLNAME:Fname,
                LNAME:Lname,
                EMAIL:Email
            }

        }
    ]
 };

const jsondata=JSON.stringify(data);
const url=" https://us8.api.mailchimp.com/3.0/lists/dc8aaa77a5";
//-d '{"name":"","contact":{"company":"","address1":"","address2":"","city":"","state":"","zip":"","country":"","phone":""},"permission_reminder":"","use_archive_bar":false,"campaign_defaults":{"from_name":"","from_email":"","subject":"","language":""},"notify_on_subscribe":"","notify_on_unsubscribe":"","email_type_option":false,"double_optin":false,"marketing_permissions":false}'

const options={
    method:"POST",
    auth:"GAGAN:5f3ff73b9ea5cf4bb5a67398b8c88430-us8"
}


const request=https.request(url,options,function(response){

    if(response.statusCode==200){
        res.sendFile(__dirname+"/success.html")
    }else{
        res.sendFile(__dirname+"/failure.html")
    }
  response.on("data",function(data){
    console.log(JSON.parse(data));
  });
});

request.write(jsondata);
request.end();

});


app.post('/calculate_extractive_summary', (req, res) => {
  // Extract data from the request body
  

  const title=req.body.argument1;
const numOfLines=req.body.argument2;
const text=req.body.argument3;





  // Perform processing or execute Python code using the received data
  

  const pythonProcess = spawn('python', ['gagan.py', title,numOfLines,text]);

  let outputData = '';

  pythonProcess.stdout.on('data', (data) => {
    outputData += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python script error: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python script exited with code ${code}`);
      res.json({ result: outputData });
    
    
  });

  
  
});



app.post('/calculate_abstractive_summary', (req, res) => {
  // Extract data from the request body
  

  
const numOfWords=req.body.argument1;
const text=req.body.argument2;





  // Perform processing or execute Python code using the received data
  

  const pythonProcess = spawn('python', ['abstractive.py',numOfWords,text]);

  let outputData = '';

  pythonProcess.stdout.on('data', (data) => {
    outputData += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python script error: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python script exited with code ${code}`);
      res.json({ result: outputData });
    
    
  });

  
  
});



 


// app.listen(3000,function(req,res){
//   console.log("server is running on port 3000");
// });












  



//5f3ff73b9ea5cf4bb5a67398b8c88430-us8
// dc8aaa77a5









