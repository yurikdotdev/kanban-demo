import { ThemeProvider } from '@/components/theme/theme-provider';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="DARK_MODE">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
