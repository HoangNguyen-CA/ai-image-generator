const { query } = require("../services/postgres");
const fs = require("fs");
const path = require("path");

const sql = fs.readFileSync(path.join(__dirname, "init.sql")).toString();

async function init() {
  await query(sql);
  console.log("DONE");
}

init();
