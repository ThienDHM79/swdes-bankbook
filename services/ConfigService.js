'use strict';

const models = require("../models");

module.exports = class ConfigService{
    //khong lay argument la savetype. gia dinh ko xoa savetype
    static async checkMinInput(input){
        try{
            const  config = await models.SaveConfig.findOne({
                where: {
                    id : 1
                }
            });
            if (config){
                if (parseInt(input) < parseInt( config.minInput))
                {
                    throw new Error(`so tien giao dich toi thieu nho hon ${config.minInput}`);
                }
            }
            return config;
        } catch (error){
            throw new Error(`${error}`);
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