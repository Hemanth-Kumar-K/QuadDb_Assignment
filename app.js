const express=require('express');
const path=require('path');

const {open}=require('sqlite');
const sqlite3=require('sqlite3');

const app=express();

const dbpath=path.join(__dirname,"hodlinfo.db");

let db=null;
const initializedbAndServer= async()=>{
    try{
        db=await open({
            filename:dbpath,
            driver:sqlite3.Database,
        });
        await createTable();
        app.listen(3000,()=>{
            console.log('Server is running on 3000 port');
        });
    }
    catch(e){
        console.log(`DB Error: ${e.message}`);
        process.exit(1);
    }
}
createTable= async()=>{
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS tickers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            last REAL,
            buy REAL,
            sell REAL,
            volume REAL,
            base_unit TEXT
        )
    `;
    await db.run(createTableQuery);
}

getdata=async()=>{
    let response= await fetch('https://api.wazirx.com/api/v2/tickers');
    let data=await response.json();
    return Object.values(data).slice(0,10);
}

initializedbAndServer();

storedata= async(data)=>{
    const deletequery=`DELETE from tickers`;
    const resetSeqQuery = `DELETE FROM sqlite_sequence WHERE name='tickers'`;
   const insertquery=`INSERT INTO tickers (name, last, buy, sell, volume, base_unit) 
            VALUES (?, ?, ?, ?, ?, ?)`;

    try{
        await db.run(deletequery);
        await db.run(resetSeqQuery);
    for(let ticker of data){
        const {name,last,buy,sell,volume,base_unit}=ticker;
        const dbresp=await db.run(insertquery,name,last,buy,sell,volume,base_unit);
    }
    console.log('Inserted Successfully');
    }catch(e){
        console.log(`Error in inserting :${e.message}`);
    }
   
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async(req,res)=>{
    const data=await getdata();
    storedata(data);
    res.sendFile(path.join(__dirname,'public', 'index.html'));
})

app.get('/tickers', async (req, res) => {
    try {
        const getTickersQuery = `SELECT * FROM tickers`;
        const tickers = await db.all(getTickersQuery);
        res.json(tickers);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});