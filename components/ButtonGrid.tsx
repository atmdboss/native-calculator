import React, { FunctionComponent } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { buttons, coloredKeys } from "../helperKeys";

type BGProps = {
  handleInput: Function;
};

const ButtonGrid: FunctionComponent<BGProps> = ({ handleInput }) => {
  return (
    <View style={styles.container}>
      {buttons.map((numArr, index) => {
        return (
          <View style={styles.innerView} key={index + 4000}>
            {numArr.map((num) => {
              return (
                <TouchableOpacity
                  style={[
                    styles.button,
                    coloredKeys.includes(num) && styles.yellow,
                    num === "0" && styles.zero,
                  ]}
                  key={num}
                  onPress={() => {
                    handleInput(num);
                  }}
                >
                  <Text style={styles.text}>{num}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

export default ButtonGrid;

const styles = StyleSheet.create({
  container: {
    flex: 7,
    backgroundColor: "red",
  },
  innerView: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
  },
  button: {
    borderRadius: 50,
    backgroundColor: "green",
    height: 90,
    width: 20,
    margin: 2,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  yellow: {
    backgroundColor: "yellow",
  },
  zero: {
    flexGrow: 2.5,
  },
  text: {
    fontSize: 30,
    textAlign: "center",
  },
});
