'use strict';

let div = document.getElementById('results');
//let button = document.getElementById('querybutton1');

//button.addEventListener('click', loadData('/api/products/longerthan100'), showData);

function loadData(url, cfunc) {
    //Get data from the url
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', url, true);
    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            let myArr = JSON.parse(xmlhttp.responseText);
            cfunc(myArr);
        }
    };
    xmlhttp.send();
}


function showData(arr) {
    //iterate through array and show it on <div> tag
    let out = '<tr><th>Produktname</th><th>SKU</th><th>Bildlink</th><th>Preis</th>';
    let i;
    let splitUrlLink = "";
    for (i = 0; i < arr.length; i++) {
        splitUrlLink = searchForComma(arr[i].imageurl);
        out += '</tr>' + '<tr><td>' + arr[i].name + '</td>' + '<td>' + arr[i].sku + '</td>'
            + '<td><img src=' + splitUrlLink + ' alt="Produktbild" id="produktbild" onclick="pictureZoom()"></td>'
            + '<td>' + arr[i].price + "  CHF" + '</td></tr>';
        div.innerHTML = out;
    }
}

function searchForComma(inputString){
    let splitString = "";
    if(inputString.indexOf(',') > -1){
        splitString = inputString.split(",");
        return splitString[0];
    }
    return inputString;
}

function pictureZoom(){
    let img = document.getElementById('produktbild');
    let width = image.width;
    let height = image.height;
    img.style.width = "100%";
    img.style.height = "100%";

}