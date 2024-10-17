import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Box,
  Button,
  Grid,
  InputBase,
  Stack,
  Tab,
  Tabs,
  tabsClasses,
  Typography,
  useTheme
} from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import $ from 'jquery';
import { useSelector } from 'src/store';
import { abbreviate, playSound } from 'src/utils';
import { toNumber, toNumberTag } from 'src/utils/number';
import useApi from 'src/hooks/use-api';
import click from 'src/assets/click.wav';
import ball from 'src/assets/roulette/ball.wav';
import defaultColor from 'src/assets/scss/_themes-vars.module.scss';

const Ornament =
  'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjcycHgiIGhlaWdodD0iNzJweCIgdmlld0JveD0iMCAwIDcyIDcyIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0MiAoMzY3ODEpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPgogICAgPHRpdGxlPldoZWVsIGhhbmRsZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPgogICAgICAgIDxwYXRoIGQ9Ik0zOC4xMzgxMjA1LDcuMzgxMjA1MzkgTDM5Ljg1NjQxMzgsMjQuNTY0MTM4MiBDNDMuMjUyMjg3OSwyNS43MDMwNjM2IDQ2LjA0NzM1NTcsMjguNDgyNDUxOCA0Ny4yOTYzMDMzLDMyLjEyOTYyOTYgTDY0LjYxODc5NDYsMzMuODYxODc5NSBDNjUuMzI3ODk2MiwzMi43NDI4NTggNjYuNTc3MTk2MiwzMiA2OCwzMiBDNzAuMjA5MTM5LDMyIDcyLDMzLjc5MDg2MSA3MiwzNiBDNzIsMzguMjA5MTM5IDcwLjIwOTEzOSw0MCA2OCw0MCBDNjYuNTc3MTk2Miw0MCA2NS4zMjc4OTYyLDM5LjI1NzE0MiA2NC42MTg3OTQ2LDM4LjEzODEyMDUgTDQ3LjQ0MTg1NywzOS44NTU4MTQzIEM0Ni4yNzUxMzgyLDQzLjM5MDk4NjEgNDMuMzkwOTg2MSw0Ni4yNzUxMzgyIDM5Ljg1NTgxNDMsNDcuNDQxODU3IEwzOC4xMzgxMjA1LDY0LjYxODc5NDYgQzM5LjI1NzE0Miw2NS4zMjc4OTYyIDQwLDY2LjU3NzE5NjIgNDAsNjggQzQwLDcwLjIwOTEzOSAzOC4yMDkxMzksNzIgMzYsNzIgQzMzLjc5MDg2MSw3MiAzMiw3MC4yMDkxMzkgMzIsNjggQzMyLDY2LjU3NzE5NjIgMzIuNzQyODU4LDY1LjMyNzg5NjIgMzMuODYxODc5NSw2NC42MTg3OTQ2IEwzMi4xMjk2MzA3LDQ3LjI5NjMwNzEgQzI4LjQ4MjQ1MTgsNDYuMDQ3MzU1NyAyNS43MDMwNjM2LDQzLjI1MjI4NzkgMjQuNTY0MTM4MiwzOS44NTY0MTM4IEw3LjM4MTIwNTM5LDM4LjEzODEyMDUgQzYuNjcyMTAzNzksMzkuMjU3MTQyIDUuNDIyODAzNzksNDAgNCw0MCBDMS43OTA4NjEsNDAgOS40MzU1MzIwMmUtMTUsMzguMjA5MTM5IDkuNTcwODAyNzdlLTE1LDM2IEM5LjcwNjA3MzUyZS0xNSwzMy43OTA4NjEgMS43OTA4NjEsMzIgNCwzMiBDNS40MjI4MDM3OSwzMiA2LjY3MjEwMzc5LDMyLjc0Mjg1OCA3LjM4MTIwNTM5LDMzLjg2MTg3OTUgTDI0LjcxMjI4ODMsMzIuMTI4NzcxMiBDMjUuOTMyMTAwMiwyOC42MzEzOTQgMjguNjMxMzk0LDI1LjkzMjEwMDIgMzIuMTI4NzcxMiwyNC43MTIyODgzIEwzMy44NjE4Nzk1LDcuMzgxMjA1MzkgQzMyLjc0Mjg1OCw2LjY3MjEwMzc5IDMyLDUuNDIyODAzNzkgMzIsNCBDMzIsMS43OTA4NjEgMzMuNzkwODYxLC00LjI2MzI1NjQxZS0xNCAzNiwtNC4yNjMyNTY0MWUtMTQgQzM4LjIwOTEzOSwtNC4yNjMyNTY0MWUtMTQgNDAsMS43OTA4NjEgNDAsNCBDNDAsNS40MjI4MDM3OSAzOS4yNTcxNDIsNi42NzIxMDM3OSAzOC4xMzgxMjA1LDcuMzgxMjA1MzkgWiIgaWQ9InBhdGgtMSI+PC9wYXRoPgogICAgPC9kZWZzPgogICAgPGcgaWQ9IlJvdWxldHRlIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iR2FtZS0tLVJvdWxldHRlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNzQyLjAwMDAwMCwgLTIxMC4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9IlJvdWxldHRlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMjAuMDAwMDAwLCA5Ni4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJXaGVlbCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTIyLjAwMDAwMCwgMTQuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9IlRvcCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTYuMDAwMDAwLCA1Ni4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9IldoZWVsLWhhbmRsZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDQuMDAwMDAwLCA0NC4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSJDb21iaW5lZC1TaGFwZSIgZmlsbD0iI0ZGRDEwMCI+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPSIjcGF0aC0xIj48L3VzZT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9IiNwYXRoLTEiPjwvdXNlPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbCIgZmlsbD0iI0Q2QTk0OSIgY3g9IjM2IiBjeT0iMzYiIHI9IjciPjwvY2lyY2xlPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbCIgZmlsbD0iI0ZCRDYzRSIgY3g9IjM2IiBjeT0iMzYiIHI9IjIiPjwvY2lyY2xlPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=';
