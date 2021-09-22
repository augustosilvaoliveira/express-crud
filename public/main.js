const update = document.querySelector('#update-button')

update.addEventListener('click', _ => {
  fetch('/quotes', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chave: 1
      name: 'Darth Vadar',
      quote: 'I find your lack of faith disturbing.'
    })
  })
})