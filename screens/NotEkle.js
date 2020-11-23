import React from "react";
import { View, StyleSheet, Text } from "react-native";

const NotEkle = () => {
  return (
    <View style={styles.center}>
      <Text>Buradan not eklenecek.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default NotEkle;