const FULL_CIRCLE = 2 * Math.PI;
const _slotTotal = 37;
const GREEN = defaultColor.successMain;
const DARK_GREEN = defaultColor.successDark;
const RED = defaultColor.errorMain;
const DARK_RED = defaultColor.errorDark;
const BLACK = defaultColor.darkLevel1;
const DARK_BLACK = defaultColor.darkLevel2;
const _outerColors = [
  GREEN,
  RED,
  BLACK,
  RED,
  BLACK,
  RED,
  BLACK,
  RED,
  BLACK,
  RED,
  BLACK,
  RED,
  BLACK,
  RED,
  BLACK,
  RED,
  BLACK,
  RED,
  BLACK,
  RED,
  BLACK,
  RED,
  BLACK,
  RED,
  BLACK,
  RED,
  BLACK,
  RED,
  BLACK,
  RED,
  BLACK,
  RED,
  BLACK,
  RED,
  BLACK,
  RED,
  BLACK
];
const _innerColors = [
  DARK_GREEN,
  DARK_RED,
  DARK_BLACK,
  DARK_RED,
  DARK_BLACK,
  DARK_RED,
  DARK_BLACK,
  DARK_RED,
  DARK_BLACK,
  DARK_RED,
  DARK_BLACK,
  DARK_RED,
  DARK_BLACK,
  DARK_RED,
  DARK_BLACK,
  DARK_RED,
  DARK_BLACK,
  DARK_RED,
  DARK_BLACK,
  DARK_RED,
  DARK_BLACK,
  DARK_RED,
  DARK_BLACK,
  DARK_RED,
  DARK_BLACK,
  DARK_RED,
  DARK_BLACK,
  DARK_RED,
  DARK_BLACK,
  DARK_RED,
  DARK_BLACK,
  DARK_RED,
  DARK_BLACK,
  DARK_RED,
  DARK_BLACK,
  DARK_RED,
  DARK_BLACK
];
const _arcAngle = FULL_CIRCLE / _slotTotal;
const _numbers = [
  '0',
  '32',
  '15',
  '19',
  '4',
  '21',
  '2',
  '25',
  '17',
  '34',
  '6',
  '27',
  '13',
  '36',
  '11',
  '30',
  '8',
  '23',
  '10',
  '5',
  '24',
  '16',
  '33',
  '1',
  '20',
  '14',
  '31',
  '9',
  '22',
  '18',
  '29',
  '7',
  '28',
  '12',
  '35',
  '3',
  '26'
];
const chips = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000];
const rows = {
  first: ['3', '6', '9', '12', '15', '18', '21', '24', '27', '30', '33', '36'],
  second: ['2', '5', '8', '11', '14', '17', '20', '23', '26', '29', '32', '35'],
  third: ['1', '4', '7', '10', '13', '16', '19', '22', '25', '28', '31', '34'],
  red: [
    '3',
    '9',
    '12',
    '18',
    '21',
    '27',
    '30',
    '36',
    '5',
    '14',
    '23',
    '32',
    '1',
    '7',
    '16',
    '19',
    '25',
    '34'
  ],
  black: [
    '6',
    '15',
    '24',
    '33',
    '2',
    '8',
    '11',
    '17',
    '20',
    '26',
    '29',
    '35',
    '4',
    '10',
    '13',
    '22',
    '28',
    '31'
  ],
  numeric: {
    first: ['3', '6', '9', '12', '2', '5', '8', '11', '1', '4', '7', '10'],
    second: ['15', '18', '21', '24', '14', '17', '20', '23', '13', '16', '19', '22'],
    third: ['27', '30', '33', '36', '26', '29', '32', '35', '25', '28', '31', '34']
  },
  half: {
    first: [
      '3',
      '6',
      '9',
      '12',
      '15',
      '18',
      '2',
      '5',
      '8',
      '11',
      '14',
      '17',
      '1',
      '4',
      '7',
      '10',
      '13',
      '16'
    ],
    second: [
      '21',
      '24',
      '27',
      '30',
      '33',
      '36',
      '20',
      '23',
      '26',
      '29',
      '32',
      '35',
      '19',
      '22',
      '25',
      '28',
      '31',
      '34'
    ]
  },
  e: {
    opposite: [
      '6',
      '12',
      '18',
      '24',
      '30',
      '36',
      '2',
      '8',
      '14',
      '20',
      '26',
      '32',
      '4',
      '10',
      '16',
      '22',
      '28',
      '34'
    ],
    even: [
      '3',
      '9',
      '15',
      '21',
      '27',
      '33',
      '5',
      '11',
      '17',
      '23',
      '29',
      '35',
      '1',
      '7',
      '13',
      '19',
      '25',
      '31'
    ]
  }
};
const numeric = {
  first: [
    { color: 'red', number: '3' },
    { color: 'black', number: '6' },
    { color: 'red', number: '9' },
    { color: 'red', number: '12' },
    { color: 'black', number: '15' },
    { color: 'red', number: '18' },
    { color: 'red', number: '21' },
    { color: 'black', number: '24' },
    { color: 'red', number: '27' },
    { color: 'red', number: '30' },
    { color: 'black', number: '33' },
    { color: 'red', number: '36' }
  ],
  second: [
    { color: 'black', number: '2' },
    { color: 'red', number: '5' },
    { color: 'black', number: '8' },
    { color: 'black', number: '11' },
    { color: 'red', number: '14' },
    { color: 'black', number: '17' },
    { color: 'black', number: '20' },
    { color: 'red', number: '23' },
    { color: 'black', number: '26' },
    { color: 'black', number: '29' },
    { color: 'red', number: '32' },
    { color: 'black', number: '35' }
  ],
  third: [
    { color: 'red', number: '1' },
    { color: 'black', number: '4' },
    { color: 'red', number: '7' },
    { color: 'black', number: '10' },
    { color: 'black', number: '13' },
    { color: 'red', number: '16' },
    { color: 'red', number: '19' },
    { color: 'black', number: '22' },
    { color: 'red', number: '25' },
    { color: 'black', number: '28' },
    { color: 'black', number: '31' },
    { color: 'red', number: '34' }
  ]
} as any;
const numbers = [
  ...numeric.first,
  ...numeric.second,
  ...numeric.third,
  { color: 'green', number: '0' }
];
const colors: any = {
  green: [GREEN, DARK_GREEN, 'black'],
  red: [RED, DARK_RED, 'white'],
  black: [BLACK, DARK_BLACK, 'white']
};

