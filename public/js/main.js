/* jshint browser: true, jquery: true */
'use strict';


$(!document).ready(init);

function init () {
  hideFriendForm();
  $('#newContact').click(revealFriendForm);

  $.get('https://friendlistapp.firebaseio.com/friendlistapp.json', function(res){
     Object.keys(res).forEach(function(uuid){
     console.log('res[uuid] :', res[uuid]);
     console.log('uuid :', uuid);
     addRowToTable(uuid, res[uuid]);
     });
  });
}



var $form        = $('form'),
    $tbody       = $('tbody'),
    FIREBASE_URL = 'https://friendlistapp.firebaseio.com/friendlistapp.json';



$('#button').on('click', function (event) {
    event.preventDefault();

    var name = $('#friendName').val();
    var phone = $('#friendPhone').val();
    var twitter = $('#friendTwitter').val();
    var photo = $('#friendPhoto').val();


    var $tr = $('<tr><td>' + name + '</td><td>' + phone + '</td><td>' + twitter + '</td><td>' + photo + '</td><td>' + '<button class="removeButton">OOO Kill Em' + '</button>' + '</td>' + '</tr>');
    $tbody.append($tr);
    var data = JSON.stringify({name: name, phone: phone, twitter: twitter, photo: photo});

    $.post(FIREBASE_URL, data, function (res) {
      $tr.attr('data-uuid', res.name);

    });
   });


function addRowToTable(uuid, data) {
  console.log('data :', data);
  var $tr = $('<tr><td>' + data.name + '</td>' + '<td>' + data.phone + '</td>' + '<td>' + data.twitter + '</td>' + '<td>' + data.photo + '</td>' + '</td>' + '<td>' + '<button class="removeButton">OOO Kill Em'+ '</button>' + '<td>' + '</tr>');

  $tr.attr('data-uuid', uuid);
  $tbody.append($tr);

  $('tbody').on('click', '.removeButton', function(evt){
  var $tr = $(evt.target).closest('tr');
  $tr.remove();

  var uuid = $tr.data('uuid');
  var url = 'https://friendlistapp.firebaseio.com/friendlistapp/' + uuid + '.json';
  $.ajax(url, {type: 'DELETE'});

  });





}

function hideFriendForm () {
  var $friendForm = $('#friendForm').hide();
  return $friendForm;
}



function revealFriendForm() {
  var $friendForm = $('#friendForm').show();
  return $friendForm;


};
