'use strict';

const models = require("../models");

module.exports = class ConfigService{
    static async checkMinInput(input){
        const  min = 100000;
        if (parseInt(input) < parseInt(min)){
            throw new Error(`so tien GD nho hon toi thieu la ${min}`);
        }
    }
    static async getAllSaveType(){
        try{
            let savetypes = await models.SaveConfig.findAll();
            return savetypes;
        } catch (error){
            console.log(`could not fetch ${error}`);
        }
    }
    static async getSaveTypebyName(name){
        try{
            let savetype = await models.SaveConfig.findOne({
                where: {
                    savetype: name
                }
            });
            return savetype;
        } catch(error){
            console.log(`could not fetch savetype ${error}`);
        }
    }
}