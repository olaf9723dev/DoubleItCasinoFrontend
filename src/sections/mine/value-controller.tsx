import MineCounter from './components/mine-counter';
import AmountBox from './components/amount-box';

export default function ValueController({
  isMobile,
  playStatus,
  turboMode,
  turboList,
  minMine,
  maxMine,
  mineCount,
  setMineCount,
  minAmount,
  maxAmount,
  betAmount,
  setBetAmount
}: any) {
  return (
    <div className="value-controller">
      <div>
        <span>Wickets</span>
        <MineCounter
          isMobile={isMobile}
          playStatus={playStatus}
          turboMode={turboMode}
          turboList={turboList}
          min={minMine}
          max={maxMine}
          value={mineCount}
          setValue={setMineCount}
        />
      </div>
      <div>
        <span>Bet Amount</span>
        <AmountBox
          isMobile={isMobile}
          playStatus={playStatus}
          min={minAmount}
          max={maxAmount}
          value={betAmount}
          setValue={setBetAmount}
        />
      </div>
    </div>
  );
}
