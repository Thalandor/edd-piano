import { notification } from "antd";
import React, { useEffect, useState } from "react";
import {
  Piece,
  subscribeBoughtPieces,
  subscribeNewPieces,
} from "../services/PianoNFTServices";

const SubscriptionProvider = ({ children }: { children: React.ReactNode }) => {
  const [subscriptionCreatedPiece, setSubscriptionCreatedPiece] = useState<any>(
    null
  );
  useEffect(() => {
    subscribeCreatedPiece();
    subscribeBoughtPiece();
    return () => {
      subscriptionCreatedPiece?.unsubscribe();
    };
  }, []);

  const showNotificationCreatedPieceHandler = (data: Piece) => {
    notification.info({
      message: "New creation",
      description: `The new master piece ${data.title} has been created for only ${data.ethPrice} ETH!`,
      duration: 5,
    });
  };

  const showNotificationBoughtPieceHandler = () => {
    notification.info({
      message: "New bought",
      description: `You have bought the piece, please go to owned pieces section to check it!`,
      duration: 5,
    });
  };

  const subscribeCreatedPiece = async () => {
    const result = await subscribeNewPieces(
      showNotificationCreatedPieceHandler
    );
    setSubscriptionCreatedPiece(result);
  };

  const subscribeBoughtPiece = async () => {
    const result = await subscribeBoughtPieces(
      showNotificationBoughtPieceHandler
    );
    setSubscriptionCreatedPiece(result);
  };

  return <>{children}</>;
};

export default SubscriptionProvider;
