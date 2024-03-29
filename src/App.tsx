import Configurator from 'layout/Configurator';
import { ControlProvider } from 'provider/ControlProvider';

function App() {
  return (
    <ControlProvider>
      <Configurator />
    </ControlProvider>
  );
}

export default App;
