// import "@/shared/styles/globals.scss";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

import pt_Br from "antd/lib/locale/pt_BR";
import theme from "@/core/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <ConfigProvider
        locale={pt_Br}
        theme={{
          token: {
            colorIcon: `${theme.colors.colorPrimary}`,
            colorPrimary: `${theme.colors.colorPrimary}`,
          },
          components: {
            DatePicker: {
              borderRadius: 15,
              fontFamily: theme.fonts.family.principal,
              fontSize: theme.fonts.sizes.small,
            },
            Select: {
              borderRadius: 15,
              fontFamily: theme.fonts.family.principal,
              fontSize: theme.fonts.sizes.small,
            },
            Input: {
              borderRadius: 15,
              fontFamily: theme.fonts.family.principal,
              fontSize: theme.fonts.sizes.small,
            },
            InputNumber: {
              borderRadius: 15,
              fontFamily: theme.fonts.family.principal,
              fontSize: theme.fonts.sizes.small,
            },
            Button: {
              borderRadius: 15,
              fontFamily: "Lexend, sans-serif",
              fontSize: theme.fonts.sizes.small,
            },
            Table: {
              borderRadius: 15,
            },
          },
        }}
      >
        <Component {...pageProps} />
      </ConfigProvider>
    </ThemeProvider>
  );
}
