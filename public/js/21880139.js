
    // Get the current date object
    const date = new Date();
        
    // Format the date as a string
    const dateString = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');
     // Display the date on the page
    document.getElementById('current-date').innerText = dateString;