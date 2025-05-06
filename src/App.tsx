import { Grommet } from 'grommet';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { AboutUs } from './components/AboutUs';

const theme = {
  global: {
    colors: {
      brand: '#7D4CDB',
      background: '#f8f8f8',
    },
    font: {
      family: 'Arial',
      size: '18px',
      height: '20px',
    },
  },
};

function App() {
  return (
    <Grommet theme={theme} full>
      <Header />
      <Main />
      <AboutUs />
      <Footer />
    </Grommet>
  );
}

export default App;