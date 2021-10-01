import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
const FileDownload = require('js-file-download');

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%'
	},
	backButton: {
		marginRight: theme.spacing(1)
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1)
	}
}));

export default function FileUploader() {
	const classes = useStyles();
	const [ file, setFile ] = React.useState('');
	const [ filename, setFilename ] = React.useState('Choose File');
	const [ downloadFile, setDownloadFile ] = React.useState('');
	var res;

	const onChange = (e) => {
		setFile(e.target.files[0]);
		setFilename(e.target.files[0].name);
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('json', file);
		try {
			res = await axios.post('http://127.0.0.1:5000/single/jsonToCSV/file', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
			console.log(res);
			if (res.status === 200) {
				setDownloadFile(res.data);
			}

			// setUploadFile({filename, filePath})
		} catch (err) {
			// if (err.res.code === 500) {
			// 	console.log('There was a problem with the server');
			// } else {
			// 	console.log(err.res.data.msg);
			// }
			console.log(err);
		}
	};

	function downloadCsv() {
		FileDownload(downloadFile, 'data.csv');
	}

	return (
		<div className={classes.root}>
			<Fragment>
				<form onSubmit={onSubmit}>
					<div className="custom-file mb-4">
						<input type="file" className="custom-file-input" id="customFile" onChange={onChange} />
						<label className="custom-file-label" htmlFor="customFile">
							{filename}
						</label>
					</div>
					<input type="submit" value="Upload" className="btn btn-primary btn-block mt-4" />
				</form>
				&nbsp; &nbsp;
				<button onClick={downloadCsv}>Download CSV</button>
			</Fragment>
		</div>
	);
}
