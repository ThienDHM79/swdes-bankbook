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
    document.getElementById('show-address').innerText = `${json.address}`;
    return json;
}

async function getBookbyId(bookid){
    let res = await fetch('/bankbook?' + new URLSearchParams( {
        id: bookid
    }));
    let json = await res.json();
    return json;
}



//on going
async function checkMinAmount(inputamount){
    let res = await fetch('/bankbook/config?' + new URLSearchParams({
        amount: inputamount
    }));
    let json = await res.json();

    if (json){
        if (json.hasOwnProperty('error'))
        document.getElementById('amount-min-message').innerText =  "ERROR!";
    }
}

async function showCanAddBook(inputcmnd){
    let jsonData = await getListBookbyCustomerCMND (inputcmnd);
    let filteredData = jsonData.Bankbooks.filter( (book) => {
        return book.savetype == 'demand';
    });
    convertTable(filteredData);
    addSelect(filteredData);
}

async function getListBookbyCustomerCMND(inputcmnd){
    //get customer id
    let resCustomer = await fetch('/customer?'+ new URLSearchParams( {
       cmnd: inputcmnd
   }));
   let jsonCustomer = await resCustomer.json();
   let customerid = parseInt(jsonCustomer.id);

   //get bankbook list
   let resBookList = await fetch('/bankbook/list?',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify( {customerid})
    });
    let jsonData = await resBookList.json();
    return jsonData;
    
}

async function createAddNotice(){
    //get bookid from select
    let bookEle= document.getElementById('booktoadd');
    let bookTypeIndex = bookEle.selectedIndex;
    let bookid = bookEle.selectedOptions[0].value;
    
    //get amount
    let amount = document.getElementById('temp-amount').value;
    console.log(amount);
    //update phieu yeu cau
    document.getElementById('bankbookid').innerText = bookid;

    let selectedBook = await getBookbyId(bookid);
    document.getElementById('booktype').innerText = selectedBook.Bankbook.savetype;

    document.getElementById('customername').innerText = document.getElementById('name').innerText;
    document.getElementById('show-cmnd').innerText = document.getElementById('cmnd').value;

    let date = new Date();
    document.getElementById('updatedate').innerText = convertDateString(date);
    document.getElementById('amount').innerText = currencyFormat(parseInt(amount));

}
function convertTable(jsonData){
    //remove table body
    $('#table tbody').empty();

    //render table in html
   let table = $("#table");

   
   //loop through jsondata and create table rows
   $.each(jsonData, function(i, item){
    let tr = $("<tr>");
       
    let td1 = $("<td>");
    td1.text(item.id);
    tr.append(td1);

    let td2 = $("<td>");
    td2.text(convertDateString(item.openDate));
    tr.append(td2);

    let td3 = $("<td>");
    td3.text(currencyFormat(item.amount));
    tr.append(td3);

    
       // Get the values of the current object in the JSON data
       let vals = Object.values(item);
       
       // Loop through the values and create table cells
    //    $.each(vals, (i, elem) => {
    //       let td = $("<td>");
    //       td.text(elem); // Set the value as the text of the table cell
    //       tr.append(td); // Append the table cell to the table row
    //    });
       table.append(tr); // Append the table row to the table
    });
}
function addSelect(jsonData){
    var select = document.getElementById('booktoadd');
    //remove before add
    $('#booktoadd').empty();
    //add option
    $.each(jsonData, function(i, item){
        var option = document.createElement("option");
        option.value = item.id;
        option.text =  `${item.id} - openDate:${convertDateString(item.openDate)}`;
        select.add(option);
    });
}
function convertDateString(inputDate){

    let date = new Date(inputDate)
    
    const dateString = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');
    return dateString;
}
function currencyFormat(inputNum){
    let formatter = new Intl.NumberFormat('vn-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
    });
    return formatter.format(inputNum);
}

