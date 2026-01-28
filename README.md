# 💸 CashFlow - Personal Finance Tracker

<div align="center">

![CashFlow Banner](https://img.shields.io/badge/CashFlow-Personal_Finance-4CAF50?style=for-the-badge&logo=cashapp&logoColor=white)

**Take Control of Your Financial Life**

[![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-000020?style=flat&logo=expo&logoColor=white)](https://expo.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[📱 Download APK](https://expo.dev/artifacts/eas/uggEQqK4rnxFDeutdiVBDt.apk) • [🐛 Report Bug](https://github.com/Anjana-Hesh/Cash_Flow/issues) • [✨ Request Feature](https://github.com/Anjana-Hesh/Cash_Flow/issues)

</div>

---

## 📖 About CashFlow

CashFlow is a modern, feature-rich mobile application designed to help you track your daily income and expenses effortlessly. Built with React Native (Expo) and powered by Firebase, it provides real-time synchronization, insightful analytics, and an intuitive interface to help you make smarter financial decisions.

Whether you're managing multiple wallets, tracking spending patterns, or analyzing your financial health, CashFlow has you covered with powerful features wrapped in a beautiful, dark-themed interface.

---

## ✨ Key Features

### 🔐 **Authentication & Security**
- **Secure Login/Signup**: Firebase Authentication ensures your data is protected
- **User Profile Management**: Customize your profile with name, email, and profile picture
- **Privacy Controls**: Comprehensive privacy policy and settings management

### 💰 **Transaction Management**
- **Quick Transaction Entry**: Add income and expense transactions in seconds
- **Category-Based Organization**: Organize transactions with predefined categories (Food, Rent, Entertainment, Transport, Healthcare, etc.)
- **Receipt Uploads**: Attach receipt photos to transactions using Cloudinary integration
- **Transaction History**: View all your transactions with detailed information
- **Smart Search**: Powerful search functionality to find transactions by category, note, amount, or date

### 🏦 **Wallet Management**
- **Multiple Wallets**: Create and manage different wallets (Cash, Savings, Credit Cards, etc.)
- **Individual Balances**: Track balance for each wallet separately
- **Wallet Analytics**: See income and expenses per wallet
- **Easy Switching**: Switch between wallets seamlessly

### 📊 **Visual Analytics & Insights**
- **Monthly Trends**: Line charts showing spending patterns over the year
- **Category Breakdown**: Interactive pie charts displaying expenses by category
- **Income vs Expense**: Visual comparison of your financial flow
- **Real-time Updates**: All charts update instantly as you add transactions

### 👤 **Profile & Settings**
- **Profile Management**: Edit your name, email, and profile picture
- **Settings Panel**: Customize app preferences and notifications
- **Privacy Policy**: Built-in privacy policy page
- **About Section**: Learn more about the app and its features

### ☁️ **Cloud Integration**
- **Real-time Sync**: Instant data synchronization across all your devices using Firebase Firestore
- **Cloud Backup**: Your data is safely stored in the cloud
- **Offline Support**: Continue using the app even without internet connectivity

### 🎨 **Modern UI/UX**
- **Dark Theme**: Beautiful dark-themed interface that's easy on the eyes
- **Smooth Animations**: Powered by React Native Reanimated
- **Responsive Design**: Optimized for all screen sizes
- **Intuitive Navigation**: Easy-to-use bottom tab navigation

---

## 📱 Screenshots

<div align="center">

### Welcome & Authentication
| Welcome Screen | Login | Register |
|:---:|:---:|:---:|
| ![Welcome](/assets/ScreenShots/welcom%20Cash%20Flow.jpeg) | ![Login](/assets/ScreenShots/Login%20Cash%20Flow.jpeg) | ![Register](/assets/ScreenShots/Sign%20Up%20Cash%20Flow.jpeg) |
| *Onboarding experience* | *Secure user login* | *New account creation* |

### Main Dashboard
| Home Dashboard | Statistics | Wallet Page |
|:---:|:---:|:---:|
| ![Home](/assets/ScreenShots/Home%20Cash%20Flow.jpeg) | ![Statistics](/assets/ScreenShots/statistics%20Cash%20Flow.jpeg) | ![Wallet](/assets/ScreenShots/Wallet%20Cash%20Flow.jpeg) |
| *Financial overview* | *Visual analytics* | *Wallet management* |

### Transaction Management
| Add Transaction Modal | Transaction List | Transaction Details |
|:---:|:---:|:---:|
| ![Add Transaction](/assets/ScreenShots/Transaction%20Page%20Cash%20Flow.jpeg) |
| *Quick transaction entry* | *Complete history* | *Detailed view* |

### Profile & Modals
| Profile Page | Edit Profile Modal | Settings Modal | Privacy Policy |
|:---:|:---:|:---:|:---:|
| ![Profile](/assets/ScreenShots/Profile%20Cash%20Flow.jpeg) |
| *User profile* | *Update information* | *App preferences* | *Privacy details* |

### Additional Features
| Wallet Modal | Image Upload | Custom Tab Bar |
| *Add/edit wallets* | *Receipt attachment* | *Navigation* |

</div>

---

## 🛠️ Tech Stack

### **Frontend**
- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform and build tools
- **NativeWind** - Tailwind CSS for React Native
- **TypeScript** - Type-safe development
- **React Navigation** - Navigation library
- **React Native Reanimated** - Smooth animations
- **Context API** - State management (AuthContext, LoaderContext)

### **Backend & Services**
- **Firebase Authentication** - User authentication and management
- **Firebase Firestore** - Real-time NoSQL database
- **Cloudinary** - Image hosting and management

### **Data Visualization**
- **React Native Chart Kit** - Beautiful charts and graphs
- **Victory Native** - Advanced data visualization

### **Icons & UI Components**
- **Phosphor React Native** - Beautiful icon library
- **React Native Elements** - UI component library

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Android Studio (for Android development) or Xcode (for iOS development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Anjana-Hesh/Cash_Flow.git
   cd Cash_Flow
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables**
   
   Create a `.env` file in the root directory with the following variables:
   ```env
   # Firebase Configuration
   EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
   
   # Cloudinary Configuration
   EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   EXPO_PUBLIC_CLOUDINARY_API_KEY=your_cloudinary_api_key
   EXPO_PUBLIC_CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Start the development server**
   ```bash
   npx expo start
   # or
   npm start
   ```

5. **Run on device/emulator**
   - Press `a` for Android
   - Press `i` for iOS
   - Scan QR code with Expo Go app on your physical device

---

## 📦 Building for Production

### Android APK

Build a production APK using Expo Application Services (EAS):

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to your Expo account
eas login

# Configure your project
eas build:configure

# Build for Android
eas build --platform android --profile preview

# For production build
eas build --platform android --profile production
```

### iOS (macOS only)

```bash
# Build for iOS
eas build --platform ios --profile preview
```

---

## 📱 Download the App

### Android
[![Download APK](https://img.shields.io/badge/Download-APK-3DDC84?style=for-the-badge&logo=android&logoColor=white)](https://expo.dev/artifacts/eas/uggEQqK4rnxFDeutdiVBDt.apk)

**Direct Download Link**: [CashFlow.apk](https://expo.dev/artifacts/eas/uggEQqK4rnxFDeutdiVBDt.apk)

### iOS
Coming soon to the App Store!

---

## 🗂️ Project Structure

```
cashflow-app/
├── app/                          # Main application code
│   ├── (dashboard)/              # Bottom tab navigation screens
│   │   ├── _layout.tsx           # Tab navigation layout
│   │   ├── home.tsx              # Home dashboard
│   │   ├── statistics.tsx        # Analytics and charts
│   │   ├── wallet.tsx            # Wallet management
│   │   └── profile.tsx           # User profile
│   ├── (auth)/                   # Authentication screens
│   │   ├── login.tsx             # User login
│   │   ├── register.tsx          # User registration
│   │   └── Welcome.tsx           # Welcome/onboarding screen
│   ├── (model)/                  # Modal screens for data management
│   │   ├── privacyPolicy.tsx     # Privacy policy modal
│   │   ├── profileModel.tsx      # Edit profile modal
│   │   ├── settingsModel.tsx     # Settings modal
│   │   ├── transactionModel.tsx  # Add/edit transaction modal
│   │   └── walletModel.tsx       # Add/edit wallet modal
│   ├── index.tsx                 # App entry point
│   └── _layout.tsx               # Root layout configuration
├── components/                   # Reusable UI components
│   ├── BackButton.tsx            # Navigation back button
│   ├── Button.tsx                # Custom button component
│   ├── CustomTabBar.tsx          # Custom bottom tab bar
│   ├── Header.tsx                # Screen header component
│   ├── HomeCard.tsx              # Dashboard card component
│   ├── ImagePickerModel.tsx      # Image picker modal
│   ├── ImageUpload.tsx           # Image upload component
│   ├── Input.tsx                 # Custom input field
│   ├── Loading.tsx               # Loading spinner component
│   ├── ModelWrapper.tsx          # Modal wrapper component
│   ├── ScreenWrapper.tsx         # Screen wrapper component
│   ├── TransactionList.tsx       # Transaction list component
│   ├── Typo.tsx                  # Typography component
│   └── WalletListItem.tsx        # Wallet list item component
├── context/                      # React Context providers
│   ├── AuthContext.tsx           # Authentication context
│   └── LoaderContext.tsx         # Global loader context
├── services/                     # Business logic & API services
│   ├── firebaseConfig.ts         # Firebase initialization
│   └── auth.service.ts           # Authentication service
├── constants/                    # App-wide constants
│   ├── index.ts                  # Cloudinary configuration
│   ├── data.ts                   # Category details & static data
│   └── theme.ts                  # Theme colors & styling constants
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts                # Authentication hook
│   ├── useFetchData.ts           # Generic data fetching hook
│   ├── useFetchTransaction.ts    # Transaction data hook
│   └── useLoader.ts              # Global loader hook
├── utils/                        # Utility functions
│   ├── imageUtil.ts              # Image processing utilities
│   ├── styling.ts                # Styling helper functions
│   ├── user.ts                   # User-related utilities
│   └── walletUtil.ts             # Wallet calculation utilities
├── types.ts                      # TypeScript type definitions
└── assets/                       # Static assets (images, fonts, etc.)
```

---

## 🎯 Core Functionalities

### Authentication & User Management
- **Welcome Screen**: Onboarding experience for new users
- **User Registration**: Create new account with email and password
- **Secure Login**: Firebase-powered authentication
- **Profile Management**: Edit name, email, and profile picture via modal
- **Settings Modal**: Customize app preferences and account settings
- **Privacy Policy**: Built-in privacy policy accessible via modal

### Transaction Management
- **Add Transactions**: Quick modal interface for adding income/expenses
- **Transaction Categories**: Organized categories (Food, Rent, Entertainment, Transport, Healthcare, Shopping, Education, Utilities, Other)
- **Receipt Uploads**: Attach photos using Cloudinary integration
- **Edit Transactions**: Modify existing transactions via modal
- **Transaction List**: Comprehensive view with filtering options
- **Real-time Updates**: Instant synchronization across devices

### Wallet System
- **Multiple Wallets**: Create and manage different wallets (Cash, Bank Account, Credit Card, Savings)
- **Wallet Modal**: Add/edit wallets with custom names and initial balances
- **Individual Balances**: Track balance for each wallet separately
- **Wallet Overview**: View all wallets on dedicated wallet page
- **Transaction Assignment**: Link each transaction to a specific wallet

### Analytics Dashboard (Statistics Page)
- **Monthly Trends**: Line charts showing spending patterns over time
- **Category Breakdown**: Interactive pie charts displaying expenses by category
- **Income vs Expense**: Visual comparison of financial flow
- **Period Analysis**: View statistics for different time periods
- **Real-time Charts**: All visualizations update instantly

### Home Dashboard
- **Overview Cards**: Quick glance at total balance, income, and expenses
- **Recent Transactions**: Latest transaction activity
- **Quick Actions**: Fast access to add transaction and manage wallets
- **Financial Summary**: Current month's financial snapshot

### Profile & Settings
- **Profile Page**: View user information and account details
- **Edit Profile Modal**: Update name, email, and profile picture
- **Settings Modal**: Configure app preferences and notifications
- **Privacy Policy Modal**: Access privacy information
- **Logout**: Secure sign out functionality

### Context-Based State Management
- **AuthContext**: Global authentication state management
- **LoaderContext**: Centralized loading state for smooth UX
- **Custom Hooks**: Reusable data fetching and state logic
  - `useAuth`: Authentication operations
  - `useFetchData`: Generic data fetching
  - `useFetchTransaction`: Transaction-specific data
  - `useLoader`: Global loading state control

---

## 🔧 Utilities & Helpers

The app includes a comprehensive set of utility functions to handle common operations:

### Image Processing (`imageUtil.ts`)
- Image compression and optimization
- Format conversion
- Upload to Cloudinary
- Image validation and error handling

### Styling Utilities (`styling.ts`)
- Reusable style functions
- Responsive design helpers
- Theme-aware styling utilities
- Common layout patterns

### User Utilities (`user.ts`)
- User data formatting
- Profile validation
- User session management
- Avatar generation helpers

### Wallet Utilities (`walletUtil.ts`)
- Balance calculations
- Transaction aggregation
- Wallet balance updates
- Multi-wallet computations
- Income/expense categorization

---

## 🔒 Privacy & Security

CashFlow takes your privacy seriously:
- All data is encrypted in transit and at rest
- Firebase Authentication ensures secure login
- Your financial data is never shared with third parties
- Optional biometric authentication (coming soon)
- Regular security updates

Read our full [Privacy Policy](docs/PRIVACY_POLICY.md) for more details.

---

## 🗺️ Roadmap

### Phase 1 (Current)
- [x] User authentication
- [x] Transaction management
- [x] Wallet system
- [x] Basic analytics
- [x] Profile management

### Phase 2 (In Progress)
- [ ] Multi-currency support
- [ ] Budget setting and alerts
- [ ] Recurring transactions
- [ ] Export data (CSV/PDF)
- [ ] Dark/Light theme toggle

### Phase 3 (Planned)
- [ ] Biometric authentication (Fingerprint/FaceID)
- [ ] Bill reminders and notifications
- [ ] Split expenses with friends
- [ ] Investment tracking
- [ ] Financial goals and savings targets
- [ ] Receipt OCR (automatic data extraction)
- [ ] Integration with bank accounts
- [ ] Desktop web version

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature request? Please [open an issue](https://github.com/Anjana-Hesh/Cash_Flow/issues) on GitHub.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Anjana Heshan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👨‍💻 Author

**Anjana Heshan**

- GitHub: [@Anjana-Hesh](https://github.com/Anjana-Hesh)
- LinkedIn: [Anjana Heshan](https://www.linkedin.com/in/anjana-heshan-79334b260/)
- Email: [Contact](mailto:anjanaheshan676@gmail.com)

---

## 🙏 Acknowledgments

Special thanks to:
- [React Native](https://reactnative.dev/) - For the amazing framework
- [Expo](https://expo.dev/) - For simplifying mobile development
- [Firebase](https://firebase.google.com/) - For backend services
- [Cloudinary](https://cloudinary.com/) - For image management
- [Phosphor Icons](https://phosphoricons.com/) - For beautiful icons
- All contributors and supporters of this project

---

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/Anjana-Hesh/Cash_Flow?style=social)
![GitHub forks](https://img.shields.io/github/forks/Anjana-Hesh/Cash_Flow?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/Anjana-Hesh/Cash_Flow?style=social)

---

<div align="center">

**Made with ❤️ by Anjana Heshan**

⭐ Star this repo if you find it helpful!

[Back to Top ⬆️](#-cashflow---personal-finance-tracker)

</div>