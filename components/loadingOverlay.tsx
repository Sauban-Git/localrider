
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  ActivityIndicator,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function LoadingOverlay() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
      <View style={styles.card}>
        <ActivityIndicator size="large" color="#2ecc71" />
        <Text style={styles.text}>Fetching your information…</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  card: {
    backgroundColor: "#ffffff",
    paddingVertical: 30,
    paddingHorizontal: 34,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "600",
    color: "#2ecc71",
    textAlign: "center",
  },
});
