import { Grommet, Box } from 'grommet';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { CoralDev } from './components/CoralDev';
import { AboutUs } from './components/AboutUs';

const theme = {
  global: {
    colors: {
      brand: '#6200c5',
      background: 'linear-gradient(90deg, #6200c5 0%, #ff27fc 300%)',
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
      <Box
        fill
        background="linear-gradient(135deg, #6200c5 0%, #ff27fc 600%)"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header />
        <CoralDev />
        <Box flex="grow" width="100%">
          <Main />
          <AboutUs />
        </Box>
        <Footer />
      </Box>
    </Grommet>
  );
}
export default App;
