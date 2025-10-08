import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SignOutButton } from "@/components/SignOutButton";
import { useTransaction } from "../../hooks/useTransaction";
import { useEffect, useState } from "react";
import PageLoader from "../../components/PageLoader";
import { styles } from "../../assets/styles/homes.styles";
import Ionicon from "@expo/vector-icons/Ionicons";
import BalanceCard from "../../components/BalanceCard";
import { TransactionItem } from "../../components/TransactionItem";
import NoTransactionsFound from "../../components/NoTransactionsFound";

// 🟢 NEW — import date picker
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Page() {
  const { user } = useUser();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const { transactions, summary, isLoading, loadData, deleteTransaction } =
    useTransaction(user.id);

  // 🟢 NEW — filter states
  const [filterDate, setFilterDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // 🟢 NEW — when transactions or filter date changes, apply filter
  useEffect(() => {
    if (!filterDate) {
      setFilteredTransactions(transactions);
      return;
    }
    const selectedDay = new Date(filterDate).toDateString();
    const filtered = transactions.filter((t) => {
      const tDate = new Date(t.created_at).toDateString();
      return tDate === selectedDay;
    });
    setFilteredTransactions(filtered);
  }, [filterDate, transactions]);

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

  return (
    <View style={styles.container}>
      <View style={styles.content}>
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
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => router.push("/create")}
              >
                <Ionicon name="add" size={20} color="#fffd" />
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
              <SignOutButton />
            </View>
          </View>
        </View>

        <BalanceCard summary={summary} />

        <View style={styles.transactionsHeaderContaine}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
        </View>

        {/* 🟢 NEW — Date Filter UI */}
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Ionicon name="calendar-outline" size={18} color="#444" />
            <Text style={styles.filterButtonText}>
              {filterDate
                ? new Date(filterDate).toLocaleDateString()
                : "Select Date"}
            </Text>
          </TouchableOpacity>

          {filterDate && (
            <TouchableOpacity
              style={styles.filterButtonDate}
              onPress={() => setFilterDate(null)}
            >
              <Text style={styles.filterButtonTextDate}>Reset</Text>
            </TouchableOpacity>
          )}
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={filterDate ? new Date(filterDate) : new Date()}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setShowDatePicker(false);
              if (date) setFilterDate(date);
            }}
          />
        )}
      </View>

      {/* 🟢 UPDATED — use filteredTransactions instead of transactions */}
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
    </View>
  );
}
