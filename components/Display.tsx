import React, { FunctionComponent } from "react";
import { StyleSheet, Text, View } from "react-native";

const Display: FunctionComponent<{ values: string }> = ({ values }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{values}</Text>
    </View>
  );
};

export default Display;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "yellow",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  text: {
    fontSize: 40,
  },
});
