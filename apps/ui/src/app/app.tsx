import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import CreateShortUrlForm from './pages/CreateShortUrlForm';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <CreateShortUrlForm />
      </div>
    </QueryClientProvider>
  );
}

export default App;
