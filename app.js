var request = require('request');
const fs = require("fs"); 
request('https://explorer.epiccash.com/epic_explorer/v1/blockchain_kernel/getpeers', function(error, response, body){
    const resps = JSON.parse(body);
    const dataJson = resps.response.dataJson;
    console.log(dataJson.length);
    if (dataJson.length > 0) {
        fs.readFile("./src/assets/geojson.json", function(err, data) { 
            const users = JSON.parse(data);
            
        for (let i = 0; i < dataJson.length; i++) {
            var ddd = [];
            const getIP = dataJson[i].addr.split(':')[0];
            request(`https://api.ipgeolocationapi.com/geolocate/${getIP}`, function(error, response, bodyresp){
                const ipResp = JSON.parse(bodyresp);
                const ipLatitude = ipResp.geo.latitude;
                const ipLongitude = ipResp.geo.longitude;

                if (err) throw err; 
                // Converting to JSON 

                let user = {
                        "longitude": ipLongitude,
                        "latitude": ipLatitude
                }
                
                ddd.push(user);  
                users.locations = ddd;
                 fs.writeFile("./src/assets/geojson.json", JSON.stringify(users), err => { 
                    // Checking for errors 
                    if (err) throw err;  
                    }); 
          });
          
        }
    });
    }
    
});
