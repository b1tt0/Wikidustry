// Fetch a webpage and convert it to JSON

"use strict";

const get = require ("node-fetch");

module.exports = async url => {
  const res = await get (url, {
    method: "GET",
    compress: true,
    follow: 0,
    headers: {
      "Transfer-Encoding": "chunked",
      "Content-Type": "application/json",
      "Accept": "*/*"
    }
  });
  return await res.json();
};