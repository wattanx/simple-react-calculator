import React from "react";
import styled from "@emotion/styled";

export const ButtonBackgroundColor = {
  Black: "#434343",
  Gray: "#5d5e5e",
  Orange: "#f2a23c",
} as const;

type ButtonProps = {
  backgroundColor: ButtonBackgroundColorType;
  value: string;
  onClick: () => void;
  isLarge?: boolean;
  isSelected?: boolean;
};

type ButtonBackgroundColorType =
  typeof ButtonBackgroundColor[keyof typeof ButtonBackgroundColor];

export const Button: React.VFC<ButtonProps> = (props) => {
  return (
    <StyledButton
      backgroundColor={props.backgroundColor}
      isLarge={props.isLarge}
      isSelected={props.isSelected}
      onClick={props.onClick}
    >
      {props.value}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  backgroundColor: ButtonBackgroundColorType;
  isLarge?: boolean;
  isSelected?: boolean;
}>`
  background-color: ${(props) => props.backgroundColor};
  color: white;
  width: ${(props) => (props.isLarge ? "50%" : "25%")};
  height: 16%;
  font-size: 6vmin;
  border: ${(prop) =>
    prop.isSelected ? "3px solid black" : "1px solid black"};
  padding-left: ${(props) => (props.isLarge ? "12%" : "")};
  text-align: ${(props) => (props.isLarge ? "left" : "")};

  :focus {
    outline: 0px;
  }

  :active {
    opacity: 0.5;
  }
`;
