import React, { FunctionComponent } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type ButtonProps = {
  value: string | number;
  shape?: "round" | "rect";
};

const Button: FunctionComponent<ButtonProps> = ({ value, shape }) => {
  return (
    <TouchableOpacity
      style={[styles.button, shape ? styles[shape] : styles.round]}
    >
      <Text style={styles.text}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    backgroundColor: "green",
    // height: 50,
    margin: 2,
    flexGrow: 1,
  },
  rect: {
    // width: 100,
  },
  round: {
    // width: 50,
  },
  text: {
    fontSize: 20,
    // lineHeight: 50,
    textAlign: "center",
  },
});

export default Button;
