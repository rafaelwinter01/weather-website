console.log('Client side JS is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const weatherIcon = document.querySelector('#icon')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    messageOne.textContent = 'Loading Forecast'
    messageTwo.textContent = ''

    weatherIcon.innerHTML = ''

    const location = search.value

    const result = fetch(`/weather?address=${location}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast.weatherDegress

                if(data.forecast.weatherIcon){
                    weatherIcon.innerHTML = '<img class="icon" src="' + data.forecast.weatherIcon + '">'
                }
            }
        })
    })

})