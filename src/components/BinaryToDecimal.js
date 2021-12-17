import { useState } from 'react';

function BinaryToDecimal() {

	const [binary, setBinary] = useState("");
	const [resultToDecimal, setResultToDecimal] = useState(0);

	const handleSubmitBinary = (e) => {
		let bin;
		e.preventDefault();

		bin = e.target[0].value;

		setResultToDecimal(parseInt(bin, 2));
	}

	return (
		<div className='converter-container'>
			<form onSubmit={handleSubmitBinary}>
				<label htmlFor='binary' id='binary' name='binary'>Binary:</label>
				<input type='text' name='binary'
					value={binary}
					onChange={e => setBinary(e.target.value)}
				 />
			</form>
			{resultToDecimal}
		</div>
	)
}

export default BinaryToDecimal