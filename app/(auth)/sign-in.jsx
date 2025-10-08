import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { styles } from "../../assets/styles/auth.styles";
import { useState } from "react";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 🟢 NEW: Forgot password mode and related state
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Handle Sign In
  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      if (err.errors?.[0]?.code === "form_password_incorrect") {
        setError("Incorrect password. Please try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  // 🟢 NEW: Request password reset (step 1)
  const onForgotPassword = async () => {
    if (!emailAddress) {
      setError("Please enter your email to reset password."); // 🟢 New error
      return;
    }

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: emailAddress,
      });
      alert("Password reset code sent to your email!");
      setIsForgotMode(true); // 🟢 Switch to reset screen
    } catch (err) {
      setError(err.errors?.[0]?.message || "Unable to send reset code");
    }
  };

  // 🟢 NEW: Verify code + reset password (step 2)
  const onResetPassword = async () => {
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password: newPassword,
      });

      await setActive({ session: result.createdSessionId });
      alert("Password reset successful!");
      setIsForgotMode(false);
      setCode("");
      setNewPassword("");
    } catch (err) {
      setError(err.errors?.[0]?.message || "Invalid code or password");
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraScrollHeight={30}
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/sign_in.png")}
          style={styles.illustration}
        />
        {/* 🟢 Title changes dynamically */}
        <Text style={styles.title}>
          {isForgotMode ? "Reset Password" : "Sign in"}
        </Text>

        {error ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => setError("")}>
              <Ionicons name="close" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>
        ) : null}

        {/* 🟢 Normal Sign In */}
        {!isForgotMode ? (
          <>
            <TextInput
              style={[styles.input, error && styles.errorInput]}
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Enter email"
              placeholderTextColor="#9A8478"
              onChangeText={(email) => {
                setEmailAddress(email);
                if (error) setError(""); // 🟢 Auto clear error while typing
              }}
            />
            <TextInput
              style={[styles.input, error && styles.errorInput]}
              value={password}
              placeholder="Enter password"
              placeholderTextColor="#9A8478"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
            <TouchableOpacity onPress={onSignInPress} style={styles.button}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            {/* 🟢 Forgot Password button */}
            <TouchableOpacity
              style={styles.ForgotPasswordView}
              onPress={onForgotPassword}
            >
              <Text style={[styles.linkText, { marginTop: 15 }]}>
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Don't have an account?</Text>
              <Link href="/sign-up" asChild>
                <TouchableOpacity>
                  <Text style={styles.linkText}>Sign up</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </>
        ) : (
          /* 🟢 Forgot Password Mode UI */
          <>
            <TextInput
              style={[styles.input, error && styles.errorInput]}
              autoCapitalize="none"
              value={emailAddress}
              editable={false}
              placeholder="Email"
              placeholderTextColor="#9A8478"
            />
            <TextInput
              style={[styles.input, error && styles.errorInput]}
              value={code}
              placeholder="Enter verification code"
              placeholderTextColor="#9A8478"
              onChangeText={(val) => {
                setCode(val);
                if (error) setError(""); // 🟢 Auto clear error
              }}
            />
            <TextInput
              style={[styles.input, error && styles.errorInput]}
              value={newPassword}
              placeholder="Enter new password"
              placeholderTextColor="#9A8478"
              secureTextEntry={true}
              onChangeText={(val) => {
                setNewPassword(val);
                if (error) setError(""); // 🟢 Auto clear error
              }}
            />
            <TouchableOpacity onPress={onResetPassword} style={styles.button}>
              <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsForgotMode(false)}>
              <Text style={[styles.linkText, { marginTop: 15 }]}>
                Back to Sign In
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
}
