import { Card } from "@/core/components/Card";
import { Coluna } from "@/core/components/Coluna";
import Fundo from "@/core/components/Fundo/index.page";
import { Linha } from "@/core/components/Linha";
import { Divider, Spin } from "antd";
import * as mqtt from "mqtt/dist/mqtt";
import { IClientOptions } from "mqtt/dist/mqtt";
import { useCallback, useEffect, useState } from "react";

import dynamic from "next/dynamic";
import {
  Texto,
  Titulo,
  TextoDetaque,
  Subtitulo,
  CardTitulo,
  CardHora,
  TituloCenter,
} from "./styles";
import api from "@/services/api";
import { TextT } from "@phosphor-icons/react";
import dayjs from "dayjs";
import Image from "next/image";

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
interface ISensoresAPI {
  conductividadeEletricaSolo: number;
  createdAt: string;
  dataLeitura: string;
  id: number;
  luminosidade: number;
  phSolo: number;
  temperaturaAmbiente: number;
  temperaturaSolo: number;
  umidadeAtmosfera: number;
  umidadeSolo: number;
  updatedAt: string;
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
  const [sensores, setSensores] = useState<ISensores | null>(null);
  const [sensoresAPI, setSensoresAPI] = useState<ISensoresAPI[] | null>(null);

  const chartLineOptions = {
    chart: {
      id: "temperature-chart",
      toolbar: {
        show: false,
      },
      height: 280,
      type: "line",
    },
    xaxis: {
      type: "category",
      categories:
        sensoresAPI &&
        sensoresAPI.map(
          (item) =>
            //retirar apenas a hora e minuto
            item.createdAt.split("T")[1].split(".")[0]
        ),
    },
    yaxis: {
      title: {
        text: "Temperatura (°C)",
      },
    },
    colors: ["#20E647"], // Cor da linha
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        gradientToColors: ["#87D4F9"], // Cor do preenchimento do gráfico de linha
        stops: [0, 100],
      },
    },
  } as any;

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

  const getSensoresApi = useCallback(async () => {
    const response = await api.get("/leituras");

    const data = response.data;
    setSensoresAPI(data);
    console.log("Banco de dados", data);
  }, []);

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

  useEffect(() => {
    getSensoresApi();
  }, []);

  return (
    <Spin spinning={false}>
      <Fundo>
        <Card>
          {sensoresAPI && (
            <>
              <Linha>
                <Coluna xs={24} sm={24} md={24} lg={24} xl={14}>
                  <Linha
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Coluna xs={24} sm={24} md={24} lg={14}>
                      <CardTitulo>
                        <Titulo>SISTEMA DE MONITORAMENTO DE HORTALIÇAS</Titulo>
                        <Subtitulo>Umidade e Temperatura (solo e ar)</Subtitulo>
                      </CardTitulo>
                    </Coluna>
                    <Coluna xs={24} sm={24} md={24} lg={10}>
                      <Linha>
                        <Coluna xs={12} sm={12} md={12} lg={24}>
                          <CardHora>
                            <Subtitulo>Ultima Leitura</Subtitulo>
                            <TituloCenter>
                              {dayjs(
                                sensoresAPI[sensoresAPI.length - 1].dataLeitura
                              ).format("DD/MM/YYYY")}
                            </TituloCenter>
                          </CardHora>
                        </Coluna>
                        <Coluna xs={12} sm={12} md={12} lg={24}>
                          <CardHora>
                            <Subtitulo> Hora Ultima Leitura </Subtitulo>
                            <TituloCenter>
                              {new Date().toLocaleTimeString("pt-BR", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </TituloCenter>
                          </CardHora>
                        </Coluna>
                      </Linha>
                    </Coluna>
                  </Linha>
                  <Linha>
                    {" "}
                    <Coluna xs={24} sm={24} md={24} lg={24}>
                      <Chart
                        options={chartLineOptions}
                        series={[
                          {
                            name: "Temperatura",
                            data: sensoresAPI
                              ? sensoresAPI.map(
                                  (entry) => entry.temperaturaSolo
                                )
                              : [],
                          },
                        ]}
                        type="line"
                        height="350"
                      />{" "}
                    </Coluna>
                  </Linha>
                  <Linha>
                    {" "}
                    <Coluna xs={24} sm={24} md={24} lg={24}>
                      <Chart
                        options={chartLineOptions}
                        series={[
                          {
                            name: "Temperatura",
                            data: sensoresAPI
                              ? sensoresAPI.map(
                                  (entry) => entry.temperaturaSolo
                                )
                              : [],
                          },
                        ]}
                        type="line"
                        height="350"
                      />{" "}
                    </Coluna>
                  </Linha>
                </Coluna>
                <Coluna xs={24} sm={24} md={24} lg={24} xl={10}>
                  <Linha>
                    <Coluna xs={24} sm={24} md={24} lg={12}>
                      <Texto>Temperatura do ar</Texto>

                      <center>
                        <Image
                          src="/cold.png"
                          alt="cold"
                          width={250}
                          height={250}
                        />
                      </center>
                    </Coluna>
                    <Coluna xs={24} sm={24} md={24} lg={12}>
                      <Texto>Temperatura do Solo</Texto>
                      <center>
                        <Image
                          src="/hot.png"
                          alt="cold"
                          width={250}
                          height={250}
                        />
                      </center>
                    </Coluna>
                  </Linha>
                  <Linha>
                    <Coluna xs={24} sm={24} md={24} lg={12}>
                      <Texto>Temperatura do ar</Texto>
                      <Chart
                        options={chartOptions}
                        series={(() => {
                          if (sensoresAPI.length == 0) return [];

                          const ultimaLeitura = sensoresAPI.length - 1;

                          return [sensoresAPI[ultimaLeitura].umidadeSolo];
                        })()}
                        type="radialBar"
                        height="350"
                      />
                    </Coluna>
                    <Coluna xs={24} sm={24} md={24} lg={12}>
                      <Texto>Temperatura do solo</Texto>
                      <Chart
                        options={chartOptions}
                        series={(() => {
                          if (sensoresAPI.length == 0) return [];

                          const ultimaLeitura = sensoresAPI.length - 1;

                          return [sensoresAPI[ultimaLeitura].umidadeAtmosfera];
                        })()}
                        type="radialBar"
                        height="350"
                      />
                    </Coluna>
                  </Linha>
                  <Linha>
                    <Coluna xs={24} sm={24} md={24} lg={12}>
                      <Texto>Umidade do ar</Texto>
                      <Chart
                        options={chartOptions}
                        series={(() => {
                          if (sensoresAPI.length == 0) return [];

                          const ultimaLeitura = sensoresAPI.length - 1;

                          return [sensoresAPI[ultimaLeitura].umidadeAtmosfera];
                        })()}
                        type="radialBar"
                        height="350"
                      />
                    </Coluna>
                    <Coluna xs={24} sm={24} md={24} lg={12}>
                      <Texto>Umidade do solo</Texto>
                      <Chart
                        options={chartOptions}
                        series={(() => {
                          if (sensoresAPI.length == 0) return [];

                          const ultimaLeitura = sensoresAPI.length - 1;

                          return [sensoresAPI[ultimaLeitura].umidadeSolo];
                        })()}
                        type="radialBar"
                        height="350"
                      />
                    </Coluna>
                  </Linha>
                </Coluna>
              </Linha>
            </>
          )}
        </Card>
      </Fundo>
    </Spin>
  );
}
