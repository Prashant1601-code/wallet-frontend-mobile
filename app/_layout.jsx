import { Slot } from "expo-router";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import Constants from "expo-constants";

import SafeScreen from "@/components/SafeScreen";
import { StatusBar } from "expo-status-bar";

const publishableKey =
  Constants.expoConfig?.extra?.clerkPublishableKey ||
  Constants.manifest?.extra?.clerkPublishableKey;

if (!publishableKey) {
  console.warn(
    "Clerk publishable key not found in Constants.expoConfig.extra. Make sure app.config.js reads .env and EAS/env vars are set when building."
  );
}

if (__DEV__) {
  // Dev-only: helps confirm the key is loaded during development
  // Remove this log before production / release builds
  // eslint-disable-next-line no-console
  console.log("Clerk publishableKey (dev):", publishableKey);
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <SafeScreen>
        <Slot />
      </SafeScreen>
      <StatusBar style="dark" />
    </ClerkProvider>
  );
}
