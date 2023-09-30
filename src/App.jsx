import { useState, useEffect } from 'react'
import downloadImg from './assets/download.svg'

const App = () => {
  const [text, setText] = useState('Made with ❤️')
  const [qrImage, setQrImage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(text)
    await fetchQr()
  }

  const fetchQr = async () => {
    try {
      const response = await fetch(
        `http://api.qrserver.com/v1/create-qr-code/?data=${text}&size=250x250`,
        {
          mode: 'cors',
        }
      )
      const dataURL = await response.blob()
      const imageUrl = URL.createObjectURL(dataURL)
      setQrImage(imageUrl)
    } catch (error) {
      console.error('Error fetching QR code:', error)
    }
  }

  useEffect(() => {
    fetchQr()
  }, [])

  return (
    <>
      {/* CONTAINER  */}
      <div className='flex justify-center items-center min-h-screen bg-gray-100'>
        {/* CARD */}
        <div className='p-5 bg-white rounded-lg shadow-lg'>
          <form onSubmit={handleSubmit}>
            <input
              className='p-2 mr-2 rounded-lg'
              type='text'
              placeholder='Input your text here...'
              onChange={(e) => setText(e.target.value)}
            />
            <button
              className='text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
              type='submit'
            >
              Add
            </button>
          </form>
          <div className='flex flex-col justify-center mt-5'>
            {/* QR IMAGE */}
            <img
              src={qrImage}
              alt='QR CODE'
            />
            {/* DOWNLOAD BUTTON */}
            <a
              className='flex justify-center mt-5'
              href={qrImage}
              download={`QR-CODE_${text}`}
            >
              Save Image
              <img
                src={downloadImg}
                alt='download image'
                width={20}
                height={20}
                className='ml-2'
              />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
