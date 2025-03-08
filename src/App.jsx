import { useState } from 'react'

function App() {
  const [inputValue, setInputValue] = useState('')
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-blue-600">React Input Demo</h1>
          </div>
        </div>
      </header>
      
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Input Example</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Your Input
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type something..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
          
          {inputValue && (
            <div className="mt-6 p-4 bg-blue-50 rounded-md">
              <p className="font-medium">You typed:</p>
              <p className="mt-1 break-words">{inputValue}</p>
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center">
            <p className="text-gray-500 text-sm">
              Designed by WebSparks AI &copy; {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
