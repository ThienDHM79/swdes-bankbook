'use strict';

const { application } = require("express");
    function createNotice(){
        const bookNo = document.getElementById('temp-bankbookid').innerText().trim();
        const amount = document.getElementById('temp-amount').innerText().trim();
        const bookType = document.getElementById('temp-booktype').innerText().trim();

        document.getElementById('bankbookid').innerText = bookNo;
        document.getElementById('amount').innerText = amount;
        document.getElementById('booktype').innerText = bookType;
        document.getElementById('current-date').innerText = dateString;
        // Get the current date object
        const date = new Date();
        
        // Format the date as a string
        const dateString = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');
     // Display the date on the page
        console.log("updated request to form");
    }