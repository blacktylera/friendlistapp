/* jshint browser: true, jquery: true */
'use strict';

$(!document).ready(init);


var $form        = $('form'),
    $tbody       = $('tbody'),
    FIREBASE_URL = 'https://friendlistapp.firebaseio.com',
    fb           = new Firebase(FIREBASE_URL),
    usersFbUrl;

function init () {
  hideFriendForm();
  $('#newContact').click(revealFriendForm);
  if (fb.getAuth()) {
    $('.login').remove();
    $('.loggedIn').toggleClass('hidden');
    getUserData ();
  };
  //$.get('https://friendlistapp.firebaseio.com/.json', function(res){
     //Object.keys(res).forEach(function(uuid){
     //console.log('res[uuid] :', res[uuid]);
     //console.log('uuid :', uuid);
     //addRowToTable(uuid, res[uuid]);
     //});
  //});
}





function getUserData () {
  usersFbUrl   = FIREBASE_URL + '/users/' + fb.getAuth().uid + '/data';
  $.get(usersFbUrl + '/friendlistapp.json', function (res) {
     if (res) {
      Object.keys(res).forEach(function (uuid) {
        addRowToTable(uuid, res[uuid]);
      });
    };
  });


}

// Login

$('.login input[type="button"]').click(function(event){
  var $loginForm = $(event.target).closest('form'),
      email = $loginForm.find('[type="email"]').val(),
      pass = $loginForm.find('[type="password"]').val(),
      data = {email: email, password: pass};

  fb.createUser(data, function (err) {
        if (!err) {
            fb.authWithPassword(data, function (err) {
        if (!err) {
          location.reload(true);
        }
      });
    }
  });
});

$('.login form').submit(function(event){
  var $form = $(event.target),
      email = $form.find('[type="email"]').val(),
      pass = $form.find('[type="password"]').val();

  fb.authWithPassword({email: email, password: pass}, function(err, auth) {
        location.reload(true);
  });

  event.preventDefault();
});

$('.logout').click(function(){
  fb.unauth();
  location.reload(true);
});
    


$('#button').on('click', function (event) {
    event.preventDefault();

    var name = $('#friendName').val();
    var phone = $('#friendPhone').val();
    var twitter = $('#friendTwitter').val();
    var photo = $('#friendPhoto').val();


    var $tr = $('<tr><td>' + name + '</td><td>' + phone + '</td><td>' + twitter + '</td><td><img src=' + photo + '</td><td>' + '<button class="removeButton">OOO Kill Em' + '</button>' + '</td>' + '</tr>');
    $tbody.append($tr);
    var data = JSON.stringify({name: name, phone: phone, twitter: twitter, photo: photo});

    $.post(usersFbUrl + '/friendlistapp.json', data, function (res) {
      console.log(res);
      $tr.attr('data-uuid', res.name);

    });
   });


function addRowToTable(uuid, data) {
  console.log('data :', data);
  var $tr = $('<tr><td>' + data.name + '</td>' + '<td>' + data.phone + '</td>' + '<td>' + data.twitter + '</td>' + '<td>' + '<img src=' + data.photo + '</td>' + '</td>' + '<td>' + '<button class="removeButton">OOO Kill Em'+ '</button>' + '<td>' + '</tr>');

  $tr.attr('data-uuid', uuid);
  $tbody.append($tr);

  $('tbody').on('click', '.removeButton', function(evt){
  var $tr = $(evt.target).closest('tr');
  $tr.remove();

  var uuid = $tr.data('uuid');
  var url = usersFbUrl + '/friendlistapp.json';
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
