import type { Expense } from "../types/expense";

export const initialExpenses: Expense[] = [
  // August 2026 (Current Month)
  { id: "exp-807", title: "Weekend Cinema IMAX", amount: 1400, category: "Entertainment", date: "2026-08-20", paymentMethod: "UPI" },
  { id: "exp-806", title: "Tech Gadgets & Headphones", amount: 6200, category: "Shopping", date: "2026-08-19", paymentMethod: "Credit Card" },
  { id: "exp-805", title: "Weekend Brunch & Dinners", amount: 4400, category: "Food", date: "2026-08-17", paymentMethod: "UPI" },
  { id: "exp-804", title: "Ola & Petrol Refill", amount: 2100, category: "Transport", date: "2026-08-13", paymentMethod: "UPI" },
  { id: "exp-803", title: "Electricity & Gas Bill", amount: 2550, category: "Bills", date: "2026-08-09", paymentMethod: "Credit Card" },
  { id: "exp-802", title: "Blinkit & Nature's Basket", amount: 5600, category: "Food", date: "2026-08-05", paymentMethod: "UPI" },
  { id: "exp-801", title: "Monthly Apartment Rent", amount: 15000, category: "Housing", date: "2026-08-01", paymentMethod: "NetBanking" },

  // July 2026
  { id: "exp-708", title: "Dental Cleaning", amount: 2000, category: "Health", date: "2026-07-29", paymentMethod: "UPI" },
  { id: "exp-707", title: "Netflix & YouTube Premium", amount: 899, category: "Entertainment", date: "2026-07-27", paymentMethod: "Auto-Debit" },
  { id: "exp-706", title: "Monsoon Wardrobe Sale", amount: 4800, category: "Shopping", date: "2026-07-24", paymentMethod: "Credit Card" },
  { id: "exp-705", title: "Swiggy & Fine Dining", amount: 4200, category: "Food", date: "2026-07-20", paymentMethod: "UPI" },
  { id: "exp-704", title: "Uber Daily Rides", amount: 1900, category: "Transport", date: "2026-07-15", paymentMethod: "UPI" },
  { id: "exp-703", title: "Electricity & Water Bill", amount: 2450, category: "Bills", date: "2026-07-11", paymentMethod: "Credit Card" },
  { id: "exp-702", title: "Instamart Groceries", amount: 5300, category: "Food", date: "2026-07-05", paymentMethod: "UPI" },
  { id: "exp-701", title: "Monthly Apartment Rent", amount: 15000, category: "Housing", date: "2026-07-01", paymentMethod: "NetBanking" },

  // June 2026
  { id: "exp-607", title: "Concert Ticket", amount: 2500, category: "Entertainment", date: "2026-06-28", paymentMethod: "UPI" },
  { id: "exp-606", title: "Nike Running Shoes", amount: 5200, category: "Shopping", date: "2026-06-25", paymentMethod: "Credit Card" },
  { id: "exp-605", title: "Restaurant Dinner & Coffee", amount: 3900, category: "Food", date: "2026-06-21", paymentMethod: "UPI" },
  { id: "exp-604", title: "Metro Pass & Auto Rickshaw", amount: 1750, category: "Transport", date: "2026-06-16", paymentMethod: "UPI" },
  { id: "exp-603", title: "Electricity & Wi-Fi Bill", amount: 2600, category: "Bills", date: "2026-06-10", paymentMethod: "Credit Card" },
  { id: "exp-602", title: "Monthly Groceries & Veggies", amount: 5100, category: "Food", date: "2026-06-06", paymentMethod: "UPI" },
  { id: "exp-601", title: "Monthly Apartment Rent", amount: 15000, category: "Housing", date: "2026-06-01", paymentMethod: "NetBanking" },

  // May 2026
  { id: "exp-508", title: "Doctor Checkup & Meds", amount: 1800, category: "Health", date: "2026-05-29", paymentMethod: "UPI" },
  { id: "exp-507", title: "Gaming & Subscriptions", amount: 1200, category: "Entertainment", date: "2026-05-27", paymentMethod: "Credit Card" },
  { id: "exp-506", title: "Amazon Gadgets & Accessories", amount: 4100, category: "Shopping", date: "2026-05-24", paymentMethod: "Credit Card" },
  { id: "exp-505", title: "Zomato & Dinner with Friends", amount: 3600, category: "Food", date: "2026-05-20", paymentMethod: "UPI" },
  { id: "exp-504", title: "Fuel & Cab Rides", amount: 1800, category: "Transport", date: "2026-05-15", paymentMethod: "UPI" },
  { id: "exp-503", title: "High Summer Electricity Bill", amount: 2900, category: "Bills", date: "2026-05-11", paymentMethod: "Credit Card" },
  { id: "exp-502", title: "Supermarket Groceries", amount: 4800, category: "Food", date: "2026-05-05", paymentMethod: "UPI" },
  { id: "exp-501", title: "Monthly Apartment Rent", amount: 15000, category: "Housing", date: "2026-05-01", paymentMethod: "NetBanking" },

  // April 2026
  { id: "exp-408", title: "Gym Membership Monthly", amount: 1500, category: "Health", date: "2026-04-28", paymentMethod: "UPI" },
  { id: "exp-407", title: "Movie Premiere & Popcorn", amount: 950, category: "Entertainment", date: "2026-04-26", paymentMethod: "UPI" },
  { id: "exp-406", title: "Zara Clothing", amount: 3400, category: "Shopping", date: "2026-04-22", paymentMethod: "Credit Card" },
  { id: "exp-405", title: "Swiggy & Weekend Cafe", amount: 3100, category: "Food", date: "2026-04-19", paymentMethod: "UPI" },
  { id: "exp-404", title: "Uber & Fuel", amount: 1600, category: "Transport", date: "2026-04-14", paymentMethod: "UPI" },
  { id: "exp-403", title: "Electricity & AC Maintenance", amount: 2300, category: "Bills", date: "2026-04-10", paymentMethod: "Credit Card" },
  { id: "exp-402", title: "Supermarket Groceries", amount: 4500, category: "Food", date: "2026-04-04", paymentMethod: "UPI" },
  { id: "exp-401", title: "Monthly Apartment Rent", amount: 15000, category: "Housing", date: "2026-04-01", paymentMethod: "NetBanking" },

  // March 2026
  { id: "exp-308", title: "Pharmacy & Health Supplements", amount: 1100, category: "Health", date: "2026-03-28", paymentMethod: "UPI" },
  { id: "exp-307", title: "Netflix & Spotify Subscription", amount: 799, category: "Entertainment", date: "2026-03-25", paymentMethod: "Auto-Debit" },
  { id: "exp-306", title: "Amazon Summer Essentials", amount: 2200, category: "Shopping", date: "2026-03-22", paymentMethod: "Credit Card" },
  { id: "exp-305", title: "Weekend Dining & Swiggy", amount: 2800, category: "Food", date: "2026-03-18", paymentMethod: "UPI" },
  { id: "exp-304", title: "Uber & Metro Commute", amount: 1450, category: "Transport", date: "2026-03-15", paymentMethod: "UPI" },
  { id: "exp-303", title: "Electricity & Water Bill", amount: 1850, category: "Bills", date: "2026-03-10", paymentMethod: "Credit Card" },
  { id: "exp-302", title: "Supermarket Groceries", amount: 4200, category: "Food", date: "2026-03-05", paymentMethod: "UPI" },
  { id: "exp-301", title: "Monthly Apartment Rent", amount: 15000, category: "Housing", date: "2026-03-01", paymentMethod: "NetBanking" },
];

export const expenses = initialExpenses;