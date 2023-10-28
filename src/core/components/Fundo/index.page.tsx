import React from "react";

import { FundoComponente } from "./styles";

export default function Fundo({children, ...props}) {
  return (
    <FundoComponente {...props}>
      {children}
    </FundoComponente>
  );
}
