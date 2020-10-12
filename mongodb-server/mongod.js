
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://yinlei:yl13795950539@cluster0.qsgox.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority";

async function getAllCmdName() {
    const client = new MongoClient(uri, {useNewUrlParser: true});
    await client.connect();
    const cmd = client.db('test').collection('linux-cmd');
    res = await cmd.find({}, {projection: {'_id':0,name: 1}}).toArray();
    client.close();
    return res;
}

async function getDocByName(name) {
    const client = new MongoClient(uri, {useNewUrlParser: true});
    await client.connect();
    const cmd = client.db('test').collection('linux-cmd');
    res = await cmd.findOne({name});
    client.close();
    return res;
}

async function test() {
    console.log('测试查询所有数据')
    var res1 = await getAllCmdName();
    console.log(res1)
    console.log('测试根据名称查询')
    var res2 = await getDocByName('ls');
    console.log(res2)
}

// test();
module.exports = {getAllCmdName, getDocByName}

// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//     if(!err) {
//         console.log('连接成功!')
//     }
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     collection.insertOne({"devId": 1, "name": "一号设备"},function(err) {
//         if(!err) {
//             console.log('插入成功')
//         }
//     })
//     client.close();
// });
