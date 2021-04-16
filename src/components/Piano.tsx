import { Piano, MidiNumbers, KeyboardShortcuts } from "react-piano";
import "react-piano/dist/styles.css";
import SoundfontProvider from "../components/SoundfontProvider";
import DimensionsProvider from "../components/Dimensions";
import styles from "./Piano.module.scss";
import { useState } from "react";
import { Mode } from "../views/PianoView";

const audioContext = new (window.AudioContext ||
  (window as any).webkitAudioContext)();
const soundfontHostname = "https://d1pzp51pvbm36p.cloudfront.net";

const noteRange = {
  first: MidiNumbers.fromNote("c3"),
  last: MidiNumbers.fromNote("f4"),
};
const keyboardShortcuts = KeyboardShortcuts.create({
  firstNote: noteRange.first,
  lastNote: noteRange.last,
  keyboardConfig: KeyboardShortcuts.HOME_ROW,
});

const DURATION_UNIT = 0.5;
const DEFAULT_NOTE_DURATION = DURATION_UNIT;

interface Props {
  mode: Mode;
  events: any[];
  currentTime: number;
  currentEvents: any[];
  setEvents: (events: any[]) => void;
  setCurrentTime: (time: number) => void;
  isDisabled: boolean;
}

const PianoView = (props: Props) => {
  const [hasNotesRecorded, setHasNotesRecorded] = useState(false);
  const [noteDuration] = useState(DEFAULT_NOTE_DURATION);
  const onPlayNoteInput = () => {
    setHasNotesRecorded(false);
  };
  const onStopNoteInput = (
    midiNumber: any,
    { prevActiveNotes: playedNotes }: { prevActiveNotes: any }
  ) => {
    if (!hasNotesRecorded) {
      recordNotes(playedNotes, noteDuration);
      setHasNotesRecorded(true);
    }
  };

  const recordNotes = (midiNumbers: any, duration: any) => {
    if (props.mode !== Mode.RECORDING) {
      return;
    }
    const newEvents = midiNumbers.map((midiNumber: number) => {
      return {
        midiNumber,
        time: props.currentTime,
        duration,
      };
    });
    props.setEvents(props.events.concat(newEvents));
    props.setCurrentTime(props.currentTime + duration);
  };

  const activeNotes =
    props.mode === Mode.PLAYING
      ? props.currentEvents.map((event) => event.midiNumber)
      : null;
  return (
    <div className={styles.container}>
      <DimensionsProvider>
        {({
          containerWidth,
        }: {
          containerWidth: any;
          containerHeight: any;
        }) => (
          <SoundfontProvider
            instrumentName="acoustic_grand_piano"
            audioContext={audioContext}
            hostname={soundfontHostname}
            render={({
              isLoading,
              playNote,
              stopNote,
            }: {
              isLoading: any;
              playNote: any;
              stopNote: any;
            }) => (
              <Piano
                noteRange={noteRange}
                width={containerWidth}
                playNote={playNote}
                stopNote={stopNote}
                disabled={props.isDisabled || isLoading}
                onPlayNoteInput={onPlayNoteInput}
                onStopNoteInput={onStopNoteInput}
                activeNotes={activeNotes}
                keyboardShortcuts={keyboardShortcuts}
              />
            )}
          />
        )}
      </DimensionsProvider>
    </div>
  );
};

export default PianoView;
