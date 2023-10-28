import { Button, Input } from "antd";
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

  const publish = useCallback(() => {
    console.log("publishing");
    const client = mqtt.connect(HOST, OPTIONS);
    client.on("connect", () => {
      console.log("connected asdasdasdasd");
    });
    client.publish(TOPIC, sendMessage);
  }, [sendMessage]);

  return (
    <>
      <Input
        value={sendMessage}
        onChange={(e) => setSendMessage(e.target.value)}
      />
      <Button onClick={() => publish()}>Publish</Button>
    </>
  );
}
