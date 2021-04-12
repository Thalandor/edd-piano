import { useState } from 'react';
import Piano from '../components/Piano';
import styles from './Piano.module.scss';

const PianoView = () => {
  const [mode, setMode] = useState('RECORDING')
  const [events, setEvents] = useState([])
  const [currentTime, setCurrentTime] = useState(0)
  const [currentEvents, setCurrentEvents] = useState([])
  return (
    <div className={styles.container}>
      <Piano></Piano>
    </div>)
}


export default PianoView;