var streamersEl = document.getElementById("streamers");

function createStreamerElements(info) {
  var title_img = document.createElement("img");
  title_img.setAttribute("src", info[0][0]);
  var title_h3 = document.createElement("h3");
  title_h3.innerHTML = info[0][1];
  title_h3.onclick = function() {
      openPage("https://twitch.tv/" + info[0][1]);
  }

  var title_el = document.createElement("div");
  title_el.setAttribute("class", "title");
  title_el.appendChild(title_img);
  title_el.appendChild(title_h3)

  var status_circle = document.createElement("div");
  status_circle.setAttribute("class", info[1][0]);
  var status_p = document.createElement("p");
  status_p.innerHTML = info[1][1];
  var status_el = document.createElement("div");
  status_el.setAttribute("class", "status");
  status_el.appendChild(status_p);
  status_el.appendChild(status_circle);

  var info_p = document.createElement("p");
  info_p.innerHTML = info[2][0];
  var streaming_p = document.createElement("p");
  streaming_p.innerHTML = info[2][1];
  var info_el = document.createElement("div");
  info_el.setAttribute("class", "info");
  info_el.appendChild(streaming_p);
  info_el.appendChild(info_p);

  var preview_img = document.createElement("img");
  preview_img.setAttribute("src", info[3][0]);
  var preview_el = document.createElement("div");
  preview_el.setAttribute("class", "preview");
  preview_el.appendChild(preview_img);

  var stream_box_el = document.createElement("div");
  stream_box_el.setAttribute("class", "stream-box");
  stream_box_el.appendChild(title_el);
  stream_box_el.appendChild(status_el);
  stream_box_el.appendChild(info_el);
  stream_box_el.appendChild(preview_el);

  streamersEl.appendChild(stream_box_el);
}

var users = ["wesarby", "aegabriel", "freecodecamp", "thehousehold",
            "brunofin", "lirik", "kdstudios", "comster404"];

var api_url = "https://wind-bow.gomix.me/twitch-api/";
var users_url = "users/"
var streams_url = "streams/"
var callback_url = "?callback=?";

function loadStreamers() {
  var tempUsers = []
  for(var i = 0; i < users.length; i++) {
    var user_link = api_url + users_url + users[i] + callback_url;

    $.getJSON(user_link, function(user_data) {
      var title = "", logo = "", bio = "", status = "", info_stream = "", preview_img = "";
      user_name = "";
      var user_exists = false;

      console.log(user_data);
      if(user_data.name !== undefined) {
        title = user_data.name;
        logo = user_data.logo;
        bio = user_data.bio;
        user_name = user_data.name;
        user_exists = true;

      } else {
        user_name = user_data.message.substr(6);
        user_name = user_name.includes('" was not found') ? user_name.replace('" was not found', "") : user_name.replace('" is unavailable', "");

        title = user_name;
        logo = "thumbnail.png";
        bio = user_data.message;
        status = "offline-circle";
        info_stream = "Error";
        preview_img = "thumbnail2.png";
        user_exists = false;
      }

      var stream_link = api_url + streams_url + user_name + callback_url;

      $.getJSON(stream_link, function(stream_data) {
        if(user_exists) {
          if(stream_data.stream !== null) {
            status = "online-circle";
            info_stream = stream_data.stream.game;
            preview_img = stream_data.stream.preview.medium;
          } else {
            status = "offline-circle";
            info_stream = "User is offline";
            preview_img = "thumbnail2.png";
          }
        }

        var element_data = [[logo, title], [status, "Status:"], [bio, info_stream], [preview_img]];

        createStreamerElements(element_data);
      });

    });
  }
}

loadStreamers();
