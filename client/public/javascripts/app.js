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


function showData(arr){
    //iterate through array and show it on <div> tag
    var out = "";
    var i;
    for(i = 0; i < arr.length; i++) {
        out += '<a>' + arr[i].name + '</a><br>' + '<a>' + arr[i].sku + '</a><br>'
            + '<a>' + arr[i].price + "  CHF" +'</a><br>';
    }
    div.innerHTML = out;
}