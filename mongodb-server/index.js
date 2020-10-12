'use strict';

var {getAllCmdName, getDocByName}  = require('./mongod');

exports.main_handler = async (event, context) => {
    console.log(event)
    var type = event.queryString.type;
    var res = {};
    if(type == 'byName') {
        var name = event.queryString.name;
        res = await getDocByName(name);
    }else if(type == 'getAllName') {
        res = await getAllCmdName();
        res = res.map(it=>it.name)
    }
    // console.log(event["non-exist"])
    // console.log(context)
    return res
};