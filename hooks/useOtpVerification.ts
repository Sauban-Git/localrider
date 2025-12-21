
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import api from "../services/api";
import Toast from "react-native-toast-message";
import { ToastAndroid } from "react-native";

export default function useOtpVerification() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [statusPassed, setStatusPassed] = useState<"not_registered" | "verified" | "not_verified" | null>(null)

  const [isChekingStatus, setIsCheckingStatus] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  const [otpCooldown, setOtpCooldown] = useState(0);
  const [otpSendCount, setOtpSendCount] = useState(0);
  const MAX_OTP_REQUESTS = 5;

  const [otpFeedback, setOtpFeedback] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);

  // ---------------------------
  // COOL DOWN TIMER
  // ---------------------------
  useEffect(() => {
    if (otpCooldown <= 0) return;

    const interval = setInterval(() => {
      setOtpCooldown((v) => Math.max(0, v - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [otpCooldown]);

  useEffect(() => {
    const loadAuthState = async () => {
      const token = await SecureStore.getItemAsync("token");
      const rider = await SecureStore.getItemAsync("rider");

      if (token && rider) {
        setIsAuthenticated(true);
        setPhoneNumber(JSON.parse(rider).phoneNumber); // optional
      }
    };
    loadAuthState();
  }, []);
  // ---------------------------
  // SEND OTP
  // ---------------------------
  //

  const handleSendOtp = async () => {
    if (!phoneNumber || phoneNumber.length !== 10) {
      setOtpFeedback({
        type: "error",
        message: "Enter a valid 10-digit phone number.",
      });
      return;
    }

    if (otpSendCount >= MAX_OTP_REQUESTS) {
      setOtpFeedback({
        type: "error",
        message: "You have reached the OTP request limit.",
      });
      return;
    }

    if (otpCooldown > 0) {
      setOtpFeedback({
        type: "info",
        message: `Please wait ${otpCooldown}s before requesting again.`,
      });
      return;
    }

    setIsSendingOtp(true);
    setOtpFeedback(null);

    try {
      console.log(phoneNumber)
      const res = await api.post("/riders/send-otp", { phoneNumber });

      if (res.data?.success) {
        console.log(res.data)
        ToastAndroid.show(`OTP: ${res.data.devOtp}`, ToastAndroid.LONG)
        Toast.show({
          type: "success",
          text1: "Development build otp ...",
          text2: res.data.devOtp,
          position: "top",
          visibilityTime: 6000
        })

        setOtpSent(true);
        setOtpSendCount((v) => v + 1);
        setOtpCooldown(45);
        setOtpFeedback({ type: "success", message: "OTP sent successfully." });
      } else {
        setOtpFeedback({
          type: "error",
          message: res.data?.message || "Could not send OTP.",
        });
      }
    } catch (err: any) {
      console.log("didnt workl ", err)
      setOtpFeedback({
        type: "error",
        message: err?.response?.data?.message || "Failed to send OTP.",
      });
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleCheckAndSendOtp = async () => {
    if (!phoneNumber || phoneNumber.length !== 10) {
      setOtpFeedback({
        type: "error",
        message: "Enter a valid 10-digit phone number.",
      });
      return;
    }

    if (otpSendCount >= MAX_OTP_REQUESTS) {
      setOtpFeedback({
        type: "error",
        message: "You have reached the OTP request limit.",
      });
      return;
    }

    if (otpCooldown > 0) {
      setOtpFeedback({
        type: "info",
        message: `Please wait ${otpCooldown}s before requesting again.`,
      });
      return;
    }

    // Check status of rider
    try {
      setIsCheckingStatus(true)
      const res = await api.post("/riders/check-status", { phoneNumber });

      if (res.data?.success) {
        if (res.data.status === 'verified') {
          setOtpFeedback({ type: "success", message: res.data.message });
          setStatusPassed("verified")
        } else if (res.data.status === 'not_registered') {
          setStatusPassed("not_registered")
          setOtpFeedback({ type: "error", message: res.data.message })
        } else {
          setStatusPassed("not_verified")
          setOtpFeedback({ type: "info", message: res.data.message })
        }
      } else {
        setOtpFeedback({
          type: "error",
          message: res.data?.message || "You are not registered ...",
        });
      }
    } catch (err: any) {
      setOtpFeedback({
        type: "error",
        message: err?.response?.data?.message || "Failed to check status, try after some time.",
      });
    } finally {
      setIsCheckingStatus(false);
    }

    if (statusPassed !== "verified") return

    setIsSendingOtp(true);
    setOtpFeedback(null);

    try {
      const res = await api.post("/riders/send-otp", { phoneNumber });

      if (res.data?.success) {
        Toast.show({
          type: "success",
          text1: "Development build otp ...",
          text2: res.data.devOtp,
          position: "top",
          visibilityTime: 6000
        })
        setOtpSent(true);
        setOtpSendCount((v) => v + 1);
        setOtpCooldown(45);
        setOtpFeedback({ type: "success", message: "OTP sent successfully." });
      } else {
        setOtpFeedback({
          type: "error",
          message: res.data?.message || "Could not send OTP.",
        });
      }
    } catch (err: any) {
      setOtpFeedback({
        type: "error",
        message: err?.response?.data?.message || "Failed to send OTP.",
      });
    } finally {
      setIsSendingOtp(false);
    }
  };

  // ---------------------------
  // VERIFY OTP
  // ---------------------------
  //
  type Context = "application" | null | undefined
  const handleVerifyOtp = async (context?: Context) => {

    if (!otp || otp.length !== 6) {
      setOtpFeedback({
        type: "error",
        message: "Enter a valid 6-digit OTP.",
      });
      return;
    }

    setIsVerifyingOtp(true);

    try {
      const payload: Record<string, any> = {
        phoneNumber,
        otp,
      };

      if (context === "application") {
        payload.context = "application";
      }

      const res = await api.post("/riders/verify-otp", payload)

      if (res.data?.success) {
        setIsAuthenticated(true);
        setOtp("");
        setOtpSent(false);
        setOtpFeedback({
          type: "success",
          message: "Phone verified successfully.",
        });


        // Persist token, refresh token, and maybe rider info
        await SecureStore.setItemAsync("token", res.data.token);
        await SecureStore.setItemAsync("refreshToken", res.data.refreshToken);
        await SecureStore.setItemAsync("rider", JSON.stringify(res.data.rider));
        await SecureStore.setItemAsync("phoneVerified", "true"); // optional flag
      } else {
        setOtpFeedback({
          type: "error",
          message: res.data?.message || "Invalid OTP.",
        });
      }
    } catch (err: any) {
      setOtpFeedback({
        type: "error",
        message: err?.response?.data?.message || "OTP verification failed.",
      });
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  return {
    isAuthenticated,
    phoneNumber,
    otp,
    otpSent,
    otpFeedback,
    isSendingOtp,
    isVerifyingOtp,
    otpCooldown,
    otpSendCount,
    MAX_OTP_REQUESTS,
    setPhoneNumber,
    setOtp,
    handleSendOtp,
    handleCheckAndSendOtp,
    handleVerifyOtp,
    isChekingStatus,
    statusPassed,
  };
}
