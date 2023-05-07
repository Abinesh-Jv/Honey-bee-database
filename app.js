const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Abinesh-Jv:Abi938587@cluster0.i9vmc4d.mongodb.net/honeyBeesDB');

app.use(bodyParser.urlencoded({extended:true}));
app.use("public",express.static('public'));
app.use(express.static('public'));
// app.use("/public",express.static('./public'));
app.set("view engine","ejs");

const seperatorSchema = {
  date:String,
  mainBox:String,
  secBox:String,
  queenBox:String,
  babyQueen:String,
  mainBoxPlace:String,
  secondBoxPlace:String,
  mainBoxCombs:String,
  secondBoxCombs:String,
  comments:String
};

const checkingSchema = {
  date:String,
  box:String,
  sugar:String,
  combs:String,
  queen:String,
  place:String,
  queenAge:String,
  comments:String,
};

const Seperation = mongoose.model('seperation',seperatorSchema);
const Checking = mongoose.model('checking',checkingSchema);


const testingItems = {
  date:"88-88-8888",
  mainBox:'1',
  secBox:'2',
  queen:'2',
  babyQueen:'Yes',
  mainBoxPlace:"Vilai",
  secondBoxPlace:"kottagam",
  mainBoxCombs:"4.5",
  secondBoxCombs:"1.5",
  comments:"nothing"

};
const test = new Seperation(testingItems);

// test.save();

inputs = [];
checkInputs = [];

app.get("/",(req,res)=>{
    Seperation.find()
    .then((elements)=>{
      res.render("seperation",{inputs:elements})
    })
    .catch(err=>{console.log(err);});
    // res.render("table",{inputs:inputs})
});

app.get("/mobile",(req,res)=>{
  Seperation.find()
  .then((elements)=>{
    res.render("mobileSeperation",{inputs:elements})
  })
  .catch(err=>{console.log(err);});
  // res.render("table",{inputs:inputs})
});

app.get("/mobile/checking",(req,res)=>{
  Checking.find()
  .then((elements)=>{
    res.render("mobileChecking",{inputs:elements})
  })
  .catch(err=>{console.log(err);});
  // res.render("table",{inputs:inputs})
});

app.get("/check",(req,res)=>{
  Checking.find()
    .then((elements)=>{
      res.render("checking",{inputs:elements})
    })
    .catch(err=>{console.log(err);});
});

function isNumeric(value) {
    return /^\d+$/.test(value);
} 

function textFold(input, lineSize) {
    const output = []
    let outputCharCount = 0
    let outputCharsInCurrentLine = 0
    for (var i = 0; i < input.length; i++) {
      const inputChar = input[i]
      output[outputCharCount++] = inputChar
      if (inputChar === '\n') {
        outputCharsInCurrentLine = 0
      } else if (outputCharsInCurrentLine > lineSize-2) {
        output[outputCharCount++] = '\n'
        outputCharsInCurrentLine = 0
      } else {
        outputCharsInCurrentLine++
      }
    }
    return output.join('')
  }


app.post("/",(req,res)=>{
    allinputs=req.body;
    checker = false
    if(allinputs.comments === ''){
      allinputs.comments = 'nothing';
    }
    if (allinputs.babyQueen === "on") {
        allinputs.babyQueen = "Yes";
    }
    else{
        allinputs.babyQueen = "No";
    }
    dateStatus = allinputs.date==="";
    mainBoxStatus = allinputs.mainBox==="" || !isNumeric(allinputs.mainBox);
    secBoxStatus = allinputs.secBox==="" || !isNumeric(allinputs.secBox);
    queenBoxStatus = allinputs.queenBox==="" || !isNumeric(allinputs.queenBox);
    if (dateStatus||mainBoxStatus||secBoxStatus||queenBoxStatus) {
        checker = true;
    }
    allinputs.comments = textFold(allinputs.comments,20);
    if(!checker){
        const dbItem = new Seperation(allinputs);
        dbItem.save();
        
    }
    
    res.redirect("/")
});

app.post("/check",(req,res)=>{
  allinputs = req.body;
  checker = false;
  
  dateStatus = allinputs.date==="";
  boxStatus = allinputs.box===''|| !isNumeric(allinputs.box)
  if(allinputs.comments === ''){
    allinputs.comments = 'nothing';
  }
  if(allinputs.queenAge === ''){
    allinputs.queenAge = 'unknown';
  }
  if(dateStatus||boxStatus){
    checker = true;
  }
  if(allinputs.queen === 'on'){
    allinputs.queen = "Yes";
  }
  else{
    allinputs.queen = 'No'}
  if(allinputs.sugar === 'on'){
    allinputs.sugar = "Yes";
  }
  else{
    allinputs.sugar = 'No';
  }
  allinputs.comments = textFold(allinputs.comments,20);
  if(!checker){
    const dbItem = new Checking(allinputs);
    dbItem.save();
  }

  res.redirect('/check');
});

app.post("/mobile",(req,res)=>{
  allinputs=req.body;
  checker = false
  if(allinputs.comments === ''){
    allinputs.comments = 'nothing';
  }
  if (allinputs.babyQueen === "on") {
      allinputs.babyQueen = "Yes";
  }
  else{
      allinputs.babyQueen = "No";
  }
  dateStatus = allinputs.date==="";
  mainBoxStatus = allinputs.mainBox==="" || !isNumeric(allinputs.mainBox);
  secBoxStatus = allinputs.secBox==="" || !isNumeric(allinputs.secBox);
  queenBoxStatus = allinputs.queenBox==="" || !isNumeric(allinputs.queenBox);
  if (dateStatus||mainBoxStatus||secBoxStatus||queenBoxStatus) {
      checker = true;
  }
  allinputs.comments = textFold(allinputs.comments,20);
  if(!checker){
      const dbItem = new Seperation(allinputs);
      dbItem.save();
      
  }
  
  res.redirect("/mobile");
});

app.post("/mobile/checking",(req,res)=>{
allinputs = req.body;
checker = false;

dateStatus = allinputs.date==="";
boxStatus = allinputs.box===''|| !isNumeric(allinputs.box)
if(allinputs.comments === ''){
  allinputs.comments = 'nothing';
}
if(allinputs.queenAge === ''){
  allinputs.queenAge = 'unknown';
}
if(dateStatus||boxStatus){
  checker = true;
}
if(allinputs.queen === 'on'){
  allinputs.queen = "Yes";
}
else{
  allinputs.queen = 'No'}
if(allinputs.sugar === 'on'){
  allinputs.sugar = "Yes";
}
else{
  allinputs.sugar = 'No';
}
allinputs.comments = textFold(allinputs.comments,20);
if(!checker){
  const dbItem = new Checking(allinputs);
  dbItem.save();
}

res.redirect('/mobile/checking');
});

const port = process.env.PORT ||3000;

app.listen(port,()=>{console.log("Server is Running on Port "+ port);});