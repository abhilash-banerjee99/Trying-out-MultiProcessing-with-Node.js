//import logo from './logo.svg';
import FileUploader from '../src/components/FileUpload';
import RawData from './components/RawData';
import './App.css';

function App() {
	return (
		<div className="App mt-4">
			{/* <p>Hello World!</p> */}
			<FileUploader /> <br />
			<RawData />
		</div>
	);
}

export default App;
