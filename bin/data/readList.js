#!/usr/bin/env node


const fs = require('fs');
let string = "";
const reader = () => fs.readfile('./data/tops.json', function (err, data) {
    string = data;
    fs.close();
});

const jsonned = JSON.parse(string);
