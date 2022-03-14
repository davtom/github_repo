let i = 0;
var nHTML = '';
var textTable = document.getElementById("text_table");

$(document).ready(function() {

    $('#compare').on('click', function() {
        let username1 = document.getElementById('user').value;
        let i = 0;

        $.ajax({
            url: 'https://api.github.com/users/'+username1+'?callback=testUser&access_token=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',
            url: 'https://api.github.com/users/'+username1+'/repos?per_page=100000',

        }).done(function (repos) {
            nHTML = '';

            for (i = 0; i < repos.length; i++) {
                nHTML += '<tr><td><a href="'+repos[i].html_url+'">'+repos[i].name+'</a></td>';

                if (repos[i].fork === false) {
                    nHTML += '<td>nie</td>';

                    $.ajax({
                        url: 'https://api.github.com/users/'+username1+'?callback=testUser&access_token=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',
                        url: repos[i].contributors_url,

                    }).done(function (contrFalse) {
                        nHTML += '<td>'+contrFalse.length+'</td></tr>';

                    });
                } else if (repos[i].fork === true) {
                    nHTML += '<td><a>tak</a></td>';

                    $.ajax({
                        url: 'https://api.github.com/users/'+username1+'?callback=testUser&access_token=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',
                        url: repos[i].contributors_url,
    
                    }).done(function (contrTrue) {
                        nHTML += '<td>'+contrTrue.length+'</td></tr>';
    
                    });
                }
                textTable.innerHTML = nHTML;
            }
        });
    });
});