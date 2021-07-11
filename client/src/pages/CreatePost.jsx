import { Link } from 'react-router-dom';
import styled from 'styled-components';
import '../App.css';
import TextField from '@material-ui/core/TextField';
import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';

let validationSchema = yup.object().shape({
	title: yup.string().required('You must input a Title!'),
	postText: yup.string().required(),
	username: yup.string().min(3).max(15).required(),
});

const CreatePost = ({ history }) => {
	const initialValues = {
		title: '',
		postText: '',
		username: '',
	};

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<div className='App'>
			<StyledButton onClick={() => history.goBack()}>Back</StyledButton>
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={validationSchema}>
				{({ values, handleChange, handleBlur }) => (
					<StyledForm>
						<ErrorMessage
							name='title'
							component='span'
							style={{ color: 'red' }}
						/>
						<TextField
							name='title'
							label='Title'
							value={values.title}
							onChange={handleChange}
							variant='outlined'
						/>
						<ErrorMessage
							name='postText'
							component='span'
							style={{ color: 'red' }}
						/>
						<TextField
							name='postText'
							label='Post Text'
							value={values.postText}
							onChange={handleChange}
							variant='outlined'
						/>
						<ErrorMessage
							name='username'
							component='span'
							style={{ color: 'red' }}
						/>
						<TextField
							name='username'
							label='Username'
							value={values.username}
							onChange={handleChange}
							variant='outlined'
						/>
						<button type='submit'>Create Post</button>
					</StyledForm>
				)}
			</Formik>
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

const StyledForm = styled(Form)`
	width: 500px;
	height: 400px;
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 8px;
	margin: 1em;
	box-shadow: 1px 1px 3px 3px rgb(0 0 0 / 10%);
	padding: 3em;
	& .MuiFormControl-root {
		width: 100%;
		margin: 0.8em 0;
	}
	& button {
		padding: 1em;
		margin-top: 1.5em;
		cursor: pointer;
	}
`;
