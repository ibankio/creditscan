import {Banner} from "./Banner";

export function WalletDeprecationBanner() {
  return (
    <Banner pillText="NOTICE" pillColor="warning" sx={{marginBottom: 2}}>
      Wallets that do not support CreditChain&apos;s required signing standard
      were deprecated for submitting transactions with CreditScan on May 5th,
      2025. This includes wallets: Martian, Rise, TokenPocket, WellDone
    </Banner>
  );
}
