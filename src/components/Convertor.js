import { useState, useRef } from 'react';
import './style/convertor.css';

function DecimalBinary() {
    const [decimal, setDecimal] = useState('');
    const [result, setResult] = useState(0);
    const [typeNumberFrom, setTypeNumberFrom] = useState('decimal');
    const [typeNumberTo, setTypeNumberTo] = useState('binary');
    const [copySuccess, setCopySuccess] = useState('');

    //Submiting form

    const handleSubmit = (e) => {
        e.preventDefault();

        if ((typeNumberFrom === 'decimal') & (typeNumberTo === 'binary')) {
            let dec = parseInt(e.target[2].value);
            setResult(dec.toString(2));
        } else if ((typeNumberFrom === 'decimal') & (typeNumberTo === 'hexadecimal')) {
            let dec = parseInt(e.target[2].value);
            setResult(dec.toString(16).toUpperCase());
        } else if ((typeNumberFrom === 'binary') & (typeNumberTo === 'decimal')) {
            let bin = e.target[2].value;
            setResult(parseInt(bin, 2));
        } else if ((typeNumberFrom === 'binary') & (typeNumberTo === 'hexadecimal')) {
            let bin = e.target[2].value;
            setResult(parseInt(bin, 2).toString(16).toUpperCase());
        } else if ((typeNumberFrom === 'hexadecimal') & (typeNumberTo === 'decimal')) {
            let hex = e.target[2].value;
            setResult(parseInt(hex, 16));
        } else if ((typeNumberFrom === 'hexadecimal') & (typeNumberTo === 'binary')) {
            let hex = e.target[2].value;
            setResult(parseInt(hex, 16).toString(2));
        }
    };

    //Swap button function

    const handleSwap = (e) => {
        e.preventDefault();

        setTypeNumberFrom(typeNumberTo);
        setTypeNumberTo(typeNumberFrom);
    };

    //Enter input from

    const enterXNumberFrom = (e) => {
        e.preventDefault();

        setTypeNumberFrom(e.target.selectedOptions[0].value);
    };

    //Enter input to

    const enterXNumberTo = (e) => {
        e.preventDefault();

        setTypeNumberTo(e.target.selectedOptions[0].value);
    };

    //Copy button

    const inputRef = useRef(null);

    const handleCopy = (e) => {
        // inputRef.current.select();
        document.execCommand('copy');
        e.target.focus();
        setCopySuccess('Copied!');

        setTimeout(() => {
            setCopySuccess('');
        }, 2000);
    };

    const copyFunction = () => {
        if (result !== null && result !== undefined && result !== NaN) {
            navigator.clipboard.writeText(result);
        }
    };

    function showBubble() {
        if (copySuccess.length > 0) {
            return 'copy-success show';
        } else {
            return 'copy-success';
        }
    }

    function everyForthCharacter() {
        let forth = result;

        if (forth.length <= 4) {
            console.log('less than 4');
            while (forth.length < 4) forth = '0' + forth;
            return forth;
        }

        while (forth.length < 8) forth = '0' + forth;

        return forth.replace(/\d{4}(?=.)/g, '$& ');
    }

    function eightBits() {
        if (result === 0 && result >= 8) {
            return null;
        }

        let zeros = result.toString();

        while (zeros.length < 8) zeros = '0' + zeros;
        return zeros;
    }

    return (
        <div className='converter-container'>
            <div className='navigation-mac'>
                <div className='dot red'></div>
                <div className='dot yellow'></div>
                <div className='dot green'></div>
            </div>

            <form onSubmit={handleSubmit} autoComplete='off'>
                <div className='row fromto'>
                    <div className='column from'>
                        <label htmlFor='from'>From</label>
                        <select value={typeNumberFrom} id='from' onChange={(e) => enterXNumberFrom(e)}>
                            <option value='decimal'>Decimal</option>
                            <option value='binary' selected='select'>
                                Binary
                            </option>
                            <option value='hexadecimal'>Hexadecimal</option>
                        </select>
                    </div>

                    <div className='column to'>
                        <label htmlFor='to'>To</label>
                        <select value={typeNumberTo} id='to' onChange={(e) => enterXNumberTo(e)}>
                            <option value='binary'>Binary</option>
                            <option value='decimal'>Decimal</option>
                            <option value='hexadecimal'>Hexadecimal</option>
                        </select>
                    </div>
                </div>

                <div className='row'>
                    <div className='column'>
                        <label htmlFor='decimal'>Enter a {typeNumberFrom} number:</label>

                        <div className='inputForm'>
                            <input
                                type='text'
                                id='decimal'
                                value={decimal}
                                onChange={(e) => setDecimal(e.target.value)}
                                inputMode='numeric'
                                // ref={inputRef}
                            />

                            <div className='tooltip'>
                                <i
                                    className='fa-solid fa-copy'
                                    onClick={(e) => {
                                        handleCopy(e);
                                        copyFunction();
                                    }}
                                ></i>
                                <span className='tooltiptext'>Copy result.</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='columns'>
                        <button type='submit' className='convert' onSubmit={handleSubmit}>
                            Convert
                        </button>
                        <button type='button' className='swap' onClick={handleSwap}>
                            Swap
                        </button>
                    </div>
                </div>

                <div className='row'>
                    <div className='column'>
                        {typeNumberFrom === 'binary' ? (
                            <p className='length'>Length: {decimal.length}</p>
                        ) : null}
                    </div>
                </div>

                <div className='row'>
                    <div className='column'>
                        <label htmlFor='result'>Result to {typeNumberTo}:</label>

                        <div className='result'>
                            <p>{isNaN(result) ? 'Error, probably using unsupported numbers.' : result}</p>
                        </div>

                        <div className='length-result'>
                            {result.length !== undefined ? (
                                <p>{typeNumberTo === 'binary' ? `Length: ${result.length}` : null}</p>
                            ) : null}
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='column' style={{ marginTop: '40px' }}>
                        {result.length !== undefined ? (
                            <h2 className='header-help'>Group by 4 digits.</h2>
                        ) : null}

                        {result.length !== undefined ? (
                            <div className='writing-help'>{everyForthCharacter()}</div>
                        ) : null}
                    </div>
                </div>

                <div className='row'>
                    <div className='columns'>
                        {result.length !== undefined ? (
                            <h2 className='header-help'>In case 8 bits missing.</h2>
                        ) : null}

                        {result.length !== undefined ? <h2 className='eightBits'>{eightBits()}</h2> : null}
                        {result.length >= 8 ? 'It has 8 bits or more. No 0 added.' : null}
                    </div>
                </div>
            </form>

            <div className={showBubble()}>
                <h1>{copySuccess}</h1>
            </div>
        </div>
    );
}

export default DecimalBinary;
