import KanbanBoard from '@/components/KanbanBoard';

function Home() {
	return (
		<div className='flex min-h-screen flex-col items-center justify-center space-y-4'>
			<KanbanBoard />
		</div>
	);
}

export default Home;
