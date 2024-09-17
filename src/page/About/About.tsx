import { Link } from '@tanstack/react-router';

function About() {
  return (
    <div className="mx-auto flex min-h-screen w-full flex-col items-center justify-center gap-8 text-center">
      <h1 className="text-6xl">
        <Link to='/' className='underline'>NO MORE UWU!</Link>
      </h1>
      <img
        className="max-w-sm"
        src="public/assets/uwu.webp"
        alt="NO MORE UWU"
      />
    </div>
  );
}

export default About;
