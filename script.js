import http from "k6/http"; 
import { sleep } from "k6"; 

let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlwIjoiMTcyLjE2LjU5LjI1MiwgMTAuNDIuMC4wIiwiY2l0eSI6bnVsbCwidGltZXpvbmUiOm51bGwsImNvdW50cnkiOm51bGwsImxhdGl0dWRlIjpudWxsLCJsb25naXR1ZGUiOm51bGwsImJyb3dzZXIiOiJDaHJvbWUiLCJicm93c2VyVmVyc2lvbiI6IjkxLjAiLCJkZXZpY2UiOiJkZXNrdG9wIiwiZGV2aWNlQnJhbmQiOm51bGwsImRldmljZU1vZGVsIjpudWxsLCJvcyI6IkdOVS9MaW51eCIsIm9zVmVyc2lvbiI6bnVsbCwidXNlcklkIjoxODY5ODI5NiwiZXhwaXJlZEF0IjoiMjAyMS0wNy0yN1QwNjo1MzoyNC41NjlaIiwiZGVsZXRlZEF0IjpudWxsLCJpZCI6MzY5MSwiY3JlYXRlZEF0IjoiMjAyMS0wNy0yN1QwNTo1MzoyNC41MjRaIiwidXBkYXRlZEF0IjoiMjAyMS0wNy0yN1QwNTo1MzoyNC41MjRaIn0sImlhdCI6MTYyNzM2NTIwNH0.imGeapxaLNAHTyfH9ymZEEPhQocLEbP7LGiXO4VrZeg";   

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
