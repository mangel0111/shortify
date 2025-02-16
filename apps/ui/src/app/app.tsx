import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes } from 'react-router';

import CreateShortUrlForm from './pages/CreateShortUrlForm';
import { NavBar } from './components/NavBar';
import { UrlPanel } from './pages/Urls';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<CreateShortUrlForm />} />
          <Route path="/urls" element={<UrlPanel />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
