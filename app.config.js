import "dotenv/config";

export default {
  expo: {
    name: "WalletMe",
    slug: "mobile",
    icon: "./assets/images/apk_icon.png",

    // splash: {
    //   image: "./assets/images/apk_icon.png",
    //   resizeMode: "contain",
    //   backgroundColor: "#FFFFFF",
    // },

    android: {
      package: "com.prashant1601.mobile",
    },

    extra: {
      clerkPublishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
      apiUrl: process.env.EXPO_PUBLIC_API_URL,
      eas: {
        projectId: "d74cbbe2-747c-4459-ac7d-1e87ca7deaa1",
      },
    },
  },
};
//  projectId: "b7da57b6-c23e-4e2a-89a9-fd6c3c6219a1",
