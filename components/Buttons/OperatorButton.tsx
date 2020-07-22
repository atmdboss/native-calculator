import React, { FunctionComponent } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../Button";

const operators: string[] = ["+", "-", "÷", "x", "="];

type OBProps = {
  value: string;
};

const OperatorButton: FunctionComponent<OBProps> = ({ value }) => {
  return (
    <Button value={value} />
  );
};

export default OperatorButton;

const styles = StyleSheet.create({});
