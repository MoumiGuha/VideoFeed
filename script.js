var dd;

$(document).ready(function () {
    const key = 'AIzaSyD-81RzXfy_UcIgUPlOwK4EWDB_ZZEem3k';
    const playlistId = 'PLlYsrzDvIU9Rl3KTGvX2tPr6yBwPPjaH0';
    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';

    var options = {
        part: 'snippet',
        key: key,
        maxResults: 25,
        playlistId: playlistId
    };

    loadVideos();

    function loadVideos() {
        $.getJSON(URL, options, function (data) {
            console.log(data);
            dd = data;

            var id = data.items[0].snippet.resourceId.videoId;

            mainVideo(id);

            resultsLoop(data);
        });
    }

    function mainVideo(id) {
        var str = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        
        

        $('#video').html(str);

    }

    function resultsLoop(data) {
        $.each(data.items, function (i, item) {
            var thumb = item.snippet.thumbnails.medium.url;

            var title = item.snippet.title;

            var description = item.snippet.description.substring(0, 100);

            var vid = item.snippet.resourceId.videoId;



            var article = `<article class="item" data-key="${vid}">
                <img src="${thumb}" alt="thumbnail" class="thumb">
                
                <div class="details">
                    <h4>${title}</h4>
                    <p>${description}</p>
                </div>
                
            </article>`;

            $('main').append(article);
        });


    }

    $('main').on('click', 'article', function () {
        var id = $(this).attr('data-key');
        mainVideo(id);
    });




});
