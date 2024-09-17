import { ThemeProvider } from '@/components/theme/theme-provider';
import Home from '@/page/Home/Home';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="DARK_MODE">
      <Home />
    </ThemeProvider>
  );
}

export default App;
