import './App.css';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost, { StyledButton } from './pages/CreatePost';
import Post from './pages/Post';

function App() {
	return (
		<div className='App'>
			<Router>
				<Navbar>
					<StyledButton to='/'>Home</StyledButton>
					<StyledButton to='/createpost'>Create post</StyledButton>
				</Navbar>
				<Switch>
					<Route path='/' exact component={Home} />
					<Route path='/createPost' exact component={CreatePost} />
					<Route path='/Post/:id' exact component={Post} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;

const Navbar = styled.nav`
	width: 100%;
	display: flex;
	justify-content: center;
	background-color: dodgerblue;
	padding: 0.5em 0;
`;
