const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

const generateImage = async (req, res) => {
  const { prompt, n } = req.body

  try {
    const response = await openai.createImage({
      prompt,
      n,
      size: '512x512',
    })

    const imgUrls = [...response.data.data]

    res.status(200).json({
      status: 'success',
      data: {
        imgUrls,
      },
    })
  } catch (error) {
    if (error.response) {
      console.log(error.response.status)
      console.log(error.response.data)
    } else {
      console.log(error.message)
    }
    res.status(400).json({
      status: 'error',
      message: 'Can not create image',
    })
  }
}

module.exports = { generateImage }
