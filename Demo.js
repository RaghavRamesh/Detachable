const Detachable = require('./Detachable')

function fetchData(callback) {
  // Simulating API call
  setTimeout(() => {
    callback()
  }, 3000)
}

function fetchDataCallback() {
  console.log('Data fetched!')
}

const detachableFetchDataCallback = Detachable(fetchDataCallback)

console.log('Start')
fetchData(detachableFetchDataCallback.handler)
setTimeout(function() {
  // Add a slash before the next line if you wish to simulate handler cancellation
  //*
  console.log('Detaching callback')
  detachableFetchDataCallback.detach()
  //*/
}, 2000);

