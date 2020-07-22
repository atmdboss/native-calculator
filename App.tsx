import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Display from "./components/Display";
import ButtonGrid from "./components/ButtonGrid";
import { notNums, operators } from "./helperKeys";

const App = () => {
  const [displayValue, setDisplayValue] = useState("");

  const acceptOnlyValues = (value: string) => {
    const allowed = !notNums.some((val) => val === value);
    return allowed ? value : "";
  };

  const lastIsOperator = () => {
    return displayValue
      ? operators.includes(displayValue[displayValue.length - 1])
      : false;
  };
  const inputIsOperator = (input: string) => {
    return operators.includes(input);
  };

  const handleInput = (input: string) => {
    if (input === "AC") {
      setDisplayValue("");
    } else if (input === "=") {
      // solve stuff
      // setValues(eval(values));
      console.log("calculating value...");
    } else {
      if (!inputIsOperator(input)) {
        // if input is not an operator,add it to display value
        setDisplayValue((prev) => prev + input);
      } else {
        // if it is an operator, check if last character in value is an operator as well
        if (!lastIsOperator() && displayValue) {
          // if the last character is not an operator, add current operator
          setDisplayValue((prev) => prev + input);
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Display values={displayValue} />
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

export default App;
