import KanbanBoard from '@/components/KanbanBoard';
import Header from './components/Header';
import Footer from './components/Footer';

function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between gap-8 p-12 dark:bg-black">
      <Header />
      <KanbanBoard />
      <Footer/>
    </div>
  );
}

export default Home;
