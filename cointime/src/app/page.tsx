import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import '@rainbow-me/rainbowkit/styles.css';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Page: React.FC = () => {
  // const { connectWallet } = useRainbowKit(); // Cambio de "connect" a "connectWallet"

  // async function handleConnectWallet() {
  //   try {
  //     await connectWallet(); // Cambio de "connect" a "connectWallet"
  //     console.log('Wallet connected successfully');
  //   } catch (error) {
  //     console.error('Failed to connect wallet', error);
  //   }
  // }

  return (
    <Box p={4}>
      <nav>
        <ul>
          <li>Sports</li>
          <li>Arts</li>
          <li>Maths</li>
          <li>Health</li>
          <li>Business</li>
          <li>ConnectButton</li> // Agregar el atributo onClick para llamar a handleConnectWallet al hacer clic en el botón
        </ul>
      </nav>
    </Box>
  );
};

export default Page;
