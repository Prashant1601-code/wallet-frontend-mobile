import "dotenv/config";

export default {
  expo: {
    name: "WalletMe",
    slug: "mobile",
    icon: "./assets/images/apk_icon.png",

    android: {
      package: "com.prashant1601.mobile",
    },
    extra: {
      clerkPublishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
      apiUrl: process.env.EXPO_PUBLIC_API_URL,
      eas: {
        projectId: "b7da57b6-c23e-4e2a-89a9-fd6c3c6219a1",
      },
    },
  },
};
