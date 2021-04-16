import React, { useState } from "react";
import Piano from "../components/Piano";
import styles from "./PianoView.module.scss";
import _ from "lodash";
import { Button, Input, Modal } from "antd";
import { createPiece } from "../services/PianoNFTServices";
import { useFormik } from "formik";
import * as yup from "yup";

export enum Mode {
  RECORDING,
  PLAYING,
}

const PianoView = () => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [mode, setMode] = useState(Mode.RECORDING);
  const [events, setEvents] = useState<any[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentEvents, setCurrentEvents] = useState<any[]>([]);
  const [scheduledEvents, setScheduledEvents] = useState<NodeJS.Timeout[]>([]);

  const { values, setFieldValue, submitForm } = useFormik({
    initialValues: {
      title: "",
      price: 0,
    },
    validationSchema: yup.object().shape({
      title: yup.string().required(),
      price: yup.number().required(),
    }),
    onSubmit: () => {
      handleOk();
    },
  });

  const onPlayHandler = () => {
    const tempEvents: NodeJS.Timeout[] = [];

    setMode(Mode.PLAYING);

    const startAndEndTimes = _.uniq(
      _.flatMap(events, (event) => [event.time, event.time + event.duration])
    );
    startAndEndTimes.forEach((time) => {
      tempEvents.push(
        setTimeout(() => {
          const currentEvents = events.filter((event) => {
            return event.time <= time && event.time + event.duration > time;
          });
          setCurrentEvents(currentEvents);
        }, time * 1000)
      );
    });
    setScheduledEvents(tempEvents);
    // Stop at the end
    setTimeout(() => {
      onStopHandler();
    }, getRecordingEndTime() * 1000);
  };

  const onStopHandler = () => {
    setMode(Mode.RECORDING);
    setCurrentEvents([]);
    scheduledEvents.forEach((scheduledEvent) => {
      clearTimeout(scheduledEvent);
    });
  };

  const onClearHandler = () => {
    onStopHandler();
    setEvents([]);
    setMode(Mode.RECORDING);
    setCurrentEvents([]);
    setCurrentTime(0);
  };

  const getRecordingEndTime = () => {
    if (events.length === 0) {
      return 0;
    }
    return Math.max(...events.map((event) => event.time + event.duration));
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    createPiece(values.title, JSON.stringify(events), values.price).then(() => {
      setVisible(false);
      setConfirmLoading(false);
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.pianoContainer}>
        <Piano
          currentEvents={currentEvents}
          currentTime={currentTime}
          events={events}
          mode={mode}
          setCurrentTime={setCurrentTime}
          setEvents={setEvents}
          isDisabled={visible}
        />
      </div>
      <div>Notes played: {JSON.stringify(events)}</div>

      <div className={styles.buttonContainer}>
        <Button type="primary" onClick={onPlayHandler}>
          Play
        </Button>
        <Button type="primary" onClick={onStopHandler}>
          Stop
        </Button>
        <Button type="primary" onClick={onClearHandler}>
          Clear
        </Button>
        <Button type="primary" onClick={showModal}>
          Send to blockchain
        </Button>
      </div>
      <Modal
        title="Sending your piece to blockchain"
        visible={visible}
        onOk={submitForm}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className={styles.modalContainer}>
          <div className={styles.inputModal}>
            <span>Title</span>
            <Input
              type="text"
              onChange={(v) => setFieldValue("title", v.target.value)}
            ></Input>
          </div>
          <div className={styles.inputModal}>
            <span>Price in ETH</span>
            <Input
              type="number"
              onChange={(v) => setFieldValue("price", v.target.value)}
            ></Input>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PianoView;
