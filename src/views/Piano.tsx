import { Piano , MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import SoundfontProvider from '../components/SoundfontProvider';
import DimensionsProvider from '../components/Dimensions';

const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';

const noteRange = {
  first: MidiNumbers.fromNote('c3'),
  last: MidiNumbers.fromNote('f4'),
};
// const keyboardShortcuts = KeyboardShortcuts.create({
//   firstNote: noteRange.first,
//   lastNote: noteRange.last,
//   keyboardConfig: KeyboardShortcuts.HOME_ROW,
// });

const PianoView = () => {
    // const firstNote = MidiNumbers.fromNote('c3');
    // const lastNote = MidiNumbers.fromNote('f5');
    // const keyboardShortcuts = KeyboardShortcuts.create({
    //   firstNote: firstNote,
    //   lastNote: lastNote,
    //   keyboardConfig: KeyboardShortcuts.HOME_ROW,
    // });

    return  <DimensionsProvider>
    {({ containerWidth }: {containerWidth: any, containerHeight: any}) => (
      <SoundfontProvider
        instrumentName="acoustic_grand_piano"
        audioContext={audioContext}
        hostname={soundfontHostname}
        render={({ isLoading, playNote, stopNote }: {isLoading: any, playNote: any, stopNote: any}) => (
          <Piano
            noteRange={noteRange}
            width={containerWidth}
            playNote={playNote}
            stopNote={stopNote}
            disabled={isLoading}
          />
        )}
      />
    )}
  </DimensionsProvider>
}


export default PianoView;