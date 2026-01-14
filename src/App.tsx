import { RouterProvider } from 'react-router-dom';

import ToastNotification from './shared/components/ui/ToastNotification';
import TankStackQueryProvider from './shared/providers/TankStackQueryProvider';
import { router } from './shared/routes/router';

function App() {
  return (
    <TankStackQueryProvider>
      <ToastNotification />
      <RouterProvider router={router} />
    </TankStackQueryProvider>
  );
}

export default App;
