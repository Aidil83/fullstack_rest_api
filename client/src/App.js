import './App.css';
import { Container } from './pages/Home';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Link,
	useHistory,
} from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';

function App() {
	const history = useHistory();
	return (
		<div className='App'>
			<Router>
				<Switch>
					<Route path='/' exact component={Home} />
					<Route path='/createPost' exact component={CreatePost} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
