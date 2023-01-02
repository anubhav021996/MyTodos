import axios from "axios";
import { useState, useEffect } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigate } from "react-router-dom";
import { wp } from "../../Utilis/Scale";
import { BASE_URL } from "@env";
import { useSelector } from "react-redux";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpRec, setOtpRec] = useState(false);
  const [otpReq, setOtpReq] = useState(false);
  const [resend, setResend] = useState(false);
  const [otpSend, setOtpSend] = useState(false);
  const [time, setTime] = useState(60);
  const Navigate = useNavigate();
  const { token } = useSelector((store) => store);

  const requestOtp = () => {
    setOtpReq(true);
    setResend(false);
    setTime(5);
    axios
      .post(`${BASE_URL}/email`, {
        email: email,
        type: "reset",
      })
      .then((res) => {
        setOtpRec(true);
        console.log(res.data);

        let id = setInterval(() => {
          setTime((t) => {
            if (t == 1) {
              clearInterval(id);
              setResend(true);
            }
            return t - 1;
          });
        }, 1000);
      })
      .catch((e) => {
        if (e.response.data.errors)
          return wp(100) < 425
            ? Alert.alert(e.response.data.errors[0].msg)
            : alert(e.response.data.errors[0].msg);
        wp(100) < 425 ? Alert.alert(e.response.data) : alert(e.response.data);
      })
      .finally(() => setOtpReq(false));
  };

  const verifyOtp = () => {
    setOtpSend(true);
    axios
      .post(`${BASE_URL}/otp`, {
        email: email,
        otp: otp,
      })
      .then((res) =>
        Navigate("/reset", { state: { token: res.data, email: email } })
      )
      .catch((e) => {
        if (e.response.data.errors)
          return wp(100) < 425
            ? Alert.alert(e.response.data.errors[0].msg)
            : alert(e.response.data.errors[0].msg);
        wp(100) < 425 ? Alert.alert(e.response.data) : alert(e.response.data);
      })
      .finally(() => setOtpSend(false));
  };

  useEffect(() => {
    if (token) return Navigate("/");
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Forgot Password?</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
        disabled={otpReq || otpRec}
      />
      <Button
        title="Request Otp"
        onPress={requestOtp}
        disabled={otpReq || otpRec}
      />

      {otpRec && (
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otp}
            placeholder="Enter OTP"
            keyboardType="numeric"
            maxLength="4"
            onChangeText={(text) => setOtp(text)}
            disabled={otpSend}
          />
          {resend ? (
            <Text style={styles.resend} onPress={requestOtp}>
              Resend Otp
            </Text>
          ) : (
            <Text style={styles.resendTime}>{`Resend otp in ${time} sec`}</Text>
          )}
          <Button disabled={otpSend} title="Verify Otp" onPress={verifyOtp} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: "auto",
    textAlign: "center",
    marginTop: 50,
    gap: 20,
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    padding: 50,
  },
  heading: {
    fontSize: "xx-large",
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: wp(100) < 425 ? 200 : 400,
    borderWidth: 1,
    padding: 10,
    margin: "auto",
  },
  otpBox: {
    marginTop: 20,
    width: wp(100) < 425 ? 150 : 200,
    margin: "auto",
    gap: 10,
  },
  otp: {
    width: wp(100) < 425 ? 150 : 200,
    borderWidth: 1,
    padding: 10,
    margin: "auto",
  },
  resendTime: {
    marginTop: -10,
    fontSize: "smaller",
  },
  resend: {
    marginTop: -10,
    fontSize: "smaller",
    color: "#2196f3",
    cursor: "pointer",
  },
});
