$(function(){

  function buildHTML(message){
    if( message.image){
      var html =
       `<div class="message">
          <div class="message-source">
            <div class="message-source__user-name">
              ${message.user_name}
            </div>
            <div class="message-source__date">
              ${message.created_at}
            </div>
          </div>
          <div class="message-content">
            <p class="message-content__detail">
              ${message.body}
            </p>
            <img class="message-content__image" src=${message.image} >
          </div>
        </div>`

      return html;

    }else{
      var html = 
       `<div class="message">
          <div class="message-source">
            <div class="message-source__user-name">
              ${message.user_name}
            </div>
            <div class="message-source__date">
              ${message.created_at}
            </div>
          </div>
          <div class="message-content">
            <p class="message-content__detail">
              ${message.body}
            </p>
          </div>
        </div>`

      return html;

    };

  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('form')[0].reset();
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $(".form__submit").prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $(".form__submit").prop("disabled", false);
    });
  })
});