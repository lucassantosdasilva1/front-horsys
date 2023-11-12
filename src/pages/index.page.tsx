import { Card } from "@/core/components/Card";
import { Coluna } from "@/core/components/Coluna";
import Fundo from "@/core/components/Fundo/index.page";
import { Linha } from "@/core/components/Linha";
import { Divider, Spin } from "antd";
import * as mqtt from "mqtt/dist/mqtt";
import { IClientOptions } from "mqtt/dist/mqtt";
import { useCallback, useEffect, useState } from "react";

import dynamic from "next/dynamic";
import { Texto, TextoDetaque } from "./styles";

const Chart = dynamic(
  () => {
    return import("react-apexcharts");
  },
  { ssr: false }
);

const clientID = "mqttjs_" + Math.random().toString(16).substr(2, 8);

interface ISensores {
  temperaturaAr: number;
  temperaturaSolo: number;
  umidadeAr: number;
  umidadeSolo: number;
  luminosidade: number;
}

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
  const [sensores, setSensores] = useState({} as ISensores);

  const chartOptions = {
    chart: {
      height: 280,
      type: "radialBar",
    },
    series: [67],
    colors: ["#20E647"],
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#333",
          startAngle: -90,
          endAngle: 90,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "30px",
            show: true,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        gradientToColors: ["#87D4F9"],
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "butt",
    },
    labels: ["Progress"],
  } as any;

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

      let [temperaturaSolo, umidadeSolo, temperaturaAr, umidadeAr] = message
        .toString()
        .split(",")
        .map((value) => Number(parseFloat(value).toFixed(2)));

      let result = message
        .toString()
        .split(",")
        .map((value) => Number(parseFloat(value).toFixed(2)));

      console.log("result", result);

      setSensores({
        temperaturaSolo,
        umidadeSolo,
        temperaturaAr,
        umidadeAr,
        luminosidade: 0,
      });
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
    <Spin spinning={false}>
      <Fundo>
        <Card>
          <div>message: {message}</div>

          <Divider />

          <Linha>
            <Coluna xs={24} sm={24} md={24} lg={12}>
              <Texto>Umidade do ar</Texto>
              <Chart
                options={chartOptions}
                series={[sensores.umidadeAr]}
                type="radialBar"
                height="350"
              />
            </Coluna>
            <Coluna xs={24} sm={24} md={24} lg={12}>
              <Texto>Temperatura do ar</Texto>

              <TextoDetaque>{sensores.temperaturaAr}ºC</TextoDetaque>
            </Coluna>
          </Linha>

          <Divider />
          <Linha>
            <Coluna xs={24} sm={24} md={24} lg={12}>
              <Texto>Umidade do solo</Texto>
              <Chart
                options={chartOptions}
                series={[sensores.umidadeSolo]}
                type="radialBar"
                height="350"
              />
            </Coluna>
            <Coluna xs={24} sm={24} md={24} lg={12}>
              <Texto>Temperatura do solo</Texto>

              <TextoDetaque>{sensores.temperaturaSolo}ºC</TextoDetaque>
            </Coluna>
          </Linha>

          <Linha>
            <Coluna xs={24} sm={12} md={24} lg={4}>
              <Texto>Luminosidade: {sensores.luminosidade}</Texto>
            </Coluna>
          </Linha>
        </Card>
      </Fundo>
    </Spin>
  );
}
