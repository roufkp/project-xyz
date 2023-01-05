//npm install googlepi which will get from nodejs documentation from google cloud console
//install CORS 

const {google}= require('googleapis');
const keys = require('./credentials.json');
const cors = require('cors');
let ndata;


//####--------credentials for g sheet--------##3
const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
);


//&&&&&&&&-----------------server----------------------------&&&&&&&&&&&&&&&
const http = require('http');
const { parse } = require('querystring');
const { url } = require('inspector');
const hostname = '127.0.0.1';
const port = 5000;
const server = http.createServer((req, res) => {
    //const data = { key: 'rouf',name:"none" };
    //to avoid CORS errors
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
    res.setHeader('Access-Control-Allow-Headers', '*');
  
  
    
    if (req.method === 'GET') {
        //####------------------------------no authorize it and run the main function for sheet operations -------------------------#
        client.authorize(function(err,tokens){
            
            if(err){
                console.log(err);
                return;
            }else{
               //assign the value which is given by gsread()
               gsread(client).then(rdata=>{
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(rdata));
                console.log("servER running succesfully");
            })
            };
            //console.log(rdata)
        });    
      }else if(req.method === 'POST'){
       
            // handle POST request
            let body='';
            req.on('data', chunk => {
                body += chunk.toString();
              });
              req.on('end', () => {
                const fdata = JSON.parse(body);
    
                 // log the data to the console
                 //testing(fdata);
                 //cretaing a variable to take the data from the gsread()funtion.
                    //####------------------------------authorize it and run the main function for sheet operations -------------------------####
                        client.authorize(function(err,tokens){
                            if(err){
                                console.log(err);
                                return;
                            }else{
                                console.log("connected");
                                gsrun(client,fdata);
                               // rdata=gsread(client);//assign the value which is given by gsread()
                                console.log("hi") ;
                                console.log(fdata)//check the data is got from sheet
                                res.writeHead(200, { 'Content-Type': 'application/json' });
                          res.end("fdata");
                                
                            }
                           
                        });
                     
              });//console.log("fdata") 
     } else {
            res.writeHead(404);
            res.end("inside if get");
          }
        
      
    });


  //fixed part of server    
 
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
//*******************server ends here-------------------------------***********/



//check the data from the form is here or not
/*function testing(data){
    mdata=Object.values(data);
     mdata=[mdata];
    console.log(mdata);
}*/
 //####------------------------------authorize it and run the main function for sheet operations -------------------------####
                
/*client.authorize(function(err,tokens){
    if(err){
        console.log(err);
        return;
    }else{
        console.log("connected");
        gsrun(client,fdata);
       // rdata=gsread(client);//assign the value which is given by gsread()
        console.log("hi") ;
        
    }
   
});*/




//####----------------------the main function to do the things with google sheet-------------------###

async function gsrun(cl,dt){

        //create an api instance
        const gsapi =google.sheets({version:'v4',auth:cl})



        //test data
        //let newgsdata = [['sanad', 'sanad000kp@gmail.com',  '2665' ]];

        /////______________________write data to sheet give the sheet id and sheet name and range___________________________________
        //change data format
        dt=[dt];
        const gsadd = {
            spreadsheetId: '1eP8scjLfmiL8hHaRynAMkMVb0UJoHvOYEL6f02mZn-w',
            range:'sheet2!A2',
            valueInputOption: 'RAW',
            resource:{values:dt}//give the data here**********************************************
        }
        let gsdataadd = await gsapi.spreadsheets.values.append(gsadd);//set up for adding to sheet is ready
        console.log(gsdataadd.data.values);
//function gsrun end 
}








//----------------------------------gsread function()-------------------------------------
async function gsread(al){
/////______________________read data from sheet___________________________________
       //create an api instance
       const gsapird =google.sheets({version:'v4',auth:al})
        //craete an object that contains data to access the  sheet
        const gsget = {
            spreadsheetId: '1eP8scjLfmiL8hHaRynAMkMVb0UJoHvOYEL6f02mZn-w',
            range:'sheet1!A2:c5',
        }

        // access the sheet using the above object and api object and store it
        let gsdatard = await gsapird.spreadsheets.values.get(gsget);//use the object to do the needfull
        //console.log(gsdatard.data.values);//the data is accessible right noww use it according to our need
        let rdata = gsdatard.data.values; 
        //rdata=10;
       // console.log(rdata)
                                  let object={};
                                    for(let i =0;i<rdata.length;i++){
                                        let ndata = rdata[i];
                                        //console.log("thisis",ndata);
                                        object = ndata.reduce((acc, cur, index) => {
                                            acc[`name${index + 1}`] = cur;
                                            return acc;
                                        }, {});
                                        
                                        /*for(let j=0;j<i;j++){
                                            nmdata=ndata[j];
                                            console.log("nmdataa",nmdata);
                                            
                                        }*/
                                       
                                        console.log("inside for loop",object);
                                        
                                    };
          console.log("outside for loop");
          console.log(rdata)
          return object;

}