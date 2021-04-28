console.log('Client side js file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#firstP')
const messageTwo = document.querySelector('#secondP')


function theSearch(location) {
  fetch("http://localhost:3000/weather?address=" + location)
  .then((response) => {
    response.json().then((data) => {
      
      if (data.error === null) {
        messageOne.textContent = ('')
        messageOne.textContent = ("Unable to find location")
      } else {
        messageOne.textContent = ('')
        messageTwo.textContent = ("Success! " + " --- Location: " + data.location + " --- Temp: " + data.temp)

      }
        
    })

  })}





  weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value

    if (!location) {
      return messageOne.textContent = ('No location offered')
    } else {
      messageOne.textContent = ('Loading...')
      messageTwo.textContent = ('')
      theSearch(location);
      
    }
    
  })