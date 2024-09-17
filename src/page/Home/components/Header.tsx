import { ModeToggle } from '@/components/theme/mode-toggle';

function Header() {
  return (
    <div className="absolute top-5 right-5">
      <ModeToggle  />
    </div>
  );
}

export default Header;
