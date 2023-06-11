let entries = JSON.parse($('#entries').attr('data-entries') || "[\"Error, entries not found.\"]");
let scores = JSON.parse($('#entries').attr('data-scores') || "[12, 10, 8, 7, 6, 5, 4, 3, 2, 1]");

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
      } else {
        displayResults(info);
      }
    };
  }).catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

function displayResults(results) {
  for (let result of results) {
    text_arr = result.text;
    text_arr = text_arr.split('_');
    this_scores = [entries[result.score], entries[result.seconds]];
    for (let i = 0; i < text_arr.length; i++) {
      this_scores.push(entries[text_arr[i]]);
    }
    $('.card-body').append(`
        <div>
          <h2 class="fs-4">${result.name}'s Ratings:</h2>
          <h3 class="fs-5">Douze Points to ${this_scores[0]}</h2>
          <div class="card-body" id=${result.name}_results>
            <h4 class="fs-5">Remaining Points</h3>
          </div>
        </div>
      `);
    for (let i = 1; i < scores.length; i++) {
      $(`#${result.name}_results`).append(`
          <p>${scores[i]} point(s) to ${this_scores[i]}</p>
        `)
    }
  };
};
