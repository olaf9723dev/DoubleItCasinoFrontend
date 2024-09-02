const ToggleBox = ({ isMobile, playStatus, value, setValue }: any) => {
  return (
    <>
      {isMobile === 'desktop' ? (
        <button
          type="button"
          disabled={playStatus}
          onClick={() => setValue((prev: boolean) => !prev)}
          className={`toggle-box ${value && 'toggle-box_active'} ${
            playStatus && 'pointer-events-none'
          }`}
        >
          <div className="toggle-box-inner">
            <div className="toggle-box-btn" />
          </div>
        </button>
      ) : (
        <button
          type="button"
          disabled={playStatus}
          onClick={() => setValue((prev: boolean) => !prev)}
          className={`mobile-toggle-box ${playStatus && 'pointer-events-none'}`}
        >
          <div className={`mobile-toggle-box-container ${value && '_active'}`}>
            <div className="mobile-toggle-box-inner">
              <div className="mobile-toggle-box-title">Turbo</div>
              <div className="mobile-toggle-button" />
            </div>
          </div>
        </button>
      )}
    </>
  );
};

export default ToggleBox;
