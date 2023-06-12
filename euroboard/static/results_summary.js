let entries = JSON.parse(
  $('#entries').attr('data-entries') || "[\"Error, entries not found.\"]"
);
let scores = JSON.parse(
  $('#entries').attr('data-scores') || "[12, 10, 8, 7, 6, 5, 4, 3, 2, 1]"
);

url = 'http://dreamlo.com/lb/645fa8768f40bb7d84d59e27/json'
fetch(url).then(function(response) {
    return response.json();
  }).then(function(data) {
    $('#loading').remove();
    if (data.dreamlo.leaderboard == null) {
      $('.card-body').append(`
        <div>
          <h2 class="fs-4">
            Nobody has submitted their ratings yet...
          </h2>
        </div>
        `)
    } else {
      info = data.dreamlo.leaderboard.entry;
      console.log(info, typeof(info));
      if (info.length < 2 || info.length == undefined) {
        console.log('Short results...');
      }
    };
  }).catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
