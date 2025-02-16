import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes } from 'react-router';

import CreateShortUrlForm from './pages/CreateShortUrlForm';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Routes>
          <Route path="/" element={<CreateShortUrlForm />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
