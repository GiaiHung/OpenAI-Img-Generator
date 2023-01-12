const msg = document.querySelector('.msg')

function onSubmit(e) {
  e.preventDefault()

  const prompt = document.getElementById('prompt').value
  const num = Number(document.getElementById('num').value)

  if (!prompt) {
    alert('Please enter a text')
    return
  }

  generateImage(prompt, num)
}

async function generateImage(prompt, num) {
  try {
    showSpinner()
    const images = document.querySelector('.images')

    msg.textContent = ''
    removeAllChildNodes(images)

    const response = await fetch('/openai/generateImage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        n: num,
      }),
    })

    if (!response.ok) {
      document.querySelector('.msg').textContent = error.message
      return
    }

    const data = await response.json()

    data.data.imgUrls.forEach((obj) => {
      const image = document.createElement('img')
      image.src = obj.url
      image.classList.add('image')
      images.appendChild(image)
    })

    closeSpinner()
  } catch (error) {
    msg.textContent = error.message
    closeSpinner()
  }
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show')
}

function closeSpinner() {
  document.querySelector('.spinner').classList.remove('show')
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}

document.querySelector('#image-form').addEventListener('submit', onSubmit)
