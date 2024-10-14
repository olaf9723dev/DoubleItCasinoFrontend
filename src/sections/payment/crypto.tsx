import { useState, useEffect, useCallback } from 'react';
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
  MenuItem,
  TextField
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import QRCode from 'qrcode.react';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image';
import useApi from 'src/hooks/use-api';
import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import { StyledScrollbar } from 'src/components/scrollbar/styles';
import { useCopyToClipboard } from 'src/hooks/use-copy-to-clipboard';
import { MethodDialogProps } from './types';

interface Currency {
  _id: string;
  order: number;
  icon: string;
  name: string;
  symbol: string;
  main: boolean;
  list: any;
  nowsymbol: string;
  coingecko: string;
  address: string;
  status: boolean;
  price: number;
}

export default function CryptoDialog({ open, onClose }: MethodDialogProps) {
  const { enqueueSnackbar } = useSnackbar();
  const { getCurrencies, getMinAmount, deposit } = useApi();
  const { copy } = useCopyToClipboard();

  const [transactionType, setTransactionType] = useState<'deposit' | 'withdraw'>('deposit');
  const [network, setNetwork] = useState<string>('');
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [currency, setCurrency] = useState<Partial<Currency>>({});
  const [minDepositAmount, setMinDepositAmount] = useState<number>(0);
  const [depositAddress, setDepositAddress] = useState<string>('');

  const onDeposit = async () => {
    if (!currency?.symbol) return;
    const nowsymbol =
      currency.symbol === 'USDT' || currency.symbol === 'USDC' ? network : currency.nowsymbol;
    const res = await deposit(String(nowsymbol));
    if (!res?.data) return;
    setDepositAddress(res.data.address);
  };

  const onWithdraw = async () => {};

  const handleCopy = () => {
    enqueueSnackbar('Copied!');
    copy(depositAddress);
  };

  const getData = useCallback(async () => {
    const res = await getCurrencies();
    if (res?.data) {
      setCurrencies(res.data);
    }
  }, [getCurrencies]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (currency) {
      if (currency?.list) {
        setNetwork(currency?.list[0]?.nowsymbol);
      }
    }
  }, [currency]);

  useEffect(() => {
    (async () => {
      if (currency?.nowsymbol || network) {
        const nowsymbol =
          currency.symbol === 'USDT' || currency.symbol === 'USDC' ? network : currency.nowsymbol;
        if (nowsymbol) {
          const res = await getMinAmount(String(nowsymbol));
          if (!res?.data) return;
          setMinDepositAmount(res.data.min_amount);
        }
      }
    })();
    setDepositAddress('');
  }, [currency, network, getMinAmount]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="adopt-me-dialog-title"
      aria-describedby="adopt-me-dialog-description"
      sx={{
        '& .MuiPaper-root': {
          maxWidth: { xs: '100%', sm: '480px' },
          maxHeight: { xs: '90%', sm: '520px' },
          width: '100%',
          height: { xs: '90%', sm: '520px' },
          border: '2px solid #32366a',
          position: 'relative',
          background: 'linear-gradient(180deg, #191B35 0%, #1F203C 100%)'
        }
      }}
    >
      <DialogTitle
        id="adopt-me-dialog-title"
        sx={{
          py: 3,
          textAlign: 'center',
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
      <Scrollbar>
        <DialogContent sx={{ p: 0 }}>
          <StyledScrollbar>
            <Stack px={3} py={2} direction="row">
              {currencies
                .filter((e) => e.coingecko)
                .map((item, ind) => (
                  <Grid
                    key={ind}
                    item
                    xs={1.4}
                    md={1.4}
                    pr={ind === currencies.length - 1 ? 3 : 1.25}
                  >
                    <Button
                      onClick={() => setCurrency(item)}
                      sx={{
                        pt: 2.4,
                        px: 1.6,
                        gap: 0.5,
                        width: '90px',
                        height: '100%',
                        borderRadius: 1.25,
                        background: '#131528',
                        flexDirection: 'column',
                        border: `1px solid ${currency?._id === item._id ? '#6C56F5' : '#454779'}`,
                        boxShadow:
                          currency?._id === item._id ? '' : '0px 7px 10px 1px rgb(2 2 2 / 49%)'
                      }}
                    >
                      <Image
                        src={`/assets/icons/coins/${item.icon}.png`}
                        alt={item.name}
                        sx={{
                          width: 38,
                          height: 38
                        }}
                      />
                      <Box>
                        <Typography
                          sx={{
                            textAlign: 'center',
                            fontSize: 12,
                            color: currency?._id === item._id ? '#6C56F5' : 'white',
                            mt: 1.5
                          }}
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          sx={{
                            color: currency?._id === item._id ? '#6C56F5' : 'white',
                            fontSize: 10
                          }}
                        >
                          ${item.price}
                        </Typography>
                      </Box>
                    </Button>
                  </Grid>
                ))}
            </Stack>
          </StyledScrollbar>

          {currency?.symbol && (
            <>
              <Stack
                sx={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  pt: 2,
                  gap: 0.5
                }}
              >
                {minDepositAmount > 0 && (
                  <Typography sx={{ fontSize: 14, textAlign: 'center' }}>
                    Minimum deposital is {minDepositAmount}
                  </Typography>
                )}
                <Image
                  src={`/assets/icons/coins/${currency.icon}.png`}
                  alt={currency.name}
                  sx={{
                    width: 25,
                    height: 25
                  }}
                />
              </Stack>
              <Stack
                sx={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 2,
                  pt: 2
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <Image
                    src="/assets/icons/coins/unicred.png"
                    alt="unicred"
                    sx={{
                      width: 80,
                      height: 80
                    }}
                  />
                  <Typography sx={{ color: 'white', fontSize: 12, textAlign: 'center' }}>
                    1 TOKEN
                  </Typography>
                </Box>
                <Typography sx={{ color: 'white', fontSize: 24 }}> = </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <Image
                    src={`/assets/icons/coins/${currency.icon}.png`}
                    alt={currency.name}
                    sx={{
                      width: 80,
                      height: 80
                    }}
                  />
                  <Typography sx={{ color: 'white', fontSize: 12, textAlign: 'center' }}>
                    {currencies.length > 0 &&
                      Number(
                        currencies[currencies.length - 1].price / Number(currency.price)
                      ).toFixed(10)}
                  </Typography>
                </Box>
              </Stack>
              <Stack
                sx={{
                  px: 3,
                  pt: 1.5,
                  pb: 3,
                  gap: 2
                }}
              >
                {!currency?.main && (
                  <Stack sx={{ flexDirection: 'column', gap: 0.4 }}>
                    <Typography sx={{ fontSize: 13 }}>Network</Typography>
                    <TextField
                      select
                      value={network}
                      onChange={(e: any) => setNetwork(e.target.value)}
                      placeholder="Select network"
                      sx={{
                        '& .MuiFormControl-root': {
                          height: '44px'
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
                      {currency.list.map((item: Currency, ind: number) => (
                        <MenuItem
                          key={ind}
                          value={item.nowsymbol}
                          sx={{ gap: 1.25, alignItems: 'center' }}
                        >
                          <Image
                            src={`/assets/icons/coins/${item.icon}.png`}
                            alt={item.name}
                            sx={{
                              width: 25,
                              height: 25
                            }}
                          />
                          <Typography sx={{ textAlign: 'center', color: 'white', fontSize: 12 }}>
                            {item.name}
                          </Typography>
                        </MenuItem>
                      ))}
                    </TextField>
                  </Stack>
                )}
                {transactionType === 'deposit' && (
                  <Stack sx={{ flexDirection: 'column', gap: 0.4 }}>
                    {depositAddress ? (
                      <>
                        <Typography sx={{ fontSize: 13 }}>
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
                              height: '44px',
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
                                fontSize: 12
                              }}
                            >
                              {depositAddress}
                            </Typography>
                            <IconButton onClick={handleCopy}>
                              <Iconify icon="octicon:link-16" />
                            </IconButton>
                          </Stack>
                          <Box
                            sx={{
                              p: 1,
                              borderRadius: 1,
                              flexDirection: 'row',
                              alignItems: 'center',
                              border: '1px solid #34386c',
                              bgcolor: 'white'
                            }}
                          >
                            <QRCode value={depositAddress || ''} renderAs="svg" size={120} />
                          </Box>
                          <Typography
                            sx={{
                              opacity: 0.8,
                              fontSize: 12,
                              textAlign: 'center'
                            }}
                          >
                            Only send{' '}
                            <Box component="span" color="#6C56F5">
                              {currency?.symbol}
                            </Box>{' '}
                            to the address or QR above, do not send other currencies. Three
                            confirmations must occur before you receive your balance.
                          </Typography>
                        </Stack>
                      </>
                    ) : (
                      <Button
                        variant="contained"
                        size="medium"
                        color="primary"
                        sx={{ fontSize: 14, mt: 4 }}
                        onClick={onDeposit}
                      >
                        Deposit
                      </Button>
                    )}
                  </Stack>
                )}
                {transactionType === 'withdraw' && (
                  <Stack sx={{ flexDirection: 'column', gap: 2 }}>
                    <Stack sx={{ flexDirection: 'column', gap: 0.4 }}>
                      <Typography sx={{ fontSize: 12 }}>Amount to withdraw *</Typography>
                      <TextField
                        sx={{
                          '& .MuiInputBase-root': {
                            height: '44px'
                          },
                          fontSize: 12,
                          width: '100%',
                          borderRadius: 1.25,
                          background: '#17182E'
                        }}
                        type="number"
                        value=""
                        placeholder={`Enter Your ${currency?.symbol && currency?.symbol} amount`}
                        onChange={(e: any) => {}}
                      />
                    </Stack>
                    <Stack sx={{ flexDirection: 'column', gap: 0.4 }}>
                      <Typography sx={{ fontSize: 12 }}>Withdraw to *</Typography>
                      <TextField
                        sx={{
                          '& .MuiInputBase-root': {
                            height: '44px'
                          },
                          fontSize: 12,
                          width: '100%',
                          borderRadius: 1.25,
                          background: '#17182E'
                        }}
                        type="text"
                        value=""
                        placeholder={`Enter Your ${currency?.symbol && currency?.symbol} address`}
                        onChange={(e: any) => {}}
                      />
                    </Stack>
                    <Button
                      variant="contained"
                      size="medium"
                      color="primary"
                      sx={{ fontSize: 14, mt: 4 }}
                      onClick={onWithdraw}
                    >
                      Withdraw
                    </Button>
                  </Stack>
                )}
              </Stack>
            </>
          )}
        </DialogContent>
      </Scrollbar>
    </Dialog>
  );
}
