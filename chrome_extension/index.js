$(document).ready(function () {

    $('.ui.accordion').accordion();

    $("#button").on('click', function (event) {
        chrome.browserAction.onClicked.addListener(function (activeTab) {
            var newURL = "http://stackoverflow.com/";
            chrome.tabs.create({url: newURL});
        });
    });

    $.ajax({
        url: 'http://127.0.0.1:5000/api/',
        dataType: 'json',
        success: function (records) {
            for (var menu in records) {
                var html = "";
                html += '<div class="title"><i class="dropdown icon"></i>' + menu + '</div>';
                html += '<div class="content">';
                for (var submenu in records[menu]) {
                    html += '<div class="accordion">';
                    html += '<div class="title"><i class="dropdown icon"></i>' + submenu + '</div>';
                    html += '<div class="content">';
                    for (var item in records[menu][submenu]) {
                        html += '<div class="content"><a href="' + records[menu][submenu][item].url + '" target="_blank">' + records[menu][submenu][item].action + '</a></div>'
                    }
                    html += '</div>'
                }
                html += '</div>';
                $("#menu").append(html);
            }
        },
        error: function (data) {
            $("#menu").append("There are no records.");
        }
    });
});
