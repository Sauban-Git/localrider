import useOtpVerification from "@/hooks/useOtpVerification"
import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, ToastAndroid } from "react-native"
import MyButton from "./button";

const Login = () => {

  const otpHook = useOtpVerification();

  return (
    <View style={{ backgroundColor: "white", justifyContent: "center", padding: 30, borderRadius: 10 }}>
      <View style={{ backgroundColor: "white", justifyContent: "center", alignContent: "center", alignItems: "center", padding: 20 }}>
        <Image source={require("@/assets/images/full_logo.png")} resizeMode="contain" style={{ width: 200, height: 50 }} />
        <Text style={{ color: "green", fontWeight: "bold", fontSize: 40 }}>Driver</Text>
        <Text style={{ textAlign: "center" }}> Sign in with your phone</Text>
      </View>

      {/* Phone Verification */}

      <Text style={{ fontSize: 14, marginBottom: 6, textAlign: "left", }}>Phone Number</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            borderRadius: 10,
            marginRight: 8,
          }}
          placeholder="10-digit number"
          keyboardType="number-pad"
          value={otpHook.phoneNumber}
          maxLength={10}
          onChangeText={otpHook.setPhoneNumber}
        />

        <TouchableOpacity
          disabled={
            !otpHook.phoneNumber ||
            otpHook.phoneNumber.length !== 10 ||
            otpHook.isSendingOtp || otpHook.isChekingStatus
            || otpHook.otpCooldown > 0 ||
            otpHook.otpSendCount >= otpHook.MAX_OTP_REQUESTS
          }
          onPress={otpHook.handleSendOtp}
          style={{
            backgroundColor: "#16a34a",
            paddingHorizontal: 14,
            paddingVertical: 10,
            borderRadius: 10,
            opacity:
              !otpHook.phoneNumber ||
                otpHook.phoneNumber.length !== 10 ||
                otpHook.isSendingOtp
                || otpHook.otpCooldown > 0 ||
                otpHook.otpSendCount >= otpHook.MAX_OTP_REQUESTS
                ? 0.5
                : 1,
          }}
        >
          {otpHook.isSendingOtp || otpHook.isChekingStatus ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={{ color: "white", fontWeight: "600" }}>
              {otpHook.otpSendCount >= otpHook.MAX_OTP_REQUESTS
                ? "Limit"
                : otpHook.otpCooldown > 0
                  ? `Wait ${otpHook.otpCooldown}s`
                  :
                  "Send OTP"
              }
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {otpHook.otpFeedback && (
        <Text
          style={{
            marginTop: 6,
            color:
              otpHook.otpFeedback?.type === "error"
                ? "red"
                : otpHook.otpFeedback?.type === "success"
                  ? "green"
                  :
                  "#555",
          }}
        >
          {otpHook.otpFeedback?.message}
        </Text>
      )}

      {otpHook.statusPassed === "not_registered" && <MyButton backgroundColor="#50C878" onPress={() => console.log("route to registration")} title="Register" />}

      {/* OTP input */}
      {otpHook.otpSent && (
        <View style={{ marginTop: 14 }}>
          <Text style={{ marginBottom: 6 }}>Enter OTP</Text>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: "#ccc",
                padding: 10,
                borderRadius: 10,
                marginRight: 8,
              }}
              placeholder="6-digit OTP"
              keyboardType="number-pad"
              value={otpHook.otp}
              maxLength={6}
              onChangeText={otpHook.setOtp}
            />

            <TouchableOpacity
              disabled={!otpHook.otp || otpHook.otp.length !== 6 || otpHook.isVerifyingOtp}
              onPress={otpHook.handleVerifyOtp}
              style={{
                backgroundColor: "#2563eb",
                paddingHorizontal: 14,
                paddingVertical: 10,
                borderRadius: 10,
                opacity: 1,
              }}
            >
              {otpHook.isVerifyingOtp ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={{ color: "white", fontWeight: "600" }}>Verify</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  )
}

export default Login
