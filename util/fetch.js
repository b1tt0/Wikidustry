// Fetch a webpage and convert it to JSON

"use strict";

const get = require ("node-fetch");

module.exports = async (url, json = true) => {
  const res = await get (url, {
    method: "GET",
    compress: true,
    follow: 0,
    headers: {
      "Transfer-Encoding": "chunked",
      "Accept": "*/*"
    }
  });
  
  let data = "";
  switch (json) {
    case true: data = await res.json(); break;
    default: data = await res.text(); break;
  }
  
  return data;
};
