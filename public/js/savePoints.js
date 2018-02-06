/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();

// Elements with IDs are available as properties of `window`.
window.pointsForm.addEventListener('submit', function(event){
    // Stop the browser trying to submit the form itself.
    event.preventDefault();    
    return t.set('card', 'shared', 'agilePoints', {estimated: window.estimated.value, consumed:window.consumed.value})
    .then(function(){
        t.closePopup();  
    });    
});

t.render(function(){
  return t.get('card', 'shared', 'agilePoints')
  .then(function(data){
        window.estimated.value = data.estimated;
        window.consumed.value = data.consumed;
  })
  .then(function(){
    t.sizeTo('#pointsForm').done();
  });

});