let values: any = {
  ctx: null,
  _ornamentImg: null,
  _centerX: null,
  _centerY: null,
  _outerEdge: 0,
  _outerRingOuterRadius: 0,
  _outerRingInnerRadius: 0,
  _innerRingInnerRadius: 0,
  _innerRingOuterRadius: 0,
  _ornamentX: 0,
  _ornamentY: 0,
  _ornamentHeight: 0,
  _ornamentWidth: 0,
  _slotTextRadius: 0,
  _slotTextSize: 0,
  _startOfTime: 0,
  _worldAngle: 0,
  _slotTextFont: 'normal 12px sans-serif',
  _ballRadius: 0,
  _ballX: 0,
  _ballY: 0,
  _ballVertOffset: 0,
  _ballVertRange: 0,
  _ballSettingsArcIncrement: 0,
  _ballSettingsSpinFinalTime: 0,
  _ballSettingsSpinStartTime: 0,
  _ballSettingsSpinTimeElapsed: 0,
  _ballSettingsSpinTotalTime: 0,
  _ballSettingsFinalPosition: 0,
  _ballSettingsShowBall: false
};

export default function GameContent() {
  const clickAudio = new Audio(click);
  const ballAudio = new Audio(ball);

  const { isLoggedIn, user } = useSelector((status) => status.auth);
  const { startBetRoulette } = useApi();

  const [loading, setLoading] = useState(false);
  const canvasRef: any = useRef(null);
  const [amount, setAmount] = useState<number>(1000);
  const [totalBet, setTotalBet] = useState<number>(0);
  const [chipDisplayValue, setChipDisplayValue] = useState<number>(1);
  const [bet, setBet] = useState<any>({});
  const [history, setHistory] = useState<any[]>([]);

  const onPlay = async () => {
    try {
      if (!isLoggedIn) {
        enqueueSnackbar('Need login to start game!', { variant: 'error' });
        return;
      }

      if (user.balance < totalBet) {
        enqueueSnackbar('Not enough funds!', { variant: 'error' });
        return;
      }

      setLoading(true);
      playSound(clickAudio);
      const res: any = await startBetRoulette(user._id, bet, totalBet);
      if (!res?.data) return;
      const { number } = res.data;
      playSound(ballAudio);
      putBallAtSlot(number, 3000);
      setTimeout(() => {
        setHistory([res?.data, ...history]);
      }, 3000);
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(`${err.response.data.message}!`, { variant: 'error' });
    }
  };

  const clear = () => {
    setBet({});
    setTotalBet(0);
    $('.bet-stack').fadeOut('fast', function () {
      $(this).remove();
    });
  };

  const redrawBackground = useCallback(() => {
    for (let i = 0; i < _slotTotal; i += 1) {
      const angle = i * _arcAngle;
      const _endAngle = angle + _arcAngle;
      values.ctx.fillStyle = DARK_BLACK;
      values.ctx.beginPath();
      values.ctx.arc(values._centerX, values._centerY, values._outerEdge, 0, FULL_CIRCLE, true);
      values.ctx.arc(
        values._centerX,
        values._centerY,
        values._outerRingOuterRadius,
        0,
        FULL_CIRCLE,
        false
      );
      values.ctx.fill();
      values.ctx.fillStyle = _outerColors[i];
      values.ctx.beginPath();
      values.ctx.arc(
        values._centerX,
        values._centerY,
        values._outerRingOuterRadius,
        angle,
        _endAngle,
        false
      );
      values.ctx.arc(
        values._centerX,
        values._centerY,
        values._outerRingInnerRadius,
        _endAngle,
        angle,
        true
      );
      values.ctx.fill();
      values.ctx.fillStyle = _innerColors[i];
      values.ctx.beginPath();
      values.ctx.arc(
        values._centerX,
        values._centerY,
        values._innerRingOuterRadius,
        angle,
        _endAngle,
        false
      );
      values.ctx.arc(
        values._centerX,
        values._centerY,
        values._innerRingInnerRadius,
        _endAngle,
        angle,
        true
      );
      values.ctx.fill();
      values.ctx.fillStyle = DARK_BLACK;
      values.ctx.beginPath();
      values.ctx.arc(
        values._centerX,
        values._centerY,
        values._innerRingInnerRadius,
        0,
        FULL_CIRCLE,
        true
      );
      values.ctx.arc(values._centerX, values._centerY, 0, 0, FULL_CIRCLE, false);
      values.ctx.fill();
      values.ctx.save();
      values.ctx.font = values._slotTextFont;
      values.ctx.lineWidth = 2;
      values.ctx.fillStyle = 'white';
      values.ctx.translate(
        values._centerX + Math.cos(angle + _arcAngle / 2) * values._slotTextRadius,
        values._centerY + Math.sin(angle + _arcAngle / 2) * values._slotTextRadius
      );
      values.ctx.rotate(angle + _arcAngle / 2 + Math.PI / 2);
      values.ctx.fillText(_numbers[i], -values.ctx.measureText(_numbers[i]).width / 2, 0);
      values.ctx.restore();
    }
    const f = () => {
      values.ctx.translate(values._centerX, values._centerY);
      values.ctx.drawImage(
        values._ornamentImg,
        values._ornamentX,
        values._ornamentY,
        values._ornamentWidth,
        values._ornamentHeight
      );
      values.ctx.setTransform(1, 0, 0, 1, 0, 0);
    };
    if (values._ballSettingsShowBall) f();
    else setTimeout(f, 100);
    values.ctx.save();
  }, []);

  const drawFrame = useCallback(
    (me: any) => {
      if (me._ballSettingsShowBall) {
        me.ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        redrawBackground();
        me.ctx.translate(me._centerX, me._centerY);
        values = {
          ...me,
          _ballSettingsSpinTimeElapsed: Date.now() - me._ballSettingsSpinStartTime
        };
        let f = me._ballSettingsSpinTimeElapsed / me._ballSettingsSpinTotalTime;
        f = f > 1 ? 1 : f;
        me.ctx.rotate((me._worldAngle + me._ballSettingsFinalPosition) * f);
        me.ctx.beginPath();
        me.ctx.fillStyle = 'white';
        let vertDeceleration;
        let g = me._ballSettingsSpinTimeElapsed / me._ballSettingsSpinTotalTime;
        g = g > 1 ? 1 : g;
        if (g < 0.1) vertDeceleration = 1;
        else vertDeceleration = (1 - g) * Math.abs(Math.sin(5 * g * g * me._worldAngle));
        const x = me._ballVertOffset + me._ballVertRange * vertDeceleration;
        me.ctx.arc(x, 0, me._ballRadius, 0, FULL_CIRCLE);
        me.ctx.fill();
        me.ctx.setTransform(1, 0, 0, 1, 0, 0);
      }
      window.requestAnimationFrame(() => drawFrame(values));
    },
    [redrawBackground]
  );

  const init = useCallback(() => {
    const canvas: any = $(canvasRef.current)[0];
    const ctx = canvas.getContext('2d');
    values.ctx = ctx;
    if (ctx) {
      values.ctx.clearRect(0, 0, canvas.width, canvas.height);
      const worldAngle = 0;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const outerEdge = canvas.width / 2;
      const outerRingOuterRadius = (canvas.width * 0.9) / 2;
      const outerRingInnerRadius = (canvas.width * 0.75) / 2;
      const innerRingOuterRadius = outerRingInnerRadius;
      const innerRingInnerRadius = innerRingOuterRadius * 0.8;
      const ornamentX = -innerRingInnerRadius / 2;
      const ornamentY = -innerRingInnerRadius / 2;
      const ornamentWidth = innerRingInnerRadius;
      const ornamentHeight = innerRingInnerRadius;
      const ballRadius = ((canvas.width / 2 - outerRingOuterRadius) / 2) * 0.9;
      const ballVertOffset = innerRingInnerRadius + ballRadius;
      const ballVertRange = outerRingOuterRadius - innerRingInnerRadius;
      const slotTextRadius =
        outerRingInnerRadius + (outerRingOuterRadius - outerRingInnerRadius) * 0.35;
      const slotTextSize = (outerRingOuterRadius - outerRingInnerRadius) * 0.5;
      const slotTextFont = `normal ${slotTextSize}px sans-serif`;
      const startOfTime = Date.now();
      const ornamentImg = new Image();
      ornamentImg.src = Ornament;
      values = {
        ...values,
        _ornamentImg: ornamentImg,
        _worldAngle: worldAngle,
        _centerX: centerX,
        _centerY: centerY,
        _outerEdge: outerEdge,
        _outerRingOuterRadius: outerRingOuterRadius,
        _outerRingInnerRadius: outerRingInnerRadius,
        _innerRingOuterRadius: innerRingOuterRadius,
        _innerRingInnerRadius: innerRingInnerRadius,
        _slotTextRadius: slotTextRadius,
        _slotTextSize: slotTextSize,
        _slotTextFont: slotTextFont,
        _ornamentX: ornamentX,
        _ornamentY: ornamentY,
        _ornamentWidth: ornamentWidth,
        _ornamentHeight: ornamentHeight,
        _ballRadius: ballRadius,
        _ballVertOffset: ballVertOffset,
        _ballVertRange: ballVertRange,
        _startOfTime: startOfTime
      };
      redrawBackground();
      window.requestAnimationFrame(() => drawFrame(values));
      const disableChipsFor = (elementId: any, chip: any) => {
        elementId = `[data-chip='${elementId}']`;
        $(elementId).on('mouseover', () => {
          // eslint-disable-next-line
          $.each($('.chip'), function (i, e) {
            if (chip.includes($(this).attr('data-chip'))) $(this).addClass('chip-disabled');
          });
        });
        $(elementId).on('mouseleave', () => {
          $('.chip').removeClass('chip-disabled');
        });
      };
      const chipConfig = [
        { id: 'row1', chips: rows.second.concat(rows.third) },
        { id: 'row2', chips: rows.first.concat(rows.third) },
        { id: 'row3', chips: rows.first.concat(rows.second) },
        { id: 'red', chips: rows.black },
        { id: 'black', chips: rows.red },
        { id: '1-12', chips: rows.numeric.second.concat(rows.numeric.third) },
        { id: '13-24', chips: rows.numeric.first.concat(rows.numeric.third) },
        { id: '25-36', chips: rows.numeric.first.concat(rows.numeric.second) },
        { id: '1-18', chips: rows.half.second },
        { id: '19-36', chips: rows.half.first },
        { id: 'odd', chips: rows.e.opposite },
        { id: 'even', chips: rows.e.even }
      ];
      chipConfig.forEach((config) => disableChipsFor(config.id, config.chips));
    }
  }, [drawFrame, redrawBackground]);

  useEffect(() => {
    init();
  }, [init]);

  const handleChipClick = (number: string) => {
    if (amount == null || amount <= 0) return;

    playSound(clickAudio);
    let stack = $(`#chip${number}`).find('.bet-stack');
    if (stack.length === 0) {
      stack = $(`<div class='bet-stack'></div>`);
      stack.hide().fadeIn('fast');
      $(`#chip${number}`).append(stack);
    }
    const e = $(
      `<div class='user-chip' data-display-value='${chipDisplayValue}' data-token-value='${amount}' style='margin-top: -${
        stack.children().length * 9
      }px'>${abbreviate(chipDisplayValue, 0)}</div>`
    );
    stack.append(e);

    const updatedBet = {
      ...bet,
      [number]: (bet[number] || 0) + Number(amount) * Number(chipDisplayValue)
    };
    setBet(updatedBet);

    const totalAmount = Number(
      Object.values(updatedBet).reduce((sum, n) => Number(sum) + Number(n), 0)
    );
    setTotalBet(totalAmount);
  };

  const findIndexOfSlot = (num: number) => {
    const slotNum = _numbers.indexOf(String(num));
    if (slotNum < 0) return false;
    return {
      index: slotNum,
      position: _arcAngle * (slotNum + 0.5)
    };
  };

  const initBallSpin = (time = 5000) => {
    values._ballSettingsSpinTotalTime = time;
    values._ballSettingsSpinStartTime = Date.now();
    values._ballSettingsSpinFinalTime =
      values._ballSettingsSpinStartTime + values._ballSettingsSpinTotalTime;
    setTimeout(() => {
      values._ballSettingsShowBall = false;
    }, time + 1000);
  };

  const putBallAtSlot = (num: number, time: number) => {
    const slot = findIndexOfSlot(num);
    if (slot === false) {
      values._ballSettingsShowBall = false;
      return;
    }
    initBallSpin(time);
    values._ballSettingsFinalPosition = 5 * 2 * Math.PI + slot.position - 0.005;
    values._ballSettingsArcIncrement =
      values._ballSettingsFinalPosition / values._ballSettingsSpinTotalTime;
    values._ballSettingsShowBall = true;
  };

  return (
    <Grid container spacing={3.5} className="game-roulette">
      <Grid item xs={12} sm={12} md={4}>
        <Stack
          sx={{
            borderRadius: `15px`,
            bgcolor: 'rgba(255, 255, 255, 0.04)',
            boxShadow: `0px 0px 2px 0px rgba(0, 0, 0, 0.25)`,
            gap: 2,
            px: 2.5,
            py: 3.5
          }}
        >
          <Stack direction="row" justifyContent="space-between" mt={1}>
            <Typography>Chip Value</Typography>
            <Stack direction="row" alignItems="center">
              <Typography>
                {toNumber(Number(chipDisplayValue) * Number(amount), 2, true)}
              </Typography>
              <img
                src="/assets/unicred.png"
                alt="unicred"
                width={22}
                style={{ padding: '0 4px' }}
              />
            </Stack>
          </Stack>
          <Tabs
            value={chipDisplayValue}
            onChange={(e, value) => setChipDisplayValue(value)}
            variant="scrollable"
            scrollButtons="auto"
            className="wager-chip wager-selector"
            sx={{
              background: defaultColor.dark4Background,
              borderRadius: '8px',
              [`& .${tabsClasses.scrollButtons}`]: {
                '&.Mui-disabled': { opacity: 0.3 },
                width: '34px',
                borderRadius: 'unset'
              },
              '& .MuiTabs-flexContainer': {
                my: '4px'
              }
            }}
          >
            {chips.map((item, key) => (
              <Tab
                key={key}
                value={item}
                data-token-value={item}
                data-display-value={item}
                className={`chip ${item === chipDisplayValue ? 'active' : ''}`}
                label={abbreviate(item, 0)}
              />
            ))}
          </Tabs>
          <Stack direction="row" justifyContent="space-between" mt={1}>
            <Typography>Bet Amount</Typography>
            <Stack direction="row" alignItems="center">
              <Typography>{toNumber(Number(totalBet), 2, true)}</Typography>
              <img
                src="/assets/unicred.png"
                alt="unicred"
                width={22}
                style={{ padding: '0 4px' }}
              />
            </Stack>
          </Stack>
          <Stack gap={0.4}>
            <Typography sx={{ fontSize: 11 }}>Bet Amount:</Typography>
            <InputBase
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value) || 0)}
              placeholder="0.00"
              type="number"
              error={parseFloat(String(amount)) <= 0}
              inputProps={{ step: 0.01, min: 0 }}
              startAdornment={
                <img
                  src="/assets/unicred.png"
                  alt="unicred"
                  width={22}
                  style={{ padding: '0 4px' }}
                />
              }
              endAdornment={
                <Stack sx={{ flexDirection: 'row', gap: 0.55 }}>
                  <Button
                    sx={{
                      background: defaultColor.dark3Background,
                      width: '25px',
                      height: '25px',
                      minWidth: 'auto',
                      minHeight: 'auto'
                    }}
                    onClick={() => setAmount(Number(amount) / 2)}
                  >
                    ½
                  </Button>
                  <Button
                    sx={{
                      background: defaultColor.dark3Background,
                      width: '25px',
                      height: '25px',
                      minWidth: 'auto',
                      minHeight: 'auto'
                    }}
                    onClick={() => setAmount(Number(amount) * 2)}
                  >
                    2×
                  </Button>
                </Stack>
              }
              sx={{ px: 1.25, py: 0.85, borderRadius: 1.25, background: `#303158` }}
            />
          </Stack>
          <Button
            fullWidth
            disabled={loading || amount <= 0 || totalBet <= 0}
            variant="contained"
            color="primary"
            sx={{ mt: 1 }}
            onClick={onPlay}
          >
            Bet
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={12} md={8}>
        <Box
          sx={{
            borderRadius: `25px`,
            bgcolor: 'rgba(255, 255, 255, 0.04)',
            boxShadow: `0px 0px 2px 0px rgba(0, 0, 0, 0.25)`,
            gap: 2,
            px: { xs: 1, md: 2.5 },
            py: 3.5,
            position: 'relative',
            overflow: 'hidden',
            padding: '0px !important'
          }}
          className="game-content-roulette"
        >
          <Box mt={2}>
            <Box className="flex justify-center items-center">
              <canvas ref={canvasRef} className="roulette-wheel" width="250" height="250" />
            </Box>
            <Box className="roulette-field">
              <Stack
                className="header"
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <span>Bet Amount</span>: <span id="bet">{toNumberTag(totalBet)}</span>
                </Box>
                <Box>
                  <Button
                    size="small"
                    // sx={{
                    //   '& .MuiButtonBase-root': {
                    //     height: '40px !important'
                    //   }
                    // }}
                    onClick={clear}
                  >
                    Clear
                  </Button>
                </Box>
              </Stack>
              <Box className="grid grid-rows-5 grid-flow-col gap-[2px]">
                <Box
                  id="chip0"
                  className="chip green row-span-3 col-span-1 content-center"
                  data-chip="0"
                  onClick={() => handleChipClick('0')}
                >
                  0
                </Box>
                <Box className="row-span-5 col-span-12 flex flex-col gap-[2px]">
                  <Box className="grid grid-cols-12 gap-[2px]">
                    {[...numeric.first, ...numeric.second, ...numeric.third].map((n, key) => (
                      <Box
                        key={key}
                        id={`chip${n.number}`}
                        className={`chip ${n.color}`}
                        data-chip={n.number}
                        onClick={() => handleChipClick(n.number)}
                      >
                        {n.number}
                      </Box>
                    ))}
                  </Box>
                  <Box className="row-span-2 col-span-12 flex flex-col gap-[2px]">
                    <Box className="grid grid-cols-3 gap-[2px]">
                      <Box
                        id="chip1-12"
                        className="chip bordered"
                        data-chip="1-12"
                        onClick={() => handleChipClick('1-12')}
                      >
                        1-12
                      </Box>
                      <Box
                        id="chip13-24"
                        className="chip bordered"
                        data-chip="13-24"
                        onClick={() => handleChipClick('13-24')}
                      >
                        13-24
                      </Box>
                      <Box
                        id="chip25-36"
                        className="chip bordered"
                        data-chip="25-36"
                        onClick={() => handleChipClick('25-36')}
                      >
                        25-35
                      </Box>
                    </Box>
                    <Box className="grid grid-cols-6 gap-[2px]">
                      <Box
                        id="chip1-18"
                        className="chip bordered"
                        data-chip="1-18"
                        onClick={() => handleChipClick('1-18')}
                      >
                        1-18
                      </Box>
                      <Box
                        id="chipeven"
                        className="chip bordered"
                        data-chip="even"
                        onClick={() => handleChipClick('even')}
                      >
                        Even
                      </Box>
                      <Box
                        id="chipred"
                        className="chip red"
                        data-chip="red"
                        onClick={() => handleChipClick('red')}
                      />
                      <Box
                        id="chipblack"
                        className="chip black"
                        data-chip="black"
                        onClick={() => handleChipClick('black')}
                      />
                      <Box
                        id="chipodd"
                        className="chip bordered"
                        data-chip="odd"
                        onClick={() => handleChipClick('odd')}
                      >
                        Odd
                      </Box>
                      <Box
                        id="chip19-36"
                        className="chip bordered"
                        data-chip="19-36"
                        onClick={() => handleChipClick('19-36')}
                      >
                        19-36
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box className="row-span-3 col-span-1 flex flex-col gap-[2px]">
                  <Box
                    id="chiprow1"
                    className="chip bordered"
                    data-chip="row1"
                    onClick={() => handleChipClick('row1')}
                  >
                    2:1
                  </Box>
                  <Box
                    id="chiprow2"
                    className="chip bordered"
                    data-chip="row2"
                    onClick={() => handleChipClick('row2')}
                  >
                    2:1
                  </Box>
                  <Box
                    id="chiprow3"
                    className="chip bordered"
                    data-chip="row3"
                    onClick={() => handleChipClick('row3')}
                  >
                    2:1
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="customHistory">
            {history.map((item, key) => {
              const data = numbers.find((e) => String(e.number) === String(item.number));
              const color: any = colors[data.color];
              return (
                <Box
                  key={key}
                  style={{
                    background: color[0],
                    borderBottom: `1px solid ${color[1]}`,
                    color: color[2]
                  }}
                  data-custom-history={key}
                  className="element"
                >
                  {item.number}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
