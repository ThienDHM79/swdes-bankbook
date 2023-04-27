'use strict';

const models = require("../models");

module.exports = class ConfigService{
    static async checkMinInput(input){
        const  min = 100000;
        if (parseInt(input) < parseInt(min)){
            throw new Error(`so tien GD nho hon toi thieu la ${min}`);
        }
    }
}