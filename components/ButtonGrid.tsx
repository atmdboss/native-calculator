import React, { FunctionComponent } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  NativeTouchEvent,
  NativeSyntheticEvent,
} from "react-native";

const butt: string[][] = [
  ["AC", "^", "%", "÷"],
  ["mc", "mr", "m-", "m+"],
  ["7", "8", "9", "x"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ",", "="],
];

type BGProps = {
  handleInput: Function;
};

const ButtonGrid: FunctionComponent<BGProps> = ({ handleInput }) => {
  return (
    <View style={styles.container}>
      {butt.map((numArr, index) => {
        return (
          <View style={styles.innerView} key={index + 4000}>
            {numArr.map((num) => {
              return (
                <TouchableOpacity
                  style={[styles.button, styles.round]}
                  key={num}
                  onPress={(e: NativeSyntheticEvent<NativeTouchEvent>) => {
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
  rect: {
    // width: 100,
  },
  round: {
    // width: 50,
  },
  text: {
    fontSize: 30,
    textAlign: "center",
  },
});
