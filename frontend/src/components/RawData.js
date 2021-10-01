import React, { Fragment, useState } from 'react';
import axios from 'axios';
const FileDownload = require('js-file-download');

export default function RawData() {
	const [ rawJSONFile, setDownloadRawJSON ] = useState('');

	const onSubmit = async (e) => {
		e.preventDefault();
		console.log(e.target.value);
		try {
			const res = await axios.post('http://127.0.0.1:5000/single/jsonToCSV/data', {
				headers: {
					'Content-Type': 'application/json'
				}
			});
			console.log(res);
			if (res.status === 200) {
				setDownloadRawJSON(res.data);
			}
		} catch (err) {
			console.log(err);
		}
	};
	function rawJSON() {
		FileDownload(rawJSONFile, 'rawJSON.csv');
	}
	return (
		<div>
			<Fragment>
				<form onSubmit={onSubmit}>
					<input type="text" className="form-control" placeholder="Enter raw json" /> <br />
					<input type="submit" value="Upload" className="btn btn-primary" />
				</form>
				<button onClick={rawJSON}>Download Raw JSON to CSV</button>
			</Fragment>
		</div>
	);
}
