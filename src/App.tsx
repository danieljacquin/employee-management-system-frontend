import { RouterProvider } from 'react-router-dom';

import TankStackQueryProvider from './shared/providers/TankStackQueryProvider';
import { router } from './shared/routes/router';

function App() {
  return (
    <TankStackQueryProvider>
      <RouterProvider router={router} />
    </TankStackQueryProvider>
  );
}

export default App;
