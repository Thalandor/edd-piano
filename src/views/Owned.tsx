import { Space, Table } from "antd";
import Column from "antd/lib/table/Column";
import React, { useEffect, useState } from "react";
import { Piano, MidiNumbers } from "react-piano";
import SoundfontProvider from "../components/SoundfontProvider";
import { getOwnedPieces, Piece } from "../services/PianoNFTServices";
import _ from "lodash";
import { PlayCircleFilled } from "@ant-design/icons";

const audioContext = new (window.AudioContext ||
  (window as any).webkitAudioContext)();
const soundfontHostname = "https://d1pzp51pvbm36p.cloudfront.net";
const noteRange = {
  first: MidiNumbers.fromNote("c3"),
  last: MidiNumbers.fromNote("f4"),
};
const Market = () => {
  const [ownedPieces, setOwnedPieces] = useState<Piece[]>([]);
  const [activeNotes, setActiveNotes] = useState<[]>();
  const [scheduledEvents, setScheduledEvents] = useState<NodeJS.Timeout[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const pieces = await getOwnedPieces();
    setOwnedPieces(pieces);
  };
  const dataSource = ownedPieces.map((p: Piece, index: number) => {
    return {
      key: index,
      title: p.title,
      price: `${p.ethPrice} ETH`,
      piece: p.piece,
    };
  });

  const onPlayHandler = (jsonPiece: string) => {
    const tempEvents: NodeJS.Timeout[] = [];
    const piece = JSON.parse(jsonPiece);
    const startAndEndTimes = _.uniq(
      _.flatMap(piece, (event) => [event.time, event.time + event.duration])
    );
    startAndEndTimes.forEach((time) => {
      tempEvents.push(
        setTimeout(() => {
          const currentEvents = piece.filter((event: any) => {
            return event.time <= time && event.time + event.duration > time;
          });
          setActiveNotes(currentEvents.map((e: any) => e.midiNumber));
        }, time * 1000)
      );
    });
    setScheduledEvents(tempEvents);
    // Stop at the end
    setTimeout(() => {
      onStopHandler();
    }, getRecordingEndTime(piece) * 1000);
  };

  const onStopHandler = () => {
    setActiveNotes([]);
    scheduledEvents.forEach((scheduledEvent) => {
      clearTimeout(scheduledEvent);
    });
  };

  const getRecordingEndTime = (piece: any) => {
    if (piece.length === 0) {
      return 0;
    }
    return Math.max(...piece.map((event: any) => event.time + event.duration));
  };

  return (
    <div>
      <Table dataSource={dataSource}>
        <Column title="Title" dataIndex="title" key="title" />
        <Column title="Price" dataIndex="price" key="price" />
        <Column
          title="Action"
          key="action"
          render={(text, record: any) => (
            <Space size="middle">
              <PlayCircleFilled
                onClick={() => onPlayHandler(record.piece)}
                style={{ fontSize: 25 }}
              />
            </Space>
          )}
        />
      </Table>
      <div style={{ display: "none" }}>
        <SoundfontProvider
          instrumentName="acoustic_grand_piano"
          audioContext={audioContext}
          hostname={soundfontHostname}
          render={({
            playNote,
            stopNote,
          }: {
            isLoading: any;
            playNote: any;
            stopNote: any;
          }) => (
            <Piano
              noteRange={noteRange}
              width={"20px"}
              playNote={playNote}
              stopNote={stopNote}
              activeNotes={activeNotes}
            />
          )}
        />
      </div>
    </div>
  );
};

export default Market;
