'use strict';
const BankbookService = require("../services/Bankbook.Service");

// module.exports = class Bankbook{
//     static async getAllBooks(req, res){
//         try {
//             let Bankbooks = await BankbookService.getAllBooks();
//             if(!Bankbooks){
//                 res.status(404).json("no articles");
//             }
//             res.json(Bankbook);
//         } catch (error){
//             res.status(500).json( { error: error});
//         }
//         res.locals.bankbooks = Bankbooks;
//         res.render('reportbook');
//     }
// }
let controller = {};
const models = require('../models');


controller.getAllBooks = async(req, res) => {
    const Bankbook = models.Bankbook
    const bankbooks = await Bankbook.findAll();
    console.log(bankbooks);
    res.render('reportbook', {bankbooks});
}

module.exports = controller;