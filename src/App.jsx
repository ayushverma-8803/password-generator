import { useCallback, useEffect, useState, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*(){}[]:;',./"

    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length))
    }

    setPassword(pass)
  }, [length, numberAllowed, charAllowed])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99999);
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md mx-auto p-6 bg-gray-800 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-white text-center mb-6">Password Generator</h1>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-3 bg-gray-700 text-white rounded-l-md"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md"
          >
            Copy
          </button>
        </div>
        <div className="mb-4">
          <label className="text-gray-400">Length: {length}</label>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="w-full cursor-pointer mt-2"
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </div>
        <div className="mb-4 flex items-center justify-between">
          <label className="text-gray-400 flex items-center">
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => setCharAllowed(!charAllowed)}
              className="mr-2"
            />
            Special Characters
          </label>
          <label className="text-gray-400 flex items-center">
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed(!numberAllowed)}
              className="mr-2"
            />
            Numbers
          </label>
        </div>
        <button
          onClick={passwordGenerator}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md mt-4"
        >
          Generate Password
        </button>
      </div>
    </div>
  )
}

export default App
