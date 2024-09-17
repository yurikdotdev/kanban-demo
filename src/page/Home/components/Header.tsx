import { ModeToggle } from '@/components/theme/mode-toggle';

function Header() {
  return (
    <div className="flex w-full items-center justify-evenly">
      <div>
        <h1 className="text-4xl font-medium">Kanban</h1>
        <p className="">Demo Kanban Board</p>
      </div>
      <ModeToggle />
    </div>
  );
}

export default Header;
