var url = '/js/downloads.json';

ajax(url, function (data) {
  var worldHtml = '';
  data['world'].forEach(function (dato) {
    worldHtml += getItem(dato['filename'], dato['url'])
  })
  document.getElementById('tab-1').innerHTML = worldHtml;


  var coutriesHtml = '';
  data['country'].forEach(function (dato) {
    coutriesHtml += getItem(dato['filename'], dato['url'])
  })
  document.getElementById('tab-2').innerHTML = coutriesHtml;


  var citiesHtml = '';
  data['city'].forEach(function (dato) {
    citiesHtml += getItem(dato['filename'], dato['url'])
  })
  document.getElementById('tab-3').innerHTML = citiesHtml;

  function getItem(name, url) {
    return '<p class="pad-2 downloads-item"><a href="' + url + '">' + name
            + '</a><a class="float-right" href="' + url + '">download</a></p>'
  }
});


function ajax(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      callback(JSON.parse(this.responseText));
    }
  };
  xhr.open('GET', url, true);
  xhr.send();
}