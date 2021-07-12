import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
const Post = () => {
	let { id } = useParams();
	const getPosts = async () => {
		// I'm destructuring data and returning it so that I can avoid writing data.data
		const { data } = await axios.get(`http://localhost:3001/posts/byId/${id}`);
		return data;
	};
	// First parameter can be named anything and second paramter is the function.
	const { data, isLoading } = useQuery('PostsId', getPosts);

	return (
		<div>
			{isLoading ? (
				<h1>Loading...</h1>
			) : (
				<div className='post'>
					<div className='title'> {data.title} </div>
					<div className='body'>{data.postText}</div>
					<div className='footer'>{data.username}</div>
				</div>
			)}
		</div>
	);
};

export default Post;
