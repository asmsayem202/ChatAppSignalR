/// <reference path="../lib/microsoft/signalr/dist/browser/signalr.js" />

'use strict';


var username = prompt("enter your name");

var hubBuilder = new signalR.HubConnectionBuilder();
var connection = hubBuilder.withUrl("/chathub").withAutomaticReconnect().build();




connection.on("msgRcv", function (user, message) {
    var li = document.createElement("li");

    li.innerHTML = `<b>${user}</b> : <i>${message}</i>`;
    /*li.textContent = `${user} : ${message}`;*/

    $('#chatLog').append(li);


});

connection.on("imgRcv", function (user, imgData) {

    var img = document.createElement('img');

    img.src = imgData;
    var li = document.createElement('li');
    var br = document.createElement('br');
    li.innerHTML = `<b>${user}</b>`;
    /* li.append(user);*/
    li.appendChild(br);
    li.appendChild(img);
    $('#chatLog').append(li);

});




connection.start();


$('#btnSend').on('click', function () {

    var message = $('#txtInput').val();

    connection.invoke("ShareText", username, message);
    $('#txtInput').val(null);
})



$('#userFile').on('change', async (e) => {
    // Get a reference to the file
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.connection.invoke("ShareImage", username, reader.result);
    };

    $('#userFile').val('');
});

