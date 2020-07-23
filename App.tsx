import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import Display from "./components/Display";
import ButtonGrid from "./components/ButtonGrid";
import { operators, memoryKeys } from "./helperKeys";

const App = () => {
  const [displayValue, setDisplayValue] = useState("");
  const [operator, setOperator] = useState("");
  const [memory, setMemory] = useState("");
  const [addedOperator, setAddedOperator] = useState(false);

  const lastIsOperator = () => {
    return displayValue
      ? operators.includes(displayValue[displayValue.length - 1])
      : false;
  };
  const inputIsOperator = (input: string) => {
    return operators.includes(input);
  };
  const handleNumberFlip = () => {
    if (displayValue) {
      if (lastIsOperator()) {
        let value = displayValue.slice(0, displayValue.length - 1).replace(
          /[()]/g,
          "",
        );
        if (value.includes("—")) {
          // its anegative number
          value = value.replace("—", "-");
        }
        const num = Number(value);
        // operator exists if lastIsOperator
        if (Math.sign(num) === 1) {
          // positive number
          setDisplayValue(`(—${num.toString()})${operator}`);
        } else {
          // negative number
          setDisplayValue(Math.abs(num).toString() + operator);
        }
      } else {
        // either there is one set of numbers or two sets of numbers
        if (operator) {
          // display is two values
          let [first, second] = displayValue.split(operator);
          // console.log({ first, second });

          let value = second.replace(/[()]/g, "");
          // operator exists if lastIsOperator
          if (value.includes("—")) {
            // its anegative number
            value = value.replace("—", "-");
          }
          const num = Number(value);
          if (Math.sign(num) === 1) {
            // positive number
            setDisplayValue(`${first}${operator}(—${num.toString()})`);
          } else {
            // negative number
            setDisplayValue(first + operator + Math.abs(num).toString());
          }
        } else {
          // display is one number
          let value = displayValue.replace(/[()]/g, "");
          if (value.includes("—")) {
            // its a negative number
            value = value.replace("—", "-");
          }
          const num = Number(value);
          if (Math.sign(num) === 1) {
            setDisplayValue(`(—${num.toString()})`);
          } else {
            setDisplayValue(Math.abs(num).toString());
          }
        }
      }
    }
  };
  const handleResult = () => {
    // is displayValue empty? if it is, do nada. if it isnt, check if an operation has been set. if yes, check if last is is an operator. if yes, do nothing. else
    if (displayValue) {
      if (addedOperator) {
        if (!lastIsOperator()) {
          let [first, second] = displayValue.split(operator);

          if (first) {
            first = first.replace(/[()]/g, "");
            if (first.includes("—")) {
              first = first.replace("—", "-");
            }
            if (first.includes("%")) {
              first = first.slice(0, first.length - 1);
              first = (Number(first) / 100).toString();
            }
          }
          if (second) {
            second = second.replace(/[()]/g, "");
            if (second.includes("—")) {
              second = second.replace("—", "-");
            }
            if (second.includes("%")) {
              second = second.slice(0, second.length - 1);
              second = (Number(second) / 100).toString();
            }
          }

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
          if (Number.isNaN(result)) {
            Alert.alert("Error", "Operation not allowed");
            setOperator("");
            setAddedOperator(false);
            return "";
          } else {
            if (result < 0) {
              return result.toString().replace("-", "—");
            } else {
              return result.toString();
            }
          }
        }
      } else {
        if (displayValue.includes("%")) {
          let value = displayValue.replace(/[()]/g, "").slice(
            0,
            displayValue.length - 1,
          );
          if (value.includes("—")) {
            value = value.replace("—", "-");
          }
          value = (Number(value) / 100).toString();
          if (Number.isNaN(Number(value))) {
            Alert.alert("Error", "Operation not allowed");
            setOperator("");
            setAddedOperator(false);
            return "";
          } else {
            if (Number(value) < 0) {
              return value.replace("-", "—");
            } else {
              return value;
            }
          }
        }
      }
    }
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
          return prev + input;
        });
      }
    }
  };

  const handleMemoryInput = (input: string) => {
    if (input === "mc") {
      setMemory("");
      Alert.alert("Clear", "Memory cleared");
    } else if (input === "mr") {
      if (memory) {
        if (lastIsOperator()) {
          setDisplayValue((prev) => prev + memory);
        } else {
          setDisplayValue(memory);
        }
      } else {
        Alert.alert(
          "Empty",
          "Nothing in memory. Try tapping a number and then tapping 'm+'",
        );
      }
    } else if (input === "m+") {
      if (!lastIsOperator()) {
        const result = handleResult();
        const resultNum = Number(result) + Number(memory);
        if (resultNum !== 0) {
          setMemory(resultNum.toString());
          Alert.alert(
            "Added to memory",
            `Memory now contains ${resultNum.toString()}`,
          );
        }
      }
    } else if (input === "m-") {
      if (!lastIsOperator()) {
        const result = handleResult();
        const resultNum = Math.abs(Number(memory) - Number(result));
        setMemory(resultNum.toString());
        Alert.alert(
          "Subtracted from memory",
          `Memory now contains ${resultNum.toString()}`,
        );
      }
    }
  };

  const handleInput = (input: string) => {
    if (input === "AC") {
      setDisplayValue("");
      setOperator("");
      setAddedOperator(false);
    } else if (input === "=") {
      setDisplayValue(handleResult());
      setOperator("");
      setAddedOperator(false);
    } else if (input === "+/-") {
      handleNumberFlip();
    } else if (inputIsOperator(input)) {
      handleOperationInput(input);
    } else if (memoryKeys.includes(input)) {
      handleMemoryInput(input);
    } else {
      // if it gets here, then it's likely just a number, setState with it regardless
      if (displayValue.length < 16) {
        if (input === "0" || input === "%" || input === ".") {
          if (displayValue) {
            setDisplayValue((prev) => prev + input);
          } else {
            if (input === ".") {
              setDisplayValue("0.");
            }
          }
        } else {
          if (displayValue === "0") {
            setDisplayValue(input);
          } else {
            setDisplayValue((prev) => prev + input);
          }
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
  },
});

export default App;
