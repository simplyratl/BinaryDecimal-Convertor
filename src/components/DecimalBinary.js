import { useState } from 'react'
import './style/convertor.css'

function DecimalBinary() {
	const [decimal, setDecimal] = useState("")
	const [resultToBinary, setResultToBinary] = useState(0);
	const [typeNumberFrom, setTypeNumberFrom] = useState("decimal");
	const [typeNumberTo, setTypeNumberTo] = useState("binary");

	const handleSubmitDecimal = (e) => {
		e.preventDefault();
		let dec = parseInt(e.target[2].value);

		setResultToBinary(dec.toString(2));
	}

	const enterXNumberFrom = (e) => {
		e.preventDefault();

		setTypeNumberFrom(e.target.selectedOptions[0].value);
	}

	const enterXNumberTo = (e) => {
		e.preventDefault();

		setTypeNumberTo(e.target.selectedOptions[0].value);
	}

	function returnConversion(){

		if(typeNumberFrom === "decimal" && typeNumberTo === "binary"){
			return results;
		}
	}


	return (
		<div className='converter-container'>
			<div className='navigation-mac'>
				<div className='dot red'></div>
				<div className='dot yellow'></div>
				<div className='dot green'></div>
			</div>

			<form onSubmit={handleSubmitDecimal}>
				<div className='row fromto'>
					<div className='column from'>
						<label htmlFor='from'>From</label>
						<select id='from' onChange={e => enterXNumberFrom(e)}>
							<option value='decimal'>Decimal</option>
							<option value='binary'>Binary</option>
							<option value='hexadecimal'>Hexadecimal</option>
						</select>
					</div>


					<div className='column to'>
						<label htmlFor='to'>To</label>
							<select id='to' onChange={e => enterXNumberTo(e)}>
								<option value='binary'>Binary</option>
							<option value='decimal'>Decimal</option>
							<option value='hexadecimal'>Hexadecimal</option>
							</select>
						</div>
				</div>

				<div className='row'>
					<div className='column'>
						<label htmlFor='decimal'>Enter a {typeNumberFrom} number:</label>
						<input type='text' id='decimal' 
							value={decimal}
							onChange={e => setDecimal(e.target.value)}
						/>
					</div>
				</div>

				<div className='row'>
					<div className='column'>
						<label htmlFor='result'>
							Result to {typeNumberTo}:
						</label>

						<div className='result'>
							<p>{returnConversion}</p>
						</div>
					</div>
				</div>
			</form>
		</div>
	)
}

export default DecimalBinary