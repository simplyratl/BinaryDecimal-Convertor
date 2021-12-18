import { useState } from 'react';
import './style/convertor.css';

function DecimalBinary() {
    const [decimal, setDecimal] = useState('');
    const [result, setResult] = useState(0);
    const [openLanguage, setOpenLanguage] = useState(false);
    const [typeNumberFrom, setTypeNumberFrom] = useState('decimal');
    const [typeNumberTo, setTypeNumberTo] = useState('binary');

    const handleSubmit = (e) => {
        e.preventDefault();

        if ((typeNumberFrom === 'decimal') & (typeNumberTo === 'binary')) {
            let dec = parseInt(e.target[4].value);
            setResult(dec.toString(2));
        } else if ((typeNumberFrom === 'decimal') & (typeNumberTo === 'hexadecimal')) {
            let dec = parseInt(e.target[4].value);
            setResult(dec.toString(16).toUpperCase());
        } else if ((typeNumberFrom === 'binary') & (typeNumberTo === 'decimal')) {
            let bin = e.target[4].value;
            setResult(parseInt(bin, 2));
        } else if ((typeNumberFrom === 'binary') & (typeNumberTo === 'hexadecimal')) {
            let bin = e.target[4].value;
            setResult(parseInt(bin, 2).toString(16).toUpperCase());
        } else if ((typeNumberFrom === 'hexadecimal') & (typeNumberTo === 'decimal')) {
            let hex = e.target[4].value;
            setResult(parseInt(hex, 16));
        } else if ((typeNumberFrom === 'hexadecimal') & (typeNumberTo === 'binary')) {
            let hex = e.target[4].value;
            setResult(parseInt(hex, 16).toString(2));
        }
    };

    const handleSwap = (e) => {
        e.preventDefault();

        setTypeNumberFrom(typeNumberTo);
        setTypeNumberTo(typeNumberFrom);
    };

    const enterXNumberFrom = (e) => {
        e.preventDefault();

        setTypeNumberFrom(e.target.selectedOptions[0].value);
    };

    const enterXNumberTo = (e) => {
        e.preventDefault();

        setTypeNumberTo(e.target.selectedOptions[0].value);
    };

    const languageStyle = () => {
        if (openLanguage) {
            return 'language balkan show';
        } else {
            return 'language balkan';
        }
    };

    return (
        <div className='converter-container'>
            <div className='navigation-mac'>
                <div className='dot red'></div>
                <div className='dot yellow'></div>
                <div className='dot green'></div>
            </div>

            <div className='language'>
                <p>EN</p>
            </div>

            <div className={languageStyle()}>
                <p>BLKN</p>
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
                        <label htmlFor='decimal'>Enter a {typeNumberFrom} number:</label>
                        <input
                            type='text'
                            id='decimal'
                            value={decimal}
                            onChange={(e) => setDecimal(e.target.value)}
                        />
                    </div>
                </div>

                <div className='row'>
                    <div className='column'>
                        <label htmlFor='result'>Result to {typeNumberTo}:</label>

                        <div className='result'>
                            <p>{isNaN(result) ? 'Error, probably using unsupported numbers.' : result}</p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default DecimalBinary;
