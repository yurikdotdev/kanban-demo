import KanbanBoard from '@/components/KanbanBoard';
import Header from './components/Header';

function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between gap-8 p-12 dark:bg-black">
      <Header />
      <KanbanBoard />
    </div>
  );
}

export default Home;
