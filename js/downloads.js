var url = 'https://openmaptiles.com/downloads/list.json';

ajax(url, function (data) {
  var addItem = function (container, name, url) {
    var item = document.createElement('p');
    item._name = name;
    item.className = 'pad-2 downloads-item';
    item.innerHTML = '<a href="' + url + '">' + name + '</a>' +
            '<a class="float-right" href="' + url + '">Download</a>';
    container.appendChild(item);

    if (location.href.indexOf('embed') == -1) {
      item.onclick = function (e) {
        showDialog(url);
        return false;
      };
    }
  };
  
  var worldTab = document.getElementById('tab-1');
  data.world.forEach(function (dato) {
    addItem(worldTab, dato.name, dato.link);
  });

  var countriesTab = document.getElementById('tab-2');
  data.country.forEach(function (dato) {
    addItem(countriesTab, dato.name, dato.link);
  });

  var citiesTab = document.getElementById('tab-3');
  data.city.forEach(function (dato) {
    addItem(citiesTab, dato.name, dato.link);
  });

  var countrySearch = document.getElementById('search-2');
  countrySearch.oninput = function (e) {
    var token = countrySearch.value.toLowerCase();
    [].forEach.call(countriesTab.querySelectorAll('p'), function (item) {
      item.style.display =
              item._name.toLowerCase().indexOf(token) != -1 ? '' : 'none';
    });
  };

  var citySearch = document.getElementById('search-3');
  citySearch.oninput = function (e) {
    var token = citySearch.value.toLowerCase();
    [].forEach.call(citiesTab.querySelectorAll('p'), function (item) {
      item.style.display =
              item._name.toLowerCase().indexOf(token) != -1 ? '' : 'none';
    });
  };

  document.getElementById('downloads-loading').style.display = 'none';
});

document.getElementById('btn-1').addEventListener('click', function () {
  location.hash = '';
});

document.getElementById('btn-2').addEventListener('click', function () {
  location.hash = 'country';
});

document.getElementById('btn-3').addEventListener('click', function () {
  location.hash = 'city';
});

var activeTabId = 1;
if (location.hash.substr(1) == 'country') {
  activeTabId = 2;
} else if (location.hash.substr(1) == 'city') {
  activeTabId = 3;
}
document.getElementById('btn-' + activeTabId).className += ' active';
document.getElementById('tab-' + activeTabId).className += ' active';

function showDialog(link) {
  document.getElementById('conditions-dialog-veil').style.display =
          document.getElementById('conditions-dialog').style.display =
          link ? 'block' : 'none';

  if (link) {
    document.getElementById('conditions-dialog-download-link').href = link;
    document.getElementById('conditions-dialog-download-input').value = link;
  }
}

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

new Clipboard('.copy-btn');
