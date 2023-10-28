import * as mqtt from "mqtt/dist/mqtt";
import { IClientOptions } from "mqtt/dist/mqtt";
import { useCallback, useEffect, useState } from "react";

const clientID = "mqttjs_" + Math.random().toString(16).substr(2, 8);

// const HOST = "wss://broker.emqx.io:8084/mqtt";
const HOST = "ws://maqiatto.com:8883";
const TOPIC = "lucashouse0@gmail.com/tempsolo";

const OPTIONS = {
  username: "lucashouse0@gmail.com",
  password: "hortas",
  keepalive: 60,
  clientId: clientID,
  protocolId: "MQTT",
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  will: {
    topic: "WillMsg",
    payload: Buffer.from("Connection Closed abnormally..!"),
    qos: 0,
    retain: false,
  },
} as IClientOptions;

export default function Home() {
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState("");

  const [topic, setTopic] = useState("");
  const [sendMessage, setSendMessage] = useState("");

  // const publish = () => {
  //   console.log("publishing");
  //   const client = mqtt.connect(HOST, OPTIONS);
  //   client.on("connect", () => {
  //     console.log("connected asdasdasdasd");
  //   });
  //   client.publish(TOPIC, "Hello mqtt");
  // };

  // const publish = useCallback(() => {
  //   console.log("publishing");
  //   const client = mqtt.connect(HOST, OPTIONS);
  //   client.on("connect", () => {
  //     console.log("connected asdasdasdasd");
  //   });
  //   client.publish(TOPIC, sendMessage);
  // }, [sendMessage]);

  const subscribe = useCallback(() => {
    const client = mqtt.connect(HOST, OPTIONS);
    client.on("connect", () => {
      setConnected(true);
      console.log("connected");
    });
    client.subscribe(TOPIC, { qos: 0 });
    client.on("message", (topic, message) => {
      console.log("topic received: " + topic);
      console.log("message received: " + message);
      setMessage(message.toString());
    });
    client.on("error", (error) => {
      console.log("Can't connect" + error);
      process.exit(1);
    });
  }, []);

  useEffect(() => {
    subscribe();
  }, [subscribe]);

  return (
    <>
      <div>message: {message}</div>
    </>
  );
}
