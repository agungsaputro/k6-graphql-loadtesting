import http from "k6/http"; 
import { sleep } from "k6"; 

let accessToken = "";   

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '1m',
  
    thresholds: {
      http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
  };

export default function() { 
  let query = `
    mutation {
        signInUser(
        email: "fhamaad@jobstoknow.com",
        password: "password123456"
        ){
        access_token
        }
    }
  `;
  
  let headers = {   
    'Authorization': `Bearer ${accessToken}`,   
    "Content-Type": "application/json"  
  };    

  let res = http.post("https://api-sia-dev.ut.ac.id/backend-sia/public/graphql", 
    JSON.stringify({ query: query }),   
    {headers: headers}  
  );    

  sleep(0.3);   
};
