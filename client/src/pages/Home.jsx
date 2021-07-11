import axios from 'axios';
import { useQuery } from 'react-query';
import '../App.css';

const Home = ({ history }) => {
	const getPosts = async () => {
		// I'm destructuring data and returning it so that I can avoid writing data.data
		const { data } = await axios.get('http://localhost:3001/posts');
		return data;
	};
	const { data } = useQuery('Posts', getPosts);

	return (
		<div className='App'>
			{data?.map((value) => {
				return (
					<div
						className='post'
						onClick={() => {
							history.push(`/post/:${value.id}`);
						}}>
						<div className='title'> {value.title} </div>
						<div className='body'>{value.postText}</div>
						<div className='footer'>{value.username}</div>
					</div>
				);
			})}
		</div>
	);
};

export default Home;
