import ProfitBox from './components/profit-box';

export default function ProfitSetting({
  maxCount,
  turboMode,
  playStatus,
  profitCalcPage,
  currentIndex,
  profitList,
  currentProfitTextList
}: any) {
  return (
    <div className="profit-container">
      <div className="history">
        <div
          className="history-inner"
          style={{
            gridTemplateColumns: `repeat(${currentProfitTextList.length}, minmax(0, 1fr))`
          }}
        >
          {currentProfitTextList.map((item: any, ind: number) => (
            <ProfitBox
              key={ind}
              self={ind}
              value={item.value}
              turboMode={turboMode}
              playStatus={playStatus}
              currentProfit={
                turboMode
                  ? profitList[
                      maxCount * profitCalcPage + profitCalcPage > 0
                        ? ind > 0
                          ? maxCount * profitCalcPage + ind
                          : maxCount * profitCalcPage - 1
                        : ind
                    ]
                  : profitList[maxCount * profitCalcPage + ind]
              }
              currentProfitInd={currentIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
