import { useState } from 'react';
import Piano from '../components/Piano';
import styles from './Piano.module.scss';

const PianoView = () => {
  const [mode, setMode] = useState('RECORDING')
  const [events, setEvents] = useState<any[]>([])
  const [currentTime, setCurrentTime] = useState(0)
  const [currentEvents, setCurrentEvents] = useState<any[]>([])
  return (
    <div className={styles.container}>
      <Piano
        currentEvents={currentEvents}
        currentTime={currentTime}
        events={events}
        mode={mode}
        setCurrentTime={setCurrentTime}
        setEvents={setEvents} />
    </div>)
}


export default PianoView;