export default function Card({
  card,
  active,
  turbo,
  mine,
  playStatus,
  self,
  currentTarget,
  currentProfitAmount,
  loading,
  turboMode,
  turboList,
  onClick
}: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`play-target-item ${
        !active && (turboMode || playStatus) ? '_hover' : 'pointer-events-none'
      }`}
    >
      <div
        className={`target-item-inner ${!turboMode && !playStatus && 'before:opacity-[0.5]'} ${
          turboMode
            ? `${turbo && '_turbo_active'} ${
                active
                  ? mine
                    ? `_lose ${turboList.indexOf(self) >= 0 ? 'opacity-[1]' : 'opacity-[0.5]'}`
                    : card
                  : turboList.indexOf(self) >= 0 && '_turbo_active'
              } ${loading && turboList.indexOf(self) >= 0 && '_loading'}`
            : loading && currentTarget === self
            ? '_loading'
            : active &&
              (mine ? `_lose ${currentTarget === self ? 'opacity-[1]' : 'opacity-[0.5]'}` : card)
        }`}
      >
        {turboMode ? (
          !active && turboList.indexOf(self) >= 0 && <span className="turbo-mark">?</span>
        ) : (
          <span className="target-item-sum">${currentProfitAmount.toFixed(2)}</span>
        )}
      </div>
      {!active && <div className="_shadow" />}
    </button>
  );
}
