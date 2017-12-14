const unirest_prom = (unirest_req) => {  
  return new Promise((resolve, reject) => {    
    unirest_req.end(r => {      
      // ((always_resolve === true || (r.status >= 200 && r.status < 300)) ? resolve(r) : reject(r));   
      if (r.status >= 200 && r.status < 300) {
        console.log(r.body);
        resolve(r);
      } else {
        console.log(r);
        reject(r);
      } 
    });  
  });
}

module.exports = unirest_prom;