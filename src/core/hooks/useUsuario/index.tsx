import { parseCookies } from "nookies";
import { useMemo } from "react";
import jwt from "jwt-decode";

type tokenInfos = {
  nome_lotacao_real?: string;
  unidade_siisp_id?: number;
  matricula?: number;
  cod_pessoa_rh?: number;
  cod_servidor_rh?: number;
  user_id?: number;

  verificado?: boolean;
  codigo_lotacao_real?: number;
  user_name?: string; //cpf
  bloqueado?: false;
  authorities?: String[];
  client_id?: string;
  scope?: String[];
  exp?: number;
  nome_servidor?: string;
  jti?: string;
};

interface IUseUsuario {
  usuario: tokenInfos;
}

const useUsuario = (): IUseUsuario => {
  const { "siisp-jsf-token": token } = parseCookies();

  const usuario = useMemo(() => {
    if (token) {
      const jwtDados = jwt<tokenInfos>(token);

      return {
        nome_lotacao_real: jwtDados?.nome_lotacao_real,
        unidade_siisp_id: jwtDados?.unidade_siisp_id,
        matricula: jwtDados?.matricula,
        cod_pessoa_rh: jwtDados?.cod_pessoa_rh,
        cod_servidor_rh: jwtDados?.cod_servidor_rh,
        user_id: jwtDados?.user_id,

        verificado: jwtDados?.verificado,
        codigo_lotacao_real: jwtDados?.codigo_lotacao_real,
        user_name: jwtDados?.user_name, //cpf
        bloqueado: jwtDados?.bloqueado,
        authorities: jwtDados?.authorities,
        client_id: jwtDados?.client_id,
        scope: jwtDados?.scope,
        exp: jwtDados?.exp,
        nome_servidor: jwtDados?.nome_servidor,
        jti: jwtDados?.jti,
      };
    }
    return {} as tokenInfos;
  }, [token]);

  const value = useMemo(
    () => ({
      usuario,
    }),
    [usuario]
  );

  return value;
};

export default useUsuario;
