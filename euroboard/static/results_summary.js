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
      $('#result-display').append(`
        <div>
          <h2 class="fs-4">
            Nobody has submitted their ratings yet...
          </h2>
        </div>
        `)
    } else {
      info = data.dreamlo.leaderboard.entry;
      console.log(info);
      let totalResults = totalResultsPerCountry(info);
      console.log(totalResults);
      if (totalResults != 0) {
        displayResults(totalResults);
      }
    };
  }).catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

function totalResultsPerCountry(results) {
  // Create array of two arrays: entries and scores
  let resultArray = [entries, new Array(entries.length).fill(0)];
  let valid_answers = 0

  // Add each set of results to totals
  if (results.length == undefined) {
    // if results.name ends with "-UN"
    if ((results.name).endsWith("-UN")) {
      $('#result-display').append(`
        <div>
          <h2 class="fs-4">
            Nobody has submitted their ratings yet...
          </h2>
        </div>
      `)
      return 0
    }
    resultArray = addUserToCountryResults(results, resultArray)
  } else {
    for (let result of results) {
      let name = result['name'];
      if (!(name.endsWith("-UN"))) {
        resultArray = addUserToCountryResults(result, resultArray);
        valid_answers += 1;
      }
    }
  }
  if (valid_answers > 0) {
    return resultArray;
  }
  return valid_answers;
}

function addUserToCountryResults(result, resultArray) {
  text_arr = result.text;
  text_arr = text_arr.split('_');
  this_scores = [result.score, result.seconds];

  for (let i = 0; i < text_arr.length; i++) {
    this_scores.push(text_arr[i]);
  }

  // this_scores contains index of countries receiving points in desc. order

  for (let i = 0; i < this_scores.length; i++) {
    resultArray[1][this_scores[i]] += scores[i];
  }

  return resultArray;
}

function displayResults(totalResults) {
  totalResults = sortTwoArrays(totalResults);
  $("#result-display").append(`
    <ol id="list-results">
    </ol>
    `)
  for (let i = 0; i < totalResults[0].length; i++) {
    $("#list-results").append(`
      <li>
        ${totalResults[1][i]} Points: ${totalResults[0][i]}
      </li>
      `);
  }
}

function sortTwoArrays(arrays) {
  for (let i = 0; i < arrays[0].length - 1; i++) {
    for (let j = 0; j < (arrays[0].length - i - 1); j++) {
      if (arrays[1][j] < arrays[1][j + 1]) {
        let smaller = arrays[1][j];
        let smaller_alt = arrays[0][j];
        let larger = arrays[1][j + 1];
        let larger_alt = arrays[0][j + 1];
        arrays[1][j + 1] = smaller;
        arrays[1][j] = larger;
        arrays[0][j + 1] = smaller_alt;
        arrays[0][j] = larger_alt;
      }
    }
  }
  return arrays;
}
