// routes
import { paths } from 'src/routes/paths';

// API
// ----------------------------------------------------------------------

export const APP_NAME = `${process.env.REACT_APP_NAME}`;
export const HOME_PATH = `${process.env.REACT_APP_HOME_PATH}`;

export const API_URL = `${process.env.REACT_APP_API_URL}`;
export const SOCKET_URL = `${process.env.REACT_APP_SOCKET_URL}`;
export const IMG_URI = `${process.env.REACT_APP_IMG_API}`;
export const ASSETS_API = `${process.env.REACT_APP_ASSETS_API}`;

export const PATH_AFTER_LOGIN = paths.home.root; // as '/home'

export const SERVER_URL =
  'https://www.roblox.com/games/286090429/Arsenal?privateServerLinkCode=12349818364036245014073719814310&AssetId=286090429';

export const API_PATH = {
  // auth
  AUTH_ROOT: 'auth',
  AUTH_LOGIN: 'auth/login',
  AUTH_REGISTER: 'auth/register',
  AUTH_GET_ME: 'auth/me',
  AUTH_GET_USER_ID: 'auth/get-user-id',
  AUTH_CONFIRM_PHRASE: 'auth/confirm-phrase',

  CHAT_ROOT: 'chat',

  COINFLIP_ROOT: 'coinflip',

  CRASH: 'crash',
  CRASH_ME: 'crash/me',
  CRASH_HISTORY: 'crash/history',

  LIMBO: 'limbo',
  LIMBO_BET: 'limbo/bet',

  MINE: 'mine',
  MINE_BET_START: 'mine/start',
  MINE_BET_CANCEL: 'mine/cancel',
  MINE_BET_CASHOUT: 'mine/cashout',
  MINE_BET_CHECK: 'mine/check',
  MINE_BET_PROFIT_SETTING_LIST: 'mine/profit-setting-list',

  ROULETTE: 'roulette',
  ROULETTE_BET: 'roulette/bet',

  CURRENCY: 'currency',
  DEPOSIT: 'payment/deposit',

  WITHDRAW: 'payment/withdraw',
  WITHDRAW_ITEMS: 'payment/withdraw-items'
};

export const SOCKET_PATH = {
  SIGNOUT: 'auth:signout',
  ALERT: 'alert',
  CHAT: 'chat:message',
  COINFLIP_CREATE: 'coinflip:create',
  COINFLIP_JOIN: 'coinflip:join'
};
