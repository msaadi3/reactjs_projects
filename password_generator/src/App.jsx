import { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  const [length, setLength] = useState(7);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordGenerator = useCallback(() => {
    let str = '';
    let pass = '';
    str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numberAllowed) {
      str += '0123456789';
    }

    if (charAllowed) {
      str += '!@#$%&*()-_=+}{[]|;:/?.,';
    }

    for (let i = 1; i <= length; i++) {
      let index = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(index);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed]);

  const ref = useRef(null);
  const copyToClipboard = () => {
    ref.current?.select();

    window.navigator.clipboard.writeText(password);
  };
  return (
    <>
      <div className='container'>
        <p className='heading'>Password Generator</p>
        <div className='password-container'>
          <input
            ref={ref}
            readOnly
            className='password'
            type='text'
            placeholder='Password'
            value={password}
          />
          <p className='copy' onClick={copyToClipboard}>
            Copy
          </p>
        </div>

        <div className='bottom-container'>
          <label htmlFor='range'>Length: {length}</label>
          <input
            value={length}
            type='range'
            min={7}
            max={30}
            id='range'
            onChange={(e) => setLength(e.target.value)}
          />

          <label htmlFor='numbers'>Numbers</label>
          <input
            type='checkbox'
            id='numbers'
            defaultChecked={numberAllowed}
            onClick={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />

          <label htmlFor='chars'>Characters</label>
          <input
            type='checkbox'
            id='chars'
            defaultChecked={charAllowed}
            onClick={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default App;
