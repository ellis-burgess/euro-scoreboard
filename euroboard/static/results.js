entries = [
    'Austria: Who The Hell Is Edgar?',
    'Portugal: Ai Coração',
    'Switzerland: Watergun',
    'Poland: Solo',
    'Serbia: Samo Mi Se Spava',
    'France: Évidemment',
    'Cyprus: Break A Broken Heart',
    'Spain: EAEA',
    'Sweden: Tattoo',
    'Albania: Duje',
    'Italy: Due Vite',
    'Estonia: Bridges',
    'Finland: Cha Cha Cha',
    'Czechia: My Sister\'s Crown',
    'Australia: Promise',
    'Belgium: Because Of You',
    'Armenia: Future Lover',
    'Moldova: Soarele si Luna',
    'Ukraine: Heart of Steel',
    'Norway: Queen of Kings',
    'Germany: Blood & Glitter',
    'Lithuania: Stay',
    'Israel: Unicorn',
    'Slovenia: Carpe Diem',
    'Croatia: ŠĆ!',
    'United Kingdom: I Wrote A Song'
    ];

scores = [12, 10, 8, 7, 6, 5, 4, 3, 2, 1];

url = 'http://dreamlo.com/lb/645fa8768f40bb7d84d59e27/json'
fetch(url).then(function(response) {
    return response.json();
  }).then(function(data) {
    info = data.dreamlo.leaderboard.entry;
    displayResults(info);
    console.log(info, typeof(info));
  }).catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

function displayResults(results) {
  for (let result of results) {
    console.log(result);
    text_arr = result.text;
    text_arr = text_arr.split('_');
    this_scores = [entries[result.score], entries[result.seconds]];
    for (let i = 0; i < text_arr.length; i++) {
      this_scores.push(entries[text_arr[i]]);
    }
    $('.card-body').append(`
        <div>
          <h1>${result.name}'s Ratings:</h1>
          <h2>Douze Points to ${this_scores[0]}</h2>
          <div id=${result.name}_results>
            <h3>Remaining Points</h3>
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
