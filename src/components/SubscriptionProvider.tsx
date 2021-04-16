import { notification } from "antd";
import React, { useEffect, useState } from "react";
import { Piece, subscribeNewPieces } from "../services/PianoNFTServices";

const SubscriptionProvider = ({ children }: { children: React.ReactNode }) => {
  const [subscription, setSubscription] = useState<any>(null);
  useEffect(() => {
    subscribe();
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const showNotificationHandler = (data: Piece) => {
    notification.info({
      message: "New event",
      description: `The new master piece ${data.title} has been created for only ${data.ethPrice} ETH!`,
      duration: 5,
    });
  };

  const subscribe = async () => {
    const result = await subscribeNewPieces(showNotificationHandler);
    setSubscription(result);
  };

  return <>{children}</>;
};

export default SubscriptionProvider;
