const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { response } = require("express");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
     res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const Email = req.body.email;
   
  const data = {
    members: [
        {
            email_address: Email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }


        }
    ]
   };

   const jsonData = JSON.stringify(data);

   const url = "https://us21.api.mailchimp.com/3.0/lists/67d97ffb60";

   const options = {
       method: "POST",
       auth: "piyush1:516cb2c47e098d14f19a54092345d9f7-us21"

   }

   const request = https.request(url, options, function(response){
    response.on("data", function(data){
        console.log(JSON.parse(data));
        if(response.statusCode === 200){
               res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
      });


   });
   request.write(jsonData);
   request.end();


    
});

app.post("/failure", function(req, res){
    res.redirect("/");
});





app.listen(process.env.PORT || 3000, function(){
    console.log("server is running on port 3000");
});

// API-key
// 516cb2c47e098d14f19a54092345d9f7-us21

// list-id
// 67d97ffb60
