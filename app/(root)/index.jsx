import React, { useEffect, useState, useRef } from "react";
import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
} from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import Ionicon from "@expo/vector-icons/Ionicons";
import { SignOutButton } from "@/components/SignOutButton";
import { useTransaction } from "../../hooks/useTransaction";
import PageLoader from "../../components/PageLoader";
import BalanceCard from "../../components/BalanceCard";
import { TransactionItem } from "../../components/TransactionItem";
import NoTransactionsFound from "../../components/NoTransactionsFound";
import { styles } from "../../assets/styles/homes.styles";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTransactionSync } from "../../hooks/useTransactionSync";

export default function Page() {
  const { user } = useUser();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const { transactions, summary, isLoading, loadData, deleteTransaction } =
    useTransaction(user.id);

  const [filterDate, setFilterDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  // Fade + bounce animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(1)).current;

  // Use the sync hook for automatic updates
  useTransactionSync({ loadData });

  // Initial load
  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    // Sort transactions by date, newest first
    const sortedTransactions = [...transactions].sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });

    if (!filterDate) {
      setFilteredTransactions(sortedTransactions);
      return;
    }
    const selectedDay = new Date(filterDate).toDateString();
    const filtered = sortedTransactions.filter((t) => {
      const tDate = new Date(t.created_at).toDateString();
      return tDate === selectedDay;
    });
    setFilteredTransactions(filtered);
  }, [filterDate, transactions]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteTransaction(id),
        },
      ]
    );
  };

  if (isLoading && !refreshing) {
    return <PageLoader />;
  }

  const handleAddPressIn = () => {
    Animated.spring(bounceAnim, {
      toValue: 1.15,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  const handleAddPressOut = () => {
    Animated.spring(bounceAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
    router.push("/create");
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require("../../assets/images/logo1.png")}
              style={styles.headerLogo}
              resizeMode="contain"
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.usernameText}>
                {user?.emailAddresses[0]?.emailAddress.split("@")[0]}
              </Text>
            </View>
            <View style={styles.headerRight}>
              <SignOutButton />
            </View>
          </View>
        </View>

        <BalanceCard summary={summary} />

        <View style={styles.transactionsHeaderContainer}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
        </View>

        {/* Date Filter */}
        <View style={styles.transactionsHeaderContainer}>
          <TouchableOpacity
            style={styles.transactionsHeaderContainerButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Ionicon name="calendar-outline" size={18} color="#333" />
            <Text style={{ marginLeft: 6, color: "#333" }}>
              {filterDate
                ? new Date(filterDate).toLocaleDateString()
                : "Select Date"}
            </Text>
          </TouchableOpacity>
          {filterDate && (
            <TouchableOpacity onPress={() => setFilterDate(null)}>
              <Text style={{ color: "#e74c3c", fontWeight: "600" }}>Reset</Text>
            </TouchableOpacity>
          )}
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={filterDate ? new Date(filterDate) : new Date()}
            mode="date"
            display="default"
            maximumDate={new Date()}
            onChange={(event, date) => {
              setShowDatePicker(false);
              if (date) setFilterDate(date);
            }}
          />
        )}
      </Animated.View>

      <FlatList
        style={styles.transactionsList}
        contentContainerStyle={styles.transactionsListContent}
        data={filteredTransactions}
        renderItem={({ item }) => (
          <TransactionItem item={item} onDelete={handleDelete} />
        )}
        ListEmptyComponent={<NoTransactionsFound />}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      {/* Floating Add Button */}
      <Animated.View
        style={{
          position: "absolute",
          bottom: 28,
          right: 24,
          transform: [{ scale: bounceAnim }],
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPressIn={handleAddPressIn}
          onPressOut={handleAddPressOut}
          style={{
            backgroundColor: "#50349dff",
            borderRadius: 50,
            width: 60,
            height: 60,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#5B8CFF",
            shadowOpacity: 0.4,
            shadowRadius: 10,
            elevation: 6,
          }}
        >
          <Ionicon name="add" size={30} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
