# Memecoin Fiesta - Your Daily Dose for Memecoin Trading, All Within Telegram 

Video demo link: https://drive.google.com/file/d/167InHm9dqBcRn6aY4UFu_coU1iz8LkfG/view?usp=drive_link 

<img src="https://github.com/user-attachments/assets/57247beb-be37-4b59-8431-8e96acf7c24b" width="400" alt="Memecoin Fiesta">

## The problem Memecoin Fiesta solves:
1. Simplifying complex trading interfaces, making it accessible for newcomers
2. Social login, On-ramp, Swap, Trade, all in one app
3. Integrating trading, information, and social features in one Telegram-based platform
4. Providing real-time community insights and leaderboards
5. Offering easy access to token information and swap features without leaving Telegram

Users can effortlessly trade memecoins, access token information, and engage with the community, all within their familiar Telegram environment. This integration reduces the learning curve for new traders and enhances the overall trading experience for enthusiasts.

## Challenges we run into: 
- Integrating Kyberswap widget with Wallet Connect: There's a mismatched between Kyberswap's provider and ethers v6's provider. Have to write custom function using ethers-v5 for integration. Wallet balance sometimes does not show correctly in the widget.
- API Integration: Integrating Dextool API with limit control leads to slow information fetching.
- Integration with Telegram.js. Lack of documentation. Have to trial and error to solve the bugs
- Wallet login does not work consistently in Telegram Mini App. Found out that email login works universally across platforms, and wallet login works the best for telegram app in browsers.

## Frontend
- Nextjs
- Kyberswap widget
- WalletConnect Appkit

## Backend
- Python
- Telegram 
