import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Grid,
  Stack,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  DialogTitle,
  Typography,
  InputBase,
  MenuItem,
  TextField
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import QRCode from 'qrcode.react';

import { IMG_URI } from 'src/config-global';

import useApi from 'src/hooks/use-api';
import { useCopyToClipboard } from 'src/hooks/use-copy-to-clipboard';

import Iconify from 'src/components/iconify';
import Image from 'src/components/image';
import { DepositIcon } from 'src/components/icons';
import { useSnackbar } from 'src/components/snackbar';
import { StyledScrollbar } from 'src/components/scrollbar/styles';

import { MethodDialogProps } from './types';

interface Currency {
  _id: string;
  name: string;
  symbol: string;
  icon: string;
  payment: string;
  price: number;
  minDeposit: number;
  minWithdraw: number;
  network: string;
  coingecko: string;
  status: boolean;
}

const _CoinsData = [
  {
    icon: 'bitcoin',
    name: 'BITCOIN',
    symbol: 'BTC'
  },
  {
    icon: 'ethereum',
    name: 'ETHEREUM',
    symbol: 'ETH'
  },
  {
    icon: 'bnb',
    name: 'BNB',
    symbol: 'BNB'
  },
  {
    icon: 'usdt',
    name: 'USDT',
    symbol: 'USDT'
  },
  {
    icon: 'usdc',
    name: 'USDC',
    symbol: 'USDC'
  },
  {
    icon: 'tron',
    name: 'TRON',
    symbol: 'TRX'
  },
  {
    icon: 'polygon',
    name: 'Polygon',
    symbol: 'MATIC'
  },
  {
    icon: 'bitcoin-cash',
    name: 'Bitcoin Cash',
    symbol: 'BCH'
  },
  {
    icon: 'litecoin',
    name: 'LITECOIN',
    symbol: 'LTC'
  },
  {
    icon: 'dogecoin',
    name: 'DOGECOIN',
    symbol: 'DOGE'
  },
  {
    icon: 'arbitrum',
    name: 'Arbitrum',
    symbol: 'ARB'
  },
  {
    icon: 'avax',
    name: 'Avalanche',
    symbol: 'AVAX'
  },
  {
    icon: 'dai',
    name: 'Dai',
    symbol: 'DAI'
  },
  {
    icon: 'shiba',
    name: 'Shiba',
    symbol: 'SHIB'
  },
  {
    icon: 'uniswap',
    name: 'Uniswap',
    symbol: 'UNI'
  },
  {
    icon: 'aptos',
    name: 'Aptos',
    symbol: 'APT'
  },
  {
    icon: 'solana',
    name: 'Solana',
    symbol: 'SOL'
  }
];

