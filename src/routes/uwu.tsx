import { createFileRoute } from '@tanstack/react-router';

import About from '@/page/About/About';

export const Route = createFileRoute('/uwu')({
  component: () => <About />,
});
