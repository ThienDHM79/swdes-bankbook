'use strict';

const { application } = require("express");
function createNotice(){
    const bookNo = document.getElementById('temp-bankbookid').value;
    const amount = document.getElementById('temp-amount').value;

    let bookTypeEle = document.getElementById('temp-booktype');
    let bookTypeIndex = bookTypeEle.selectedIndex;
    let bookType = bookTypeEle.selectedOptions[0].text;

    document.getElementById('bankbookid').innerText = bookNo;
    document.getElementById('amount').innerText = amount;
    document.getElementById('booktype').innerText = bookType;
    

    // Get the current date object
    const date = new Date();
    
    // Format the date as a string
    const dateString = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');
 // Display the date on the page
    document.getElementById('current-date').innerText = dateString;
    console.log(`date is ${dateString}`);
    console.log(`amount ${amount}`);
}
function clearRequest(){
    document.getElementById('bankbookid').innerText = "";
    document.getElementById('amount').innerText = "";
    document.getElementById('booktype').innerText = "";
    document.getElementById('current-date').innerText = "";
}

async function getCustomerName(inputcmnd){
    let res = await fetch('/customer?'+ new URLSearchParams( {
        cmnd: inputcmnd
    }));
    let json = await res.json();
    document.getElementById('name').innerText = `${json.name}`;
    console.log(`ten khach la ${json.name}`);
    
}

async function getListBookbyCustomer(inputcmnd){
    let res = await fetch('/bankbook/add?'+ new URLSearchParams( {
        cmnd: inputcmnd
    }));
    let json = await res.json();

    //render table in html
    
}

//on going
async function checkMinAmount(inputamount){
    let res = await fetch('/bankbook/config?' + new URLSearchParams({
        amount: inputamount
    }));
    let json = await res.json();

    if (json){
        document.getElementById('amount-min-message').innerText =  `${json.error}`;
    }
}
    