$(document).ready(function(){

  $('.ui.accordion').accordion();

  $.ajax({
  url: 'http://127.0.0.1:5000/api/',
  dataType: 'json',
  success: function(records) {
    for(menu in records){
      var html = "";
      html += '<div class="title"><i class="dropdown icon"></i>'+ menu +'</div>'
      html += '<div class="content">'
      for (submenu in records[menu]){
        html += '<div class="accordion">'
        html += '<div class="title"><i class="dropdown icon"></i>'+ submenu +'</div>'
        html += '<div class="content">'
        for (item in records[menu][submenu]){
          html += '<div class="content"><a href="' + records[menu][submenu][item].url + '">' +  records[menu][submenu][item].action + '</a></div>'
        }
        html += '</div>'
      }
      html += '</div>';
      $("#menu").append(html);
    }
  },
  error: function(data){
    $("#menu").append("There are no records.");
  }
});
})
