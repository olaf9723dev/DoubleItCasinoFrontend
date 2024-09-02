const MineCounter = ({
  isMobile,
  playStatus,
  turboMode,
  turboList,
  min,
  max,
  value,
  setValue
}: any) => {
  const onChange = (e: number) => {
    if (e < min) return;
    if (e > max) return;
    setValue(e);
  };

  const decrease = () => {
    if (value <= min) return;
    setValue(Number(value) - 1);
  };

  const increase = () => {
    if (value >= max) return;
    setValue(Number(value) + 1);
  };

  return (
    <div className="mine-controller">
      {isMobile === 'desktop' ? (
        <div
          className={`mine-box ${
            (playStatus || (turboMode && turboList.length > 0)) && 'pointer-events-none'
          }`}
        >
          <div className="mine-box-inner">
            <button
              type="button"
              className={`mine-box-control-btn ${!playStatus && '_active'}`}
              onClick={decrease}
            >
              <span>-</span>
            </button>
            <input
              type="number"
              value={value}
              onChange={(e: any) => onChange(e.target.value)}
              disabled={playStatus}
              className={playStatus ? '!text-white/[0.5]' : 'text-white'}
            />
            <button
              type="button"
              className={`mine-box-control-btn ${!playStatus && '_active'}`}
              onClick={increase}
            >
              <span>+</span>
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`mobile-mine-box ${
            (playStatus || (turboMode && turboList.length > 0)) && 'pointer-events-none'
          }`}
        >
          <div className="mobile-mine-btns">
            <div className="mobile-mine-btns-inner">
              <button type="button" className="wicket-btn" onClick={() => onChange(5)}>
                5
              </button>
              <button type="button" className="wicket-btn" onClick={() => onChange(7)}>
                7
              </button>
              <button type="button" className="wicket-btn" onClick={() => onChange(10)}>
                10
              </button>
              <button type="button" className="wicket-btn" onClick={() => onChange(12)}>
                12
              </button>
            </div>
          </div>
          <div className="mobile-mine-input">
            <button type="button" className="input-btn" onClick={decrease}>
              <span className="input-btn-inner">-</span>
            </button>
            <input
              type="number"
              value={value}
              onChange={(e: any) => onChange(e.target.value)}
              disabled={playStatus}
              className={playStatus ? '!text-white/[0.5]' : 'text-white'}
            />
            <button type="button" className="input-btn" onClick={increase}>
              <span className="input-btn-inner">+</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MineCounter;
