const sql = require("mssql");
const fs = require("fs");


const config = {
    user: "sa",
    password: "ndc2022005",
    server: "localhost",
    database: "SWP391_Test7",
    options: {
        trustServerCertificate: true
    }
};


async function exportDB() {
    await sql.connect(config);


    const tables = await sql.query(`
        SELECT TABLE_NAME
        FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE_TYPE='BASE TABLE'
    `);


    let result = {};


    for (let table of tables.recordset) {
        let name = table.TABLE_NAME;
        let data = await sql.query(`SELECT * FROM ${name}`);
        result[name] = data.recordset;
    }


    fs.writeFileSync("db.json", JSON.stringify(result, null, 2));


    console.log("Export done!");
}


exportDB();
