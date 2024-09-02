import { useState, useEffect, useCallback } from 'react';
import { Grid } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useSelector } from 'src/store';
import useApi from 'src/hooks/use-api';
import CardBoard from './card-board';
import GridSetting from './grid-setting';
import ProfitSetting from './profit-setting';
import ValueController from './value-controller';
import SubmitController from './submit-controller';
import MineCounter from './components/mine-counter';
import AmountBox from './components/amount-box';
import ToggleBox from './components/toggle-box';
import BetBtn from './components/bet-btn';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function GameContent() {
  const { isLoggedIn, user } = useSelector((status) => status.auth);
  const { startBetMine, cancelBetMine, cashoutBetMine, checkMine, getMineProfitSetting } = useApi();

  /* assistant variables for control the game */
  const [playId, setPlayId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [playStatus, setPlayStatus] = useState<boolean>(false);
  const [cardLoading, setCardLoading] = useState<boolean>(false);
  const [currentTarget, setCurrentTarget] = useState<number>(-1);
  const [btnActionStatus, setBtnActionStatus] = useState<string>('start');

  /* variables for game setting */
  const [gridCount, setGridCount] = useState<number>(5);
  const [mineCount, setMineCount] = useState<number>(3);
  const [betAmount, setBetAmount] = useState<number>(10);
  const [turboMode, setTurboMode] = useState<boolean>(false);
  const [turboList, setTurboList] = useState<number[]>([]);
  const [gridDataList, setGridDataList] = useState<any[]>([]);
  const [gridSettingList, setGridSettingList] = useState<any[]>([
    { label: '3X3', grid: 3, active: false },
    { label: '5X5', grid: 5, active: true },
    { label: '7X7', grid: 7, active: false },
    { label: '9X9', grid: 9, active: false }
  ]);

  /* variables for profit calculate list */
  const [maxCount, setMaxCount] = useState(8);
  const [currentProfit, setCurrentProfit] = useState<number>(0);
  const [profitCalcList, setProfitCalcList] = useState<any[]>([]);
  const [profitCalcPage, setProfitCalcPage] = useState<number>(0);
  const [currentProfitInd, setCurrentProfitInd] = useState<number>(0);
  const [profitCalcTextList, setProfitCalcTextList] = useState<any[]>([]);
  const [currentProfitCalcTextList, setCurrentProfitCalcTextList] = useState<any[]>([]);

  const setGridSystem = (count: number, ind: number) => {
    const data = gridSettingList.map((item: any, index) =>
      index === ind ? { ...item, active: true, mine: null } : { ...item, active: false, mine: null }
    );
    setGridSettingList(data);
    setGridCount(count);
    switch (count) {
      case 3:
        setMineCount(2);
        break;
      case 5:
        setMineCount(3);
        break;
      case 7:
        setMineCount(5);
        break;
      case 9:
        setMineCount(10);
        break;
      default:
        break;
    }
  };

  const onClickMine = async (order: number) => {
    if (!isLoggedIn) {
      enqueueSnackbar('Need login to start game!', { variant: 'error' });
      return;
    }

    if (turboMode) {
      const grids: any[] = [...gridDataList];
      let turbos: number[] = [...turboList];
      const isTurboActive = turbos.indexOf(order) >= 0;

      if (isTurboActive) {
        grids[order].turbo = false;
        turbos = turbos.filter((item) => item !== order);
        if (profitCalcPage > 0 && currentProfitInd > 1) {
          setCurrentProfitInd((prevState) => prevState - 1);
        } else if (profitCalcPage > 0) {
          setCurrentProfitInd(maxCount);
          setProfitCalcPage((prevState) => prevState - 1);
        } else {
          setCurrentProfitInd((prevState) => prevState - 1);
        }
      } else {
        if (turboList.length >= gridCount * gridCount - mineCount) return;

        grids[order].turbo = true;
        turbos.push(order);
        if (currentProfitInd < maxCount) {
          setCurrentProfitInd((prevState) => prevState + 1);
        } else {
          setCurrentProfitInd(1);
          setProfitCalcPage((prevState) => prevState + 1);
        }
      }

      setTurboList(turbos);
      setGridDataList(grids);
      setCurrentTarget(order);
    } else {
      if (!playStatus || cardLoading) return;
      setCardLoading(true);
      setCurrentTarget(order);
      const res = await checkMine(user._id, playId, order);
      if (!res?.data) return;
      const data: any = [...gridDataList];
      if (res.data.result) {
        res.data.minePlace.forEach((ind: number) => {
          data[ind].card = '_lose';
          data[ind].mine = true;
          data[ind].active = true;
        });
        await sleep(500);
        setCardLoading(false);
        setGridDataList(data);
        setPlayStatus(false);
        setBtnActionStatus('start');
      } else {
        data[order].mine = res.data.result;
        data[order].active = true;
        const profit = profitCalcList[maxCount * profitCalcPage + currentProfitInd];
        data[order].card = profit >= 10 ? '_win3' : profit >= 2 ? '_win2' : '_win1';

        await sleep(500);
        setGridDataList(data);
        setCardLoading(false);
        setBtnActionStatus('cashOut');
        if (currentProfitInd < maxCount - 1) {
          setCurrentProfitInd((prevState) => prevState + 1);
        } else {
          setCurrentProfitInd(0);
          setProfitCalcPage((prevState) => prevState + 1);
        }
      }
    }
  };

  const handleBetSubmit = async () => {
    if (isLoggedIn) {
      try {
        setLoading(true);
        await sleep(500);
        if (btnActionStatus === 'start') {
          if (turboMode) {
            await initializeGridSystem(gridCount);
          } else {
            await initializeGame();
          }
          const res = await startBetMine(
            user._id,
            betAmount,
            gridCount,
            mineCount,
            turboMode ? 'TURBO' : 'NORMAL',
            turboList
          );
          if (!res?.data) return;
          const { playType } = res.data;

          if (playType === 'NORMAL') {
            setLoading(false);
            setPlayStatus(true);
            setPlayId(res.data.playId);
            setBtnActionStatus('cancel');
          } else {
            const { result, gridSystem } = res.data;
            const data = Array.from({ length: gridCount * gridCount }, () => ({
              card: '',
              active: false,
              turbo: false,
              mine: false
            }));

            turboList.forEach((ele: number, ind: number) => {
              const profit = profitCalcList[ind];
              let cardType = '_win1';

              if (profit >= 10) {
                cardType = '_win3';
              } else if (profit >= 2) {
                cardType = '_win2';
              }

              data[ele] = {
                ...data[ele],
                card: cardType,
                active: true
              };
            });

            if (result) {
              gridSystem.forEach((item: boolean, ind: number) => {
                if (item) {
                  data[ind] = {
                    ...data[ind],
                    card: '_lose',
                    mine: true,
                    active: true
                  };
                }
              });
            }
            setGridDataList(data);
            setLoading(false);
            setCardLoading(false);
            setPlayStatus(false);
            setBtnActionStatus('start');
          }
        } else if (btnActionStatus === 'cancel') {
          const res = await cancelBetMine(user._id, playId);
          if (!res?.data) return;
          setLoading(false);
          setPlayStatus(false);
          setPlayId('');
          setBtnActionStatus('start');
        } else {
          const res = await cashoutBetMine(user._id, playId);
          if (!res?.data) return;
          await sleep(500);
          setLoading(false);
          setCardLoading(false);
          setPlayStatus(false);
          setBtnActionStatus('start');
        }
      } catch (err: any) {
        console.error('Error submitting bet:', err);
      }
    } else {
      enqueueSnackbar('Need login to start game!', { variant: 'error' });
    }
  };

  const setCurrentProfitAmount = useCallback(() => {
    setCurrentProfit(
      profitCalcList[
        maxCount * profitCalcPage + profitCalcPage > 0
          ? currentProfitInd > 0
            ? maxCount * profitCalcPage + currentProfitInd - 1
            : maxCount * profitCalcPage - 1
          : currentProfitInd - 1
      ]
    );
  }, [maxCount, profitCalcPage, profitCalcList, currentProfitInd]);
  useEffect(() => {
    setCurrentProfitAmount();
  }, [currentProfitInd, setCurrentProfitAmount]);

  const initializeGridSystem = useCallback(
    async (count: number) => {
      const data = Array.from({ length: count * count }, () => ({
        card: '',
        active: false,
        turbo: false,
        mine: false
      }));
      setGridDataList(data);
    },
    [setGridDataList]
  );
  const initializeGame = useCallback(async () => {
    setPlayId('');
    setTurboList([]);
    setCurrentProfit(0);
    setCurrentTarget(-1);
    setProfitCalcPage(0);
    setCurrentProfitInd(0);
    initializeGridSystem(gridCount);
  }, [
    gridCount,
    setPlayId,
    setTurboList,
    setCurrentProfit,
    setCurrentTarget,
    setProfitCalcPage,
    setCurrentProfitInd,
    initializeGridSystem
  ]);
  useEffect(() => {
    initializeGame();
  }, [gridCount, turboMode, initializeGame]);

  const getProfitSetting = useCallback(async () => {
    const res = await getMineProfitSetting(gridCount, mineCount);
    if (!res?.data) return;
    setProfitCalcList(res.data.list);
    const formatValue = (item: number) => {
      if (item >= 1000 && item < 1000000) {
        return `${(item / 1000).toFixed(2)}K`;
      }
      if (item >= 1000000 && item < 1000000000) {
        return `${(item / 1000000).toFixed(2)}M`;
      }
      if (item >= 1000000000) {
        return `${(item / 1000000000).toFixed(2)}G`;
      }

      return item.toString();
    };
    const data = res.data.list.map((profit: number) => ({
      value: formatValue(profit),
      active: false
    }));
    setProfitCalcTextList(data);
    setCurrentProfitCalcTextList(
      data.slice(maxCount * profitCalcPage, maxCount * (profitCalcPage + 1))
    );
  }, [
    mineCount,
    gridCount,
    maxCount,
    profitCalcPage,
    setProfitCalcList,
    setProfitCalcTextList,
    setCurrentProfitCalcTextList,
    getMineProfitSetting
  ]);

  useEffect(() => {
    getProfitSetting();
  }, [mineCount, gridCount, getProfitSetting]);

  const handleProfitCalc = useCallback(() => {
    setCurrentProfitCalcTextList(
      profitCalcTextList.slice(maxCount * profitCalcPage, maxCount * (profitCalcPage + 1))
    );
  }, [profitCalcPage, maxCount, profitCalcTextList]);
  useEffect(() => {
    handleProfitCalc();
  }, [profitCalcPage, maxCount, handleProfitCalc]);

  const getWidth = () =>
    window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  useEffect(() => {
    const setResponsiveness = () => {
      if (getWidth() > 1024) {
        setMaxCount(8);
      } else if (getWidth() < 1024 && getWidth() > 768) {
        setMaxCount(7);
      } else if (getWidth() < 768 && getWidth() > 640) {
        setMaxCount(6);
      } else if (getWidth() < 640) {
        setMaxCount(5);
      }
    };
    setResponsiveness();
    window.addEventListener('resize', setResponsiveness);
  }, []);

  return (
    <Grid container spacing={3.5} className="game-mine">
      <div className="game-management-layout">
        <div className="game-landscape-top">
          <ProfitSetting
            maxCount={maxCount}
            turboMode={turboMode}
            playStatus={playStatus}
            profitCalcPage={profitCalcPage}
            currentIndex={currentProfitInd}
            profitList={profitCalcList}
            currentProfitTextList={currentProfitCalcTextList}
          />
        </div>
        <div className="game-landscape-content">
          <CardBoard
            onClickCard={onClickMine}
            gridCount={gridCount}
            turboMode={turboMode}
            cardLoading={cardLoading}
            playStatus={playStatus}
            currentTarget={currentTarget}
            dataList={gridDataList}
            turboList={turboList}
            currentProfitAmount={
              betAmount * profitCalcList[maxCount * profitCalcPage + currentProfitInd]
            }
          />
          {maxCount > 6 && (
            <div className="game-landscape-size">
              <GridSetting
                playStatus={playStatus}
                turboMode={turboMode}
                turboList={turboList}
                list={gridSettingList}
                onClick={setGridSystem}
              />
              <span>Grid</span>
            </div>
          )}
          {maxCount < 6 && (
            <div className="mobile-game-controller">
              <MineCounter
                isMobile="mobile"
                playStatus={playStatus}
                min={1}
                max={gridCount * gridCount - 1}
                value={mineCount}
                setValue={setMineCount}
              />
              <AmountBox
                isMobile="mobile"
                playStatus={playStatus}
                min={0.1}
                max={100}
                value={betAmount}
                setValue={(e: number) => !playStatus && setBetAmount(e)}
              />
              <div className="flex justify-center items-center gap-[10px]">
                <ToggleBox
                  isMobile="mobile"
                  playStatus={playStatus}
                  value={turboMode}
                  setValue={setTurboMode}
                />
                <BetBtn
                  isMobile="mobile"
                  onClick={handleBetSubmit}
                  type={btnActionStatus}
                  turboMode={turboMode}
                  turboList={turboList}
                  loading={loading}
                  cardLoading={cardLoading}
                  profitAmount={(betAmount * currentProfit).toFixed(2)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {maxCount >= 6 && (
        <>
          <div className="absolute left-[20px] slg:left-[40px] bottom-0">
            <ValueController
              isMobile="desktop"
              playStatus={playStatus}
              turboMode={turboMode}
              turboList={turboList}
              // mine setting
              minMine={1}
              maxMine={gridCount * gridCount - 1}
              mineCount={mineCount}
              setMineCount={setMineCount}
              // bet amount setting
              minAmount={0.1}
              maxAmount={100}
              betAmount={betAmount}
              setBetAmount={(e: number) => !playStatus && setBetAmount(e)}
            />
          </div>
          <div className="absolute right-[20px] slg:right-[40px] bottom-0">
            <SubmitController
              isMobile="desktop"
              playStatus={playStatus}
              // turbo mode setting
              turboMode={turboMode}
              turboList={turboList}
              setTurboMode={(e: boolean) => !playStatus && setTurboMode(e)}
              // bet button setting
              btnRole={btnActionStatus}
              loading={loading}
              cardLoading={cardLoading}
              onSumbit={handleBetSubmit}
              profitAmount={(betAmount * currentProfit).toFixed(2)}
            />
          </div>
        </>
      )}
    </Grid>
  );
}
