/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();

// Elements with IDs are available as properties of `window`.
window.estimate.addEventListener('submit', function(event){
    // Stop the browser trying to submit the form itself.
    event.preventDefault();
    t.set('card', 'shared', 'estimated', window.estimated.value)
    t.set('card', 'shared', 'consumed', window.consumed.value)
    t.closePopup();  
});

t.render(function(){
    t.get('card', 'shared', 'estimated').
    then(function(estimated){
        window.estimated.value = estimated;
    });
  return t.get('card', 'shared', 'consumed')
  .then(function(consumed){
        window.consumed.value = consumed;
  })
  .then(function(){
    t.sizeTo('#pointsForm').done();
  });
  
});