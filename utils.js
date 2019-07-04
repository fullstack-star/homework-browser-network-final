function fetchData() {
  showLoading()
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject({msg: 'GG'})
    }, 2000)
  })
}

function loadingError() {
  errCount = 2
  loadError.style.display = 'block'  
  loading.style.display = 'none'
}

function showLoading() {
  loading.style.display = 'block'
  loadError.style.display = 'none' 
}
function showRetry(msg, duration) {
  loading.style.display = 'none'
  myToast.style.display = 'block'
  myToast.innerText = msg
  setTimeout(() => {
    myToast.style.display = 'none'
  }, duration)
}
