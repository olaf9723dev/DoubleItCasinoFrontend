import React, { createContext } from 'react';
import axios from 'src/utils/axios';
import { API_PATH } from 'src/config-global';
import { ApiContextType } from 'src/types';
import { useDispatch, useSelector } from 'src/store';
import { edit } from 'src/store/reducers/auth';

const ApiContext = createContext<ApiContextType | null>(null);
/* eslint-disable */
export const ApiProvider = ({ children }: { children: React.ReactElement }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const initialize = async () => {
    const res = await axios.get(API_PATH.AUTH_GET_ME);
    if (!res?.data) return;
    return dispatch(edit(res.data));
  };

  const login = async (emailOrUsername: string, password: string) => {
    return await axios.post(API_PATH.AUTH_LOGIN, { emailOrUsername, password });
  };

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    userName: string,
    password: string
  ) => {
    return await axios.post(API_PATH.AUTH_REGISTER, {
      firstName,
      lastName,
      email,
      userName,
      password
    });
  };

  const getUsers = async () => {
    return await axios.get(API_PATH.AUTH_ROOT);
  };

  const getUserId = async (userName: string) => {
    return await axios.post(API_PATH.AUTH_GET_USER_ID, { userName });
  };

  const confirmPhrase = async (userId: number) => {
    return await axios.post(API_PATH.AUTH_CONFIRM_PHRASE, { userId });
  };

  const getChatHistory = async () => {
    return await axios.get(API_PATH.CHAT_ROOT);
  };

  const getCoinFlip = async () => {
    return await axios.get(API_PATH.COINFLIP_ROOT);
  };

  const getCrashSchema = async () => {
    return await axios.get(API_PATH.CRASH);
  };

  const getUserCrashData = async () => {
    return await axios.get(API_PATH.CRASH_ME);
  };

  const getLimboSchema = async (userId: string) => {
    return await axios.get(`${API_PATH.LIMBO}/${userId}`);
  };

  const betLimbo = async (userId: string, betAmount: number, cashOut: number) => {
    return axios.post(API_PATH.LIMBO_BET, { userId, betAmount, cashOut });
  };

  const startBetMine = async (
    userId: string,
    betAmount: number,
    gridCount: number,
    mineCount: number,
    playType: string,
    turboList: number[]
  ) => {
    return axios.post(API_PATH.MINE_BET_START, {
      userId,
      betAmount,
      gridCount,
      mineCount,
      playType,
      turboList
    });
  };

  const cancelBetMine = async (userId: string, playId: string) => {
    return axios.post(API_PATH.MINE_BET_CANCEL, { userId, playId });
  };

  const cashoutBetMine = async (userId: string, playId: string) => {
    return axios.post(API_PATH.MINE_BET_CASHOUT, { userId, playId });
  };

  const checkMine = async (userId: string, playId: string, order: number) => {
    return axios.post(API_PATH.MINE_BET_CHECK, { userId, playId, order });
  };

  const getMineProfitSetting = async (gridCount: number, mineCount: number) => {
    return axios.post(API_PATH.MINE_BET_PROFIT_SETTING_LIST, { gridCount, mineCount });
  };

  const getGameHistory = async () => {
    return await axios.get(API_PATH.CRASH_HISTORY);
  };

  const getCurrencies = async () => {
    return await axios.get(API_PATH.CURRENCY);
  };

  const deposit = async (currency: string, amount: number) => {
    return await axios.post(API_PATH.DEPOSIT, { userId: user._id, currency, amount });
  };

  const getWithdrawalItems = async () => {
    return await axios.get(API_PATH.WITHDRAW_ITEMS);
  };

  const withdraw = async (itemIds: string[]) => {
    return await axios.post(API_PATH.WITHDRAW, { itemIds });
  };

  return (
    <ApiContext.Provider
      value={{
        initialize,
        login,
        register,
        deposit,
        getUsers,
        getUserId,
        confirmPhrase,
        getChatHistory,
        getCoinFlip,
        getCrashSchema,
        getLimboSchema,
        betLimbo,
        startBetMine,
        cancelBetMine,
        cashoutBetMine,
        checkMine,
        getMineProfitSetting,
        getGameHistory,
        getUserCrashData,
        getCurrencies,
        getWithdrawalItems,
        withdraw
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiContext;
