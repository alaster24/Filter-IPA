'use strict';

let div = document.getElementById('results');

function loadData(url, cfunc) {
    //Get data from the url
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', url, true);
    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            let myArr = JSON.parse(xmlhttp.responseText);
            cfunc(myArr);
        } else if (xmlhttp.status == 404) {
            alert("There's a 404 error..");
        }
    };
    console.log("data shown");
    xmlhttp.send();
}


function showData(arr) {
    //iterate through array and show it on <div> tag
    let out = '<tr><th>Produktname</th><th>SKU</th><th>Bildlink</th><th>Preis</th>';
    let splitUrlLink = "";
    if (arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            splitUrlLink = searchForComma(arr[i].imageurl);
            out += '</tr>'
                + '<tr><td>' + arr[i].name + '</td>'
                + '<td>' + arr[i].sku + '</td>'
                + '<td><img src=' + splitUrlLink + ' alt="Produktbild" id="produktbild"></td>'
                + '<td>' + arr[i].price + "  CHF" + '</td></tr>';
            div.innerHTML = out;
        }
    } else if(arr.length == 0){
        div.innerHTML = '<h1>Keine Resultate</h1>';
    } else{
        div.innerHTML = '<h1>Ups, da ist was schief gelaufen...</h1>';
    }

}

function searchForComma(inputString) {
    let splitString = "";
    if (inputString.indexOf(',') > -1) {
        splitString = inputString.split(",");
        return splitString[0];
    }
    return inputString;
}