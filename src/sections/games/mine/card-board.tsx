import Card from './components/card';

export default function CardBoard({
  gridCount,
  turboMode,
  cardLoading,
  playStatus,
  currentTarget,
  currentProfitAmount,
  dataList,
  turboList,
  onClickCard
}: any) {
  return (
    <div
      className="game-landscape-card-group"
      style={{ gridTemplateColumns: `repeat(${gridCount}, minmax(0, 1fr))` }}
    >
      {dataList.map((item: any, ind: number) => (
        <Card
          key={ind}
          card={item.card}
          turboMode={turboMode}
          turbo={item.turbo}
          turboList={turboList}
          loading={cardLoading}
          playStatus={playStatus}
          active={item.active}
          mine={item.mine}
          self={ind}
          currentTarget={currentTarget}
          currentProfitAmount={currentProfitAmount}
          onClick={() => onClickCard(ind)}
        />
      ))}
    </div>
  );
}
