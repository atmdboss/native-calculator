import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "./components/Button";
import Display from "./components/Display";
import ButtonGrid from "./components/ButtonGrid";

const operators: string[] = ["AC", "mc", "mr", "m-", "m+", "="];
// const operators: string[] = ["AC", "mc", "mr", "m-", "m+", "="];

const App = () => {
  const [values, setValues] = useState("");

  const acceptOnlyValues = (value: string) => {
    const allowed = !operators.some((val) => val === value);
    // if (allowed) {
    //   return value;
    //   // setValues((prev: string) => prev + value);
    // }
    return allowed ? value : "";
  };

  const lastIsOperator = () => {
    const operators = ["+", "-", "x", "÷"];
    return values ? operators.includes(values[values.length - 1]) : false;
  };
  const valueIsOperator = (val: string) => {
    const operators = ["+", "-", "x", "÷"];
    return operators.includes(val);
  };

  const handleInput = (val: string) => {
    /*
    acceptOnlyValues should return values allowed to another function that should 
    determine if the last string in "value" is an operator.if an operator, do not update state
    */
    if (val === "AC") {
      setValues("");
    }
    if (lastIsOperator()) {
      if (valueIsOperator(val)) {
        return;
      } else {
        setValues((prev) => acceptOnlyValues(prev + val));
      }
    } else {
      setValues((prev) => acceptOnlyValues(prev + val));
    }
  };

  return (
    <View style={styles.container}>
      <Display values={values} />
      <ButtonGrid handleInput={handleInput} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
// backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",

export default App;
