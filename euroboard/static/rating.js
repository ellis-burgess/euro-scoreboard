all_options = {};

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

function addOption(optText, optValue) {
    $('#select-question').append(`<option value="${optValue}">${optText}</option>`);
    all_options[optValue] = optText;
}

$( function() {
    if (!localStorage.getItem('name')) {
        alert('You must set your name before you can submit scores!');
        window.location.replace("http://127.0.0.1:5000/");
    }
    $( "#sortable-list" ).sortable();
    for (let i = 0; i < entries.length; i++) {
        addOption(entries[i], i + 1);
    }
});

$( function() {
    $("#add-question").click(function(){
        if($(`#sortable-list`).children().length < 10) {
            question_content = $( "#select-question option:selected" ).text();
            question_id = $( "#select-question").val();
            var new_li = $(`<li class=\"list-group-item ${question_id}\"></li>`).text(question_content);
            $("#sortable-list").append(new_li);
            new_li.append($( `<input type=\"hidden\" name=\"question\"></input>`).val(question_id));
            new_li.append($(`<span class='float-end remove-item' style='cursor: pointer;'></span>`).text('X')); 
            new_li.prepend($(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical draggable" viewBox="0 0 16 16">
            <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
          </svg>`));
            $(`#select-question option[value=${question_id}]`).remove();

            $(".remove-item").off("click").click(function() {
                let question_id = $(this).parent().attr('class').split(' ')[1]
                $('#select-question').append(`<option value="${question_id}">${all_options[question_id]}</option>`);
                $(this).parent().remove();
                if ($(`#sortable-list`).children().length < 10)
                {
                    $('#add-question-div').show();
                }
            });
        }
        if ($(`#sortable-list`).children().length == 10)
        {
            $('#add-question-div').hide();
        }
    });

    $("#submit-btn").click(function(){
        scores = [12, 10, 8, 7, 6, 5, 4, 3, 2, 1]
        $('#sortable-list').children().each(function(i) { 
            console.log(`${localStorage.getItem('name')} scores ${$(this).attr('class').split(' ')[1]} ${scores[i]} points.`);
        })
    })
});