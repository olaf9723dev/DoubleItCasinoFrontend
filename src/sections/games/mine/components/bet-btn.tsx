import CricketImg from '../../../../assets/mine/cricket.png';
import CricketShadowImg from '../../../../assets/mine/shadow.webp';

export default function BetBtn({
  isMobile,
  type,
  turboMode,
  turboList,
  loading,
  cardLoading,
  profitAmount,
  onClick
}: any) {
  return (
    <>
      {isMobile === 'desktop' ? (
        <button
          type="button"
          disabled={loading || cardLoading || (turboMode && turboList.length === 0)}
          onClick={onClick}
          className={`bet-button-${type} ${
            (loading || cardLoading || (turboMode && turboList.length === 0)) &&
            'pointer-events-none'
          }`}
        >
          <div className="bet-button-inner">
            <div className="bet-button-content">
              <div className="bet-button-text">
                {loading ? (
                  <div className="loading-container">
                    <img src={CricketShadowImg} alt="shadow" />
                    <div className="btn-loading">
                      <img src={CricketImg} alt="loading..." />
                    </div>
                  </div>
                ) : type === 'cancel' ? (
                  'Cancel'
                ) : type === 'cashOut' ? (
                  'Cash Out'
                ) : (
                  `${turboMode ? 'Place bet' : 'Start Game'}`
                )}
              </div>
              {type === 'cashOut' && profitAmount && (
                <div className="bet-button-sum">
                  <div className="bet-button-sum-content">
                    <span>${profitAmount}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </button>
      ) : (
        <button
          type="button"
          disabled={loading || cardLoading || (turboMode && turboList.length === 0)}
          onClick={onClick}
          className={`mobile-bet-button ${
            (loading || cardLoading || (turboMode && turboList.length === 0)) &&
            'pointer-events-none'
          }`}
        >
          <div className={`portrait-container _${type}`}>
            <div className="portrait-inner">
              <div className="portrait-content">
                {loading ? (
                  <div className="loading-container">
                    <img src={CricketShadowImg} alt="shadow" />
                    <div className="btn-loading">
                      <img src={CricketImg} alt="loading..." />
                    </div>
                  </div>
                ) : (
                  <>
                    {type === 'cancel' ? (
                      <span className="bet-button-text">Cancel</span>
                    ) : type === 'cashOut' ? (
                      <span className="bet-button-text">Cash Out</span>
                    ) : (
                      <span className="bet-button-text">
                        {turboMode ? 'Place bet' : 'Start Game'}
                      </span>
                    )}
                    {type === 'cashOut' && profitAmount && (
                      <span className="bet-button-sum">
                        <span>${profitAmount}</span>
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </button>
      )}
    </>
  );
}
