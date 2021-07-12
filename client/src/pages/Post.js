import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import { StyledButton } from './CreatePost';
import styled from 'styled-components/macro';
import { useState } from 'react';
import { Button } from '@material-ui/core';

const Post = ({ history }) => {
	let { id } = useParams();
	const [newComment, setNewComment] = useState('');

	/* ----------------------------- Get Posts data ----------------------------- */
	const getPosts = async () => {
		// I'm destructuring data and returning it so that I can avoid writing data.data
		const { data } = await axios.get(`http://localhost:3001/posts/byId/${id}`);
		return data;
	};

	// First parameter can be named anything and second parameter is the function. Renamed data to avoid naming conflict.
	const { data: dataPost, isLoading: isLoadingPost } = useQuery(
		'PostsId',
		getPosts
	);
	/* ---------------------------- Get comments data --------------------------- */
	const getComments = async () => {
		const { data } = await axios.get(`http://localhost:3001/comments/${id}`);
		return data;
	};

	const { data: dataComments } = useQuery('Comments', getComments);
	/* -------------------------------------------------------------------------- */
	const addComment = () => {
		axios
			.post('http://localhost:3001/comments', {
				commentBody: newComment,
				PostId: id,
			})
			.then((res) => {
				console.log('Comment added!');
				console.log(id);
			})
			.catch((err) => console.error(err));
	};

	return (
		<div className='App'>
			{isLoadingPost ? (
				<h1>Loading...</h1>
			) : (
				<>
					<Container>
						<div className='post'>
							<div className='title'> {dataPost.title} </div>
							<div className='body'>{dataPost.postText}</div>
							<div className='footer'>{dataPost.username}</div>
						</div>
						<div className='commentWrapper'>
							<Wrapper>
								<input
									type='text'
									placeholder='Comment...'
									autoComplete='off'
									onChange={(e) => {
										setNewComment(e.target.value);
									}}
								/>
								<Button
									variant='contained'
									color='primary'
									onClick={addComment}>
									Add Comment
								</Button>
							</Wrapper>
							<div className='comments-main'>
								{dataComments?.map((comment, id) => (
									<div className='comment' key={id}>
										{comment.commentBody}
									</div>
								))}
							</div>
						</div>
					</Container>
					<StyledButton
						style={{ marginTop: '5em', backgroundColor: 'lightcyan' }}
						onClick={() => {
							history.goBack();
						}}>
						Back
					</StyledButton>
				</>
			)}
		</div>
	);
};

export default Post;

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	width: 100%;
	& .commentWrapper {
		min-width: 300px;
		width: 20%;
		margin-top: 1.2em;
	}
	& .comments-main {
		overflow-y: auto;
		height: 260px;
	}
	& .comment {
		border: 1px solid lightgray;
		padding: 1em;
		margin: 0.5em;
	}
`;
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	& input {
		padding: 1em;
		border-radius: 8px;
		border: 1px gray solid;
	}
	& button {
		margin: 0.5em 0;
		font-weight: bold;
	}
	& .MuiButton-containedPrimary {
		background-color: dodgerblue;
		&:hover {
			background-color: #1773ce;
		}
	}
`;