export default function CryptoDialog({ open, onClose }: MethodDialogProps) {
  const { enqueueSnackbar } = useSnackbar();
  const { getCurrencies, deposit } = useApi();
  const { copy } = useCopyToClipboard();

  const [transactionType, setTransactionType] = useState<'deposit' | 'withdraw'>('deposit');
  const [network, setNetwork] = useState<string>('');
  const [currency, setCurrency] = useState<Partial<Currency>>({});
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [amount, setAmount] = useState<string>('0');
  const [address, setAddress] = useState<string>('');
  const [openDeposit, setOpenDeposit] = useState<boolean>(false);

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const onDeposit = async () => {
    if (!currency?.payment) return;
    const res = await deposit(currency.payment, Number(amount));
    if (!res?.data) return;
    setOpenDeposit(true);
    setAddress(res.data.address);
  };

  const onWithdraw = async () => {};

  const handleCopy = () => {
    enqueueSnackbar('Copied!');
    copy(address);
  };

  const getData = useCallback(async () => {
    const res = await getCurrencies();
    if (!res?.data) return;
    setCurrencies(res.data);
    setCurrency(res.data[0]);
  }, [getCurrencies]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="adopt-me-dialog-title"
        aria-describedby="adopt-me-dialog-description"
        sx={{
          '& .MuiPaper-root': {
            maxWidth: { xm: '100%', sm: '100%', md: '600px' },
            width: '100%',
            border: '2px solid #32366a',
            position: 'relative',
            background: 'linear-gradient(180deg, #191B35 0%, #1F203C 100%)'
          }
        }}
      >
        <DialogTitle
          id="adopt-me-dialog-title"
          sx={{
            textAlign: 'center',
            py: 3.25,
            borderBottom: '2px dashed #32366a'
          }}
        >
          <Stack flexDirection="row" gap={1.25} sx={{ alignItems: 'center' }}>
            <Button
              variant="text"
              color="primary"
              size="small"
              sx={{ fontSize: 18, fontWeight: 600, color: 'white', px: 1.25 }}
              disabled={transactionType === 'deposit'}
              onClick={() => setTransactionType('deposit')}
            >
              Deposit
            </Button>
            <Typography sx={{ fontSize: 18, fontWeight: 600, color: 'grey' }}>|</Typography>
            <Button
              variant="text"
              color="primary"
              size="small"
              sx={{ fontSize: 18, fontWeight: 600, color: 'white', px: 1.25 }}
              disabled={transactionType === 'withdraw'}
              onClick={() => setTransactionType('withdraw')}
            >
              Withdraw
            </Button>
          </Stack>
          <IconButton sx={{ position: 'absolute', top: 1, right: 1.25 }} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <StyledScrollbar>
          <DialogContent sx={{ p: 0 }}>
            <StyledScrollbar>
              <Stack p={3} direction="row">
                {_CoinsData.map((item, key) => (
                  <Grid key={key} item xs={1.7} md={1.7} pr={3}>
                    <Button
                      onClick={() => setCurrency(item)}
                      sx={{
                        pt: 3,
                        px: 2,
                        gap: 0.5,
                        width: '120px',
                        height: '100%',
                        borderRadius: 1.25,
                        background: '#131528',
                        flexDirection: 'column',
                        border: '1px solid #454779',
                        boxShadow: '0px 7px 10px 1px rgb(2 2 2 / 49%)'
                      }}
                    >
                      <Image
                        src={`assets/icons/coins/${item.icon}.png`}
                        alt={item.name}
                        sx={{
                          width: 45,
                          height: 45
                        }}
                      />
                      <Typography sx={{ textAlign: 'center', color: 'white', mt: 1.5 }}>
                        {item.name}
                      </Typography>
                    </Button>
                  </Grid>
                ))}
              </Stack>
            </StyledScrollbar>
            <Stack
              sx={{
                px: 3,
                pt: 1.2,
                pb: 3,
                gap: 2
              }}
            >
              <Stack sx={{ flexDirection: 'column', gap: 0.4 }}>
                <Typography sx={{ fontSize: 16 }}>Network</Typography>
                <TextField
                  select
                  value={network}
                  onChange={(e: any) => setNetwork(e.target.value)}
                  sx={{
                    '& .MuiInputBase-root': {
                      height: '60px'
                    },
                    '& .MuiSelect-select': {
                      display: 'flex'
                    }
                  }}
                  SelectProps={{
                    native: false,
                    MenuProps: {
                      PaperProps: {
                        sx: {
                          backgroundColor: 'rgba(0, 0, 0, 0.27)',
                          border: '1px solid #33374f',
                          borderRadius: 1.25,
                          maxHeight: '300px',
                          option: {
                            width: '100%',
                            px: 2,
                            py: 1,
                            '&:hover': {
                              cursor: 'pointer',
                              backgroundColor: 'rgba(0, 0, 0, 0.3)',
                              borderRadius: 0.8
                            }
                          }
                        }
                      }
                    },
                    inputProps: {
                      sx: {
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 1.25,
                        backgroundColor: 'rgba(0, 0, 0, 0.27)',
                        borderRadius: 1.25
                      }
                    }
                  }}
                >
                  {_CoinsData.map((item, key) => (
                    <MenuItem
                      key={key}
                      value={item.symbol}
                      sx={{ gap: 1.25, alignItems: 'center' }}
                    >
                      <Image
                        src={`assets/icons/coins/${item.icon}.png`}
                        alt={item.name}
                        sx={{
                          width: 25,
                          height: 25
                        }}
                      />
                      <Typography sx={{ textAlign: 'center', color: 'white' }}>
                        {item.name}
                      </Typography>
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
              <Stack sx={{ flexDirection: 'column', gap: 0.4 }}>
                <Typography sx={{ fontSize: 18 }}>
                  Your{' '}
                  <Box component="span" color="#6C56F5">
                    {currency?.symbol}
                  </Box>{' '}
                  deposit address
                </Typography>
                <Stack sx={{ flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                  <Stack
                    sx={{
                      pl: 2,
                      pr: 1,
                      gap: 2,
                      height: '60px',
                      borderRadius: 1.25,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: '1px solid #33374f',
                      bgcolor: 'rgba(0, 0, 0, 0.27)',
                      width: '100%',
                      '&:hover': {
                        borderColor: 'white',
                        cursor: 'pointer'
                      }
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 14
                      }}
                    >
                      {'0x18B6b2433B11ba1a1f0CC960CBD2cB7C95d5FCFD' || address}
                    </Typography>
                    <IconButton onClick={handleCopy}>
                      <Iconify icon="octicon:link-16" />
                    </IconButton>
                  </Stack>
                  <Box
                    sx={{
                      pt: 1.2,
                      pb: 0.4,
                      px: 1.2,
                      borderRadius: 1.2,
                      flexDirection: 'row',
                      alignItems: 'center',
                      border: '1px solid #34386c',
                      bgcolor: 'white'
                    }}
                  >
                    <QRCode
                      value={'0x18B6b2433B11ba1a1f0CC960CBD2cB7C95d5FCFD' || address}
                      renderAs="svg"
                      size={150}
                    />
                  </Box>
                  <Typography
                    sx={{
                      opacity: 0.8,
                      fontSize: 14,
                      textAlign: 'center'
                    }}
                  >
                    Only send {currency?.symbol} to the address or QR above, do not send other
                    currencies. Three confirmations must occur before you receive your balance.
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </DialogContent>
        </StyledScrollbar>
      </Dialog>

      <Dialog
        open={openDeposit}
        onClose={() => setOpenDeposit(!openDeposit)}
        aria-labelledby="adopt-me-dialog-title"
        aria-describedby="adopt-me-dialog-description"
        sx={{
          '& .MuiPaper-root': {
            maxWidth: { xm: '100%', sm: '100%', md: '500px' },
            width: '100%',
            border: '2px solid #32366a',
            position: 'relative',
            background: 'linear-gradient(180deg, #191B35 0%, #1F203C 100%)'
          }
        }}
      >
        <DialogTitle
          id="adopt-me-dialog-title"
          sx={{
            textAlign: 'center',
            py: 3.6,
            borderBottom: '2px dashed #32366a'
          }}
        >
          <Typography sx={{ fontSize: 24, fontWeight: 700 }}>Crypto Deposit</Typography>
          <IconButton
            sx={{ position: 'absolute', top: 1, right: 1.25 }}
            onClick={() => setOpenDeposit(!openDeposit)}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <Stack sx={{ pl: 2, py: 5, gap: 2, justifyContent: 'center', alignItems: 'center' }}>
            <QRCode value={address} renderAs="svg" size={150} />
            <Stack
              sx={{
                pl: 2,
                pr: 1,
                gap: 2,
                borderRadius: 1.25,
                flexDirection: 'row',
                alignItems: 'center',
                border: '1px solid #34386c',
                bgcolor: 'rgba(0, 0, 0, 0.27)'
              }}
            >
              <Typography sx={{ fontSize: 12, opacity: 0.6 }}>
                {currency?.symbol} ADDRESS:
              </Typography>
              <Typography
                sx={{
                  fontSize: 11
                }}
              >
                {address}
              </Typography>
              <IconButton onClick={handleCopy}>
                <Iconify icon="octicon:link-16" />
              </IconButton>
            </Stack>
            <Typography
              sx={{
                opacity: 0.7,
                fontSize: 14,
                textAlign: 'center'
              }}
            >
              Only send {currency?.symbol} to the address or QR above, do not send other currencies.
              Three confirmations must occur before you receive your balance.
            </Typography>
          </Stack>
          {/* <InputBase
              value={amount}
              onChange={handleChangeAmount}
              placeholder="0.00"
              type="number"
              inputProps={{ step: 0.01, min: 0 }}
              startAdornment={
                <Typography sx={{ opacity: 0.6, fontSize: 12, width: 130, textAlign: 'center' }}>
                  SEND AMOUNT:
                </Typography>
              }
              endAdornment={
                <Stack
                  sx={{
                    gap: 2,
                    width: 40,
                    flexDirection: 'row',
                    alignItems: 'flex-end'
                  }}
                >
                  <Image
                    src={`assets/icons/coins/${currency?.icon}.png`}
                    alt="ethereum"
                    sx={{
                      width: 23,
                      height: 23
                    }}
                  />
                </Stack>
              }
              sx={{
                px: 1.7,
                py: 0.8,
                border: '1px solid #34386c',
                bgcolor: 'rgba(0, 0, 0, 0.27)',
                borderRadius: 1.25,
                width: '100%',
                gap: 1.25,
                '& input': {
                  width: '70%'
                }
              }}
            />
            <Stack
              sx={{
                gap: 3,
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <InputBase
                value={Number(amount) * (currency?.price || 0)}
                placeholder="0.00"
                type="number"
                readOnly
                startAdornment={
                  <AttachMoneyIcon
                    sx={{
                      width: 23,
                      height: 23
                    }}
                  />
                }
                sx={{
                  px: 1.7,
                  py: 0.8,
                  gap: 1.25,
                  width: '100%',
                  borderRadius: 1.25,
                  border: '1px solid #34386c',
                  bgcolor: 'rgba(0, 0, 0, 0.27)',
                  '& input': {
                    width: '70%'
                  }
                }}
              />
              <Typography>=</Typography>
              <InputBase
                value={amount}
                placeholder="0.00"
                readOnly
                type="number"
                startAdornment={
                  <Image
                    src={`assets/icons/coins/${currency?.icon}.png`}
                    alt="ethereum"
                    sx={{
                      width: 23,
                      height: 23
                    }}
                  />
                }
                sx={{
                  px: 1.7,
                  py: 0.8,
                  gap: 1.25,
                  width: '100%',
                  borderRadius: 1.25,
                  border: '1px solid #34386c',
                  bgcolor: 'rgba(0, 0, 0, 0.27)',
                  '& input': {
                    width: '70%'
                  }
                }}
              />
            </Stack> */}
          {/* <Button
              variant="contained"
              size="medium"
              color="primary"
              sx={{ fontSize: 16 }}
              onClick={() => (transactionType === 'deposit' ? onDeposit() : onWithdraw())}
            >
              {transactionType === 'deposit' ? 'Deposit' : 'Withdraw'}
            </Button> */}
        </DialogContent>
      </Dialog>
    </>
  );
}
