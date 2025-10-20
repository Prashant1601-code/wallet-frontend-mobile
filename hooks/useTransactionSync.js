import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

export function useTransactionSync({ loadData }) {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      // Reload data when screen comes into focus
      loadData();
    }
  }, [isFocused, loadData]);

  return null;
}
