/* eslint-disable jsx-a11y/alt-text */
import React from "react";

import { Container } from "./styles";
import { Avatar, AvatarProps } from "antd";
import { User } from "@phosphor-icons/react";
import Image from "next/image";

interface Props extends AvatarProps {
  foto?: any;
  size: number;
}

export function AvatarPhoto({ foto, size, ...rest }: Props) {
  return (
    <Container>
      {/* <Image.PreviewGroup> */}
      <Image
        shape="square"
        width={size}
        height={size}
        // sizes={size}
        icon={<User size={size} />}
        src={foto}
        alt={""}
        {...rest}
      />
      {/*
      
      <Avatar
        shape="square"
        size={size}
        icon={<User size={size} />}
        src={foto}
        {...rest}
      />
      </Image.PreviewGroup> */}
    </Container>
  );
}
