import ToggleBox from './components/toggle-box';
import BetBtn from './components/bet-btn';

export default function SubmitController({
  isMobile,
  playStatus,
  turboMode,
  turboList,
  setTurboMode,
  loading,
  btnRole,
  cardLoading,
  onSumbit,
  profitAmount
}: any) {
  return (
    <div className="submit-controller">
      <div>
        <span>Turbo</span>
        <div className="turbo-control-action">
          <ToggleBox
            isMobile={isMobile}
            playStatus={playStatus}
            value={turboMode}
            setValue={setTurboMode}
          />
        </div>
      </div>
      <BetBtn
        onClick={onSumbit}
        isMobile={isMobile}
        type={btnRole}
        turboMode={turboMode}
        turboList={turboList}
        loading={loading}
        cardLoading={cardLoading}
        profitAmount={profitAmount}
      />
    </div>
  );
}
