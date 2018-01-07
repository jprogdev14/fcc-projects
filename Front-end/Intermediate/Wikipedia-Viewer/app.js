$(function() {
  $("#search-page").hide();
});

//Get DOM
var mainSearchInput = document.getElementById("main-search-input");
var searchPageInput = document.getElementById("search-page-input");
var mainSearchBtn = document.getElementById("main-search-submit");
var mainRandomBtn = document.getElementById("main-random-submit");
var searchPageEl = document.getElementById("search-page-body");

//Setup Variables
var cors_anywhere = "https://cors-anywhere.herokuapp.com/";
var wiki_url = "https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&generator=prefixsearch&gpssearch=";
var search_extension = "&gpslimit=20&prop=pageimages|pageterms&piprop=thumbnail&pithumbsize=50&pilimit=10&redirects=&wbptterms=description"
var wiki_search_url = "http://en.wikipedia.org/?curid="
var random_url = "https://en.wikipedia.org/wiki/Special:Random";

const FULL_SEARCH_MAIN = 0;
const FULL_SEARCH_2 = 1
const LUCKY_SEARCH = 2;

//Search Wiki Info
function searchWiki(type) {
  if(type === FULL_SEARCH_MAIN || type === LUCKY_SEARCH) {
    var search_url = cors_anywhere + wiki_url + capitalizeSearch(mainSearchInput.value) + search_extension;
  } else if(type === FULL_SEARCH_2){
    var search_url = cors_anywhere + wiki_url + capitalizeSearch(searchPageInput.value) + search_extension;
  }

  searchPageEl.innerHTML = "";

  $.getJSON(search_url, function(data) {
    if(type === LUCKY_SEARCH) {
      var id = data.query.pages[0].pageid;
      var full_link = wiki_search_url + id;
      openPage(full_link);
    }

    if(type === FULL_SEARCH_MAIN || type === FULL_SEARCH_2) {
      var pages = data.query.pages;
      var id = "", title = "", desc = "";

      var num = 0;
      for(var i = 0; i < pages.length; i++) {
        id = pages[i].pageid;
        title = pages[i].title;
        num = i + 1;

        if(pages[i].terms !== undefined) {
          desc = pages[i].terms.description;
        } else {
          desc = "No information available";
        }

        var a = document.createElement("a");
        a.href = wiki_search_url + id;
        a.setAttribute("target", "_blank");
        a.innerHTML = num + ". " + title;

        var titleEl = document.createElement("h4");
        titleEl.appendChild(a);
        var descEl = document.createElement("p");
        descEl.innerHTML = desc;

        var searchBoxEl = document.createElement("div");
        searchBoxEl.className = "search-box";
        searchBoxEl.appendChild(titleEl);
        searchBoxEl.appendChild(descEl);

        searchPageEl.appendChild(searchBoxEl);

      }

      var searchNumEl = document.createElement("p");
      searchNumEl.setAttribute("id", "search-num");
      
      var results = num > 1 ? " results" : " result";
      searchNumEl.innerHTML = "Displaying " + num + results;
      searchPageEl.appendChild(searchNumEl);

      if(type === FULL_SEARCH_MAIN) {
        $("#main-search").fadeOut("slow", function() {
          $("#search-page").fadeIn("slow");
        });
      }
    }
  });
}

//Each starting letter of a search must be capitilized otherwise the search won't work
function capitalizeSearch(text) {
  var search = "";
  var lowerCase = text.toLowerCase();
  var arr = lowerCase.split(" ");

  console.log(arr);
  for(var i = 0; i < arr.length; i++) {
    search = search + arr[i].charAt(0).toUpperCase() + arr[i].slice(1) + " ";
  }

  console.log(search);
  return search;
}

//Open Page
function openPage(url) {
  window.open(url);
}
