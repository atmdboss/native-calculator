import React, { FunctionComponent } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { buttons, yellowColoredKeys, greyColoredKeys } from "../helperKeys";

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
                  activeOpacity={0.7}
                  style={[
                    styles.button,
                    yellowColoredKeys.includes(num) && styles.yellow,
                    greyColoredKeys.includes(num) && styles.grey,
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
    padding: 10,
    flex: 7,
    backgroundColor: "#000000",
  },
  innerView: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
  },
  button: {
    borderRadius: 50,
    backgroundColor: "#333333",

    height: 90,
    width: 20,
    margin: 2,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  yellow: {
    backgroundColor: "#fba022",
  },
  grey: {
    backgroundColor: "#a5a5a5",
  },
  zero: {
    flexGrow: 2.5,
  },
  text: {
    fontSize: 30,
    textAlign: "center",
    color: "whitesmoke",
  },
});
