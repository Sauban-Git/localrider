import useOtpVerification from "@/hooks/useOtpVerification"
import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator } from "react-native"
import MyButton from "@/components/button";
import { useRouter } from "expo-router";
import api from "@/services/api";
import { useRiderInfoStore } from "@/stores/ridersInfoStore";
import { useEffect } from "react";

const Login = () => {

  const otpHook = useOtpVerification();
  const router = useRouter()
  const setRiderInfo = useRiderInfoStore((state) => state.setRiderInfo)

  const getInfo = async () => {
    try {
      const res = await api.get("/riders/me")
      if (res.data.driver) {
        const { id, name, phone, vehicle_type, avatarUrl } = res.data.driver
        console.log(otpHook.statusPassed)
        setRiderInfo({ id, name, phone, vehicle_type, avatarUrl, status: otpHook.statusPassed })
        router.replace("/(pages)/profile")
      } else {
        console.log("didnt success gettting info")
      }
    } catch {
      console.log("Error while api..")
    }
  }

  useEffect(() => {
    getInfo()
  }, [otpHook.isAuthenticated])

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
          onPress={otpHook.handleCheckAndSendOtp}
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

      {otpHook.otpFeedback && otpHook.statusPassed === "verified" && (
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

      {/* #F0FFFF #A7C7E7 */}
      {(otpHook.statusPassed !== "verified" && otpHook.statusPassed !== null) &&
        <View style={{ backgroundColor: "#ADD8E6", borderRadius: 10, borderWidth: 1, borderColor: "#87CEEB", padding: 10, marginVertical: 10 }}>
          <Text> 📝 {otpHook.statusPassed}</Text>
          <Text>{otpHook.otpFeedback?.message}</Text>
          {(otpHook.statusPassed === "not_registered") && <MyButton backgroundColor="#50C878" onPress={() => router.replace('/(register)/registerRider')} title="Become a Driver" />}
        </View>
      }

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
              onPress={() => otpHook.handleVerifyOtp()}
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
