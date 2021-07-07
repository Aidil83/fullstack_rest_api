import { Link } from 'react-router-dom';
import styled from 'styled-components';
import '../App.css';
const CreatePost = ({ history }) => {
	return (
		<div className='App'>
			<StyledButton onClick={() => history.goBack()}>Back</StyledButton>
			<div></div>
		</div>
	);
};

export default CreatePost;

export const StyledButton = styled(Link)`
	margin: 0 1em;
	cursor: pointer;
	background-color: lightgrey;
	padding: 0.7em;
	border: 2px solid gray;
	text-decoration: none;
	color: black;
	transition: 0.2s;
	&:hover {
		background-color: yellow;
		transition: 0.2s;
		border: 2px solid yellow;
	}
`;
