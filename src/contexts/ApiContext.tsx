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

  const register = async (email: string, username: string, password: string) => {
    return await axios.post(API_PATH.AUTH_REGISTER, {
      email,
      username,
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
