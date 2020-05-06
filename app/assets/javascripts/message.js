$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="message">
          <div class="message__message-top">
            <div class="message__message-top--name">
              ${message.user_name}
            </div>
            <div class="message__message-top--created-at">
              ${message.created_at}
            </div>
          </div>
          <div class="message__text">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
      `<div class="message">
      <div class="message__message-top">
        <div class="message__message-top--name">
          ${message.user_name}
        </div>
        <div class="message__message-top--created-at">
          ${message.created_at}
        </div>
      </div>
      <div class="message__text">
        <p class="lower-message__content">
          ${message.content}
        </p>
      </div>
    </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
    var formData = new FormData(this);
    var url = $(this).attr('action');
    e.preventDefault()
    $.ajax({
      url: url, 
      type: 'POST',
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.send-form').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  });
});