import React, { useState } from "react";
import { bookSlot, getAvailableSlots } from '../../Api';
import styles from './styles.module.css';
import DurationPicker from 'react-duration-picker'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface Duration {
  hours?: number;
  minutes: number;
  seconds: number;
}

interface Slot {
  start: Date,
  end: Date,
}

const Home = () => {
  const [date, setDate] = useState(new Date());
  const [duration, setDuration] = useState<Duration>({ 
    hours: 0, 
    minutes: 30, 
    seconds: 0 
  });
  const [slots, setSlots] = useState<Slot[]>([]);
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();

  const onCheck = () => {
    const durationMin = (duration.hours * 60) + (duration.seconds / 60) + duration.minutes;
    getAvailableSlots(date.toUTCString(), durationMin)
      .then((res) => setSlots(res.data))
      .catch((e) => setError(e.response.data?.code));
  };

  const onSlotClick = (slot: Slot) => {
    bookSlot(slot.start, slot.end)
      .then((res) => {
        setError('');
        setSlots([]);
        setSuccess(`Successfully booked slot at ${formatSlotTime(res.data.start_time)}`);
      })
      .catch((e) => setError(e.response.data?.code));
  }

  const formatSlotTime = (d: Date) => {
    const pad = (s: number) => String(s).padStart(2, '0');
    return `${pad(new Date(d).getHours())}:${pad(new Date(d).getMinutes())}`
  }

  return (
    <>
      <h1>
        Book a slot
      </h1>

      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}

      <div className={styles.form}>
        <DatePicker 
          onChange={setDate} 
          selected={date} 
          // minDate={new Date()}
          className={styles.datePicker}
        />
        <DurationPicker
          onChange={setDuration}
          initialDuration={{ minutes: 15, seconds: 0 }}
        />
        <button className={styles.button} onClick={onCheck}>Check availability</button>

        <div className={styles.slots}>
          {slots.length > 0 && 
            slots.map((slot, i) => 
              <div key={i} className={styles.slot} onClick={() => onSlotClick(slot)}>
                {`${formatSlotTime(slot.start)} - ${formatSlotTime(slot.end)}`}
              </div>
            )
          }
        </div>
      </div>
    </>
  );
};

export default Home;