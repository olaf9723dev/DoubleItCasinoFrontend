import { useCallback, useEffect } from 'react';

const sub = (a: number, b: number, p = 8) => Math.round((a - b) * 10 ** p) / 10 ** p;
const add = (a: number, b: number, p = 8) => Math.round((a + b) * 10 ** p) / 10 ** p;

const AmountBox = ({ isMobile, playStatus, min, max, value, setValue }: any) => {
  const handleMax = () => {
    setValue(max);
  };
  const handleMin = () => {
    setValue(min);
  };
  const handlePlus = () => {
    if (value < 1) {
      setValue(add(value, 0.1));
    } else if (value >= 1 && value < 10) {
      setValue(add(value, 1));
    } else if (value >= 10) {
      setValue(add(value, 10));
    }
  };
  const handleMinus = () => {
    if (value <= 1) {
      setValue(sub(value, 0.1));
    } else if (value >= 1 && value <= 10) {
      setValue(sub(value, 1));
    } else if (value > 10) {
      setValue(sub(value, 10));
    }
  };

  const handleValue = useCallback(
    (e: number) => {
      if (e < min) setValue(min);
      else if (e > max) setValue(max);
    },
    [min, max, setValue]
  );

  useEffect(() => {
    handleValue(value);
  }, [value, handleValue]);

  return (
    <div className="amount-controller">
      {isMobile === 'desktop' ? (
        <div className={`amount-box ${playStatus && 'pointer-events-none'}`}>
          <div className="amount-landscape">
            <div className="amount-landscape-inner">
              <div className="amount-landscape-center">
                <input type="text" name="amount" value={value} readOnly disabled={playStatus} />
              </div>
              <div className="amount-landscape-btn-group">
                <button type="button" className="amount-landscape-btn top-left" onClick={handleMax}>
                  <span className={playStatus ? 'text-white/[0.5]' : ''}>max</span>
                </button>
                <button
                  type="button"
                  className="amount-landscape-btn top-right"
                  onClick={handlePlus}
                >
                  <span className={playStatus ? 'text-white/[0.5]' : ''}>+</span>
                </button>
                <button
                  type="button"
                  className="amount-landscape-btn bottom-left"
                  onClick={handleMin}
                >
                  <span className={playStatus ? 'text-white/[0.5]' : ''}>min</span>
                </button>
                <button
                  type="button"
                  className="amount-landscape-btn bottom-right"
                  onClick={handleMinus}
                >
                  <span className={playStatus ? 'text-white/[0.5]' : ''}>-</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : isMobile === 'mobile' ? (
        <div className={`mobile-amount-box ${playStatus && 'pointer-events-none'}`}>
          <div className="mobile-amount-controller">
            <div className="mobile-amount-inner">
              <div className="mobile-amount-title">Bet Amount</div>
              <div className="mobile-amount-btns">
                <div className="mobile-amount-btns-inner">
                  <button
                    type="button"
                    className={`btn-left ${playStatus && '!text-white/[0.5]'}`}
                    onClick={handleMin}
                  >
                    min
                  </button>
                  <button
                    type="button"
                    className={`btn-right ${playStatus && '!text-white/[0.5]'}`}
                    onClick={handleMinus}
                  >
                    -
                  </button>
                </div>
              </div>
              <div className="mobile-amount-input">
                <input
                  type="text"
                  name="amount"
                  value={`$ ${value}`}
                  readOnly
                  disabled={playStatus}
                />
              </div>
              <div className="mobile-amount-btns">
                <div className="mobile-amount-btns-inner">
                  <button
                    type="button"
                    className={`btn-left ${playStatus && '!text-white/[0.5]'}`}
                    onClick={handlePlus}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    className={`btn-right ${playStatus && '!text-white/[0.5]'}`}
                    onClick={handleMax}
                  >
                    max
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        isMobile === 'modal' && (
          <div className={`modal-amount-box ${playStatus && 'pointer-events-none'}`}>
            <div className="modal-amount-input">
              <input
                type="text"
                name="amount"
                value={`$ ${value}`}
                readOnly
                disabled={playStatus}
              />
            </div>
            <button type="button" className="modal-amount-input-btn" onClick={handleMin}>
              <div className="modal-amount-input-btn-inner">min</div>
            </button>
            <div className="modal-amount-input-btn-group">
              <div className="modal-amount-input-btn-inner">
                <button type="button" className="group-btn" onClick={handleMinus}>
                  -
                </button>
                <button type="button" className="group-btn" onClick={handlePlus}>
                  +
                </button>
              </div>
            </div>
            <div className="modal-amount-input-btn">
              <button type="button" className="modal-amount-input-btn-inner" onClick={handleMax}>
                max
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default AmountBox;
