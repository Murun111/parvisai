import { Nav } from './Nav';
import { Hero } from './Hero';
import { Reference, Footer } from './Reference';
import ChapterBit from './ch/Bit';
import ChapterSuperposition from './ch/Superposition';
import ChapterEntanglement from './ch/Entanglement';
import ChapterGates from './ch/Gates';
import ChapterAlgorithms from './ch/Algorithms';
import { FONT, T } from './theme';

export default function App() {
  return (
    <div style={{ fontFamily: FONT, color: T.textDark, background: T.bg }}>
      <Nav />
      <Hero />
      <Divider />
      <ChapterBit />
      <Divider />
      <ChapterSuperposition />
      <Divider />
      <ChapterEntanglement />
      <Divider />
      <ChapterGates />
      <Divider />
      <ChapterAlgorithms />
      <Divider />
      <Reference />
      <Footer />
    </div>
  );
}

function Divider() {
  return (
    <div
      style={{
        maxWidth: 1180,
        margin: '0 auto',
        padding: '0 48px',
      }}
    >
      <div style={{ height: 1, background: T.rule }} />
    </div>
  );
}
