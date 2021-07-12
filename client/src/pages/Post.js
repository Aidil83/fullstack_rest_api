import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import { StyledButton } from './CreatePost';
import styled from 'styled-components';
const Post = ({ history }) => {
	let { id } = useParams();
	const getPosts = async () => {
		// I'm destructuring data and returning it so that I can avoid writing data.data
		const { data } = await axios.get(`http://localhost:3001/posts/byId/${id}`);
		return data;
	};
	const getComments = async () => {
		const { data } = await axios.get(`http://localhost:3001/comments/${id}`);
		return data;
	};
	// First parameter can be named anything and second paramter is the function. Renaming data to avoid naming conflict.
	const { data: dataPost, isLoading: isLoadingPost } = useQuery(
		'PostsId',
		getPosts
	);
	const { data: dataComments, isLoading: isLoadingComment } = useQuery(
		'Comments',
		getComments
	);
	console.log(dataComments);
	console.log(dataPost);

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
								/>
								<button>Add Comment</button>
							</Wrapper>
							<div>
								{dataComments.map((comment, id) => (
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
	& .comment {
		border: 1px solid lightgray;
		padding: 0.5em;
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
		padding: 1em;
		width: 150px;
		margin: 0.5em 0;
		border-radius: 8px;
		border: none;
		background-color: dodgerblue;
		color: white;
		font-weight: bold;
	}
`;
