import { createFileRoute } from '@tanstack/react-router';

import Home from '@/page/Home/Home';

export const Route = createFileRoute('/')({
  component: () => <Home />,
});
