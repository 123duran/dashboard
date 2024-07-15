function getRSSFeed()
{
    rssFeedUrl = $('#feed-input').val();

    $.ajax({
        url: rssFeedUrl,
        dataType: 'xml',
        success: function(data){
           
            var items = $(data).find('item');
            var maxItems = Math.min(items.length, 5); // Limit to a maximum of 5 items

            for (var i = 0; i < maxItems; i++) {
                var title = $(items[i]).find('title').text();
                var link = $(items[i]).find('link').text();
                var pubDate = $(items[i]).find('pubDate').text();
                var enclosureUrl = $(items[i]).find('enclosure').attr('url');

                var itemHTML = '<div class="rss-item">';
                itemHTML += '<h3><a href="' + link + '" target="_blank">' + title + '</a></h3>';
                itemHTML += '<p>Publicado em: ' + pubDate + '</p>';
                itemHTML += '<audio controls><source src="' + enclosureUrl + '" type="audio/mpeg"></audio>';
                itemHTML += '</div>';

                $('#rss-container').append(itemHTML);
            }
        },
        error: function(){
            console.log('Erro ao carregar o feed RSS.');
        }
    });
}

function fillInputs(){
    $('#feed-input').val( "https://anchor.fm/s/e692ad4c/podcast/rss" );        
    $('#episodes-input').val(5);        
}


$(document).ready(function() {
    fillInputs();
});