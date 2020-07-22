import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Display from "./components/Display";
import ButtonGrid from "./components/ButtonGrid";
import { notNums, operators, memoryKeys } from "./helperKeys";

const App = () => {
  const [displayValue, setDisplayValue] = useState("");
  const [operator, setOperator] = useState("");
  // const [firstValue, setFirstValue] = useState(0);
  // const [secondValue, setSecondValue] = useState(0);
  const [addedOperator, setAddedOperator] = useState(false);

  // const acceptOnlyValues = (value: string) => {
  //   const allowed = !notNums.some((val) => val === value);
  //   return allowed ? value : "";
  // };

  const lastIsOperator = () => {
    return displayValue
      ? operators.includes(displayValue[displayValue.length - 1])
      : false;
  };
  const inputIsOperator = (input: string) => {
    return operators.includes(input);
  };
  const handleResult = () => {
    // is displayValue empty? if it is, do nada. if it isnt, check if an operation has been set. if yes, check if last is is an operator. if yes, do nothing. else
    if (displayValue) {
      if (addedOperator) {
        if (!lastIsOperator()) {
          const [first, second] = displayValue.split(operator);
          if (!second) return displayValue;
          let result: number = 0;
          if (operator === "+") {
            result = Number(first) + Number(second);
          } else if (operator === "-") {
            result = Number(first) - Number(second);
          } else if (operator === "x") {
            result = Number(first) * Number(second);
          } else if (operator === "÷") {
            result = Number(first) / Number(second);
          }
          return result.toString();
        }
      }
    }
    // setOperator("");
    // setAddedOperator(false);
    return displayValue;
  };
  const handleOperationInput = (input: string) => {
    if (addedOperator) {
      // addedOperation has been set. now we want to check if the operator is the last thing on the screen, or if it is betweeen two values already.
      // if it is last value, replace lastvalue on screen, and call setOperator with input
      // else, it is between two numbers....evaluate displayValue, replace sceen with displayed value and add input(operator) to new displayed value
      if (lastIsOperator()) {
        const newValue = displayValue.slice(0, displayValue.length - 1);
        setDisplayValue(newValue + input);
        setOperator(input);
      } else {
        // take displayValue split it into array by operator,calculate its value, and setDislayValue with result and this new operator
        setDisplayValue(() => {
          console.log("line 63");
          return handleResult() + input;
        });
        setOperator(input);
      }
    } else {
      // addedOperator has not been set, which means either, displayValue is empty, or only numbers have been input to screen
      if (displayValue) {
        setOperator(input);
        setAddedOperator(true);
        setDisplayValue((prev) => {
          console.log("line 74");
          return prev + input;
        });
      }
    }
  };

  const handleMemoryInput = (input: string) => {
    console.log(input);
  };

  const handleInput = (input: string) => {
    if (input === "AC") {
      setDisplayValue("");
      setOperator("");
      setAddedOperator(false);
    } else if (input === "=") {
      setDisplayValue(handleResult());
    } else if (inputIsOperator(input)) {
      handleOperationInput(input);
    } else if (memoryKeys.includes(input)) {
      handleMemoryInput(input);
    } else {
      // if it gets here, then it's just a number, setState with it regardless
      if (input === "0") {
        if (displayValue) {
          setDisplayValue((prev) => prev + input);
        }
      } else {
        setDisplayValue((prev) => prev + input);
      }
    }

    /*
    is input an operator?
    handleOperationInput(input);*********
    1. yes - has operator been set?
        1. yes - do NOT add operator to screen,but updateOperator,replace operator on screen
        2. no - does displayValue exist(""?)
              1. yes - set display value as first value,setOperator,setAddedOperator 
              2. no - do nothing
    2. no - its a number. setdisplayedvalue with it
    */
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
