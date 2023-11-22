import styled from "styled-components";
import { Card, CardProps } from "antd";

interface PropsCard extends CardProps {
  children: React.ReactNode;
}

export const Texto = styled.h1`
  font-family: "Lexend", Times, serif;
  font-size: 1rem;
  font-weight: 700;
  color: #333;
  text-align: center;
`;
export const Titulo = styled.h1`
  font-family: "Lexend", Times, serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #333;
`;
export const TituloCenter = styled.h1`
  font-family: "Lexend", Times, serif;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  color: #333;
`;
export const Subtitulo = styled.p`
  font-family: "Lexend", Times, serif;
  font-size: 14px;
  font-weight: 100;
  color: #333;
`;

export const TextoDetaque = styled.h1`
  font-family: "Lexend", Times, serif;
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  text-align: center;
  justify-content: center;
`;

export const CardTitulo = styled.div`
  height: 255px;
  width: "100%";
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 7px 7px 35px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;
export const CardHora = styled.div`
  /* Adicione estilos do card aqui */
  width: "100%";
  padding: 5px 20px;
  background-color: #ffffff;
  box-shadow: 7px 7px 35px rgba(0, 0, 0, 0.15);
  border-radius: 10px;

  margin-bottom: 10px;
`;
