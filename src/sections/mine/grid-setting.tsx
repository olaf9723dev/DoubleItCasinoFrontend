export default function GridSetting({ playStatus, turboMode, turboList, list, onClick }: any) {
  return (
    <div className="game-landscape-size-list">
      {list.map((item: any, ind: number) => (
        <button
          key={ind}
          type="button"
          className={`game-landscape-size-item ${
            item.active ? '_active !cursor-default' : '_hover'
          } ${
            (playStatus && !item.active) || (turboMode && turboList.length > 0) ? '_disabled' : ''
          }`}
          onClick={() => onClick(item.grid, ind)}
          disabled={(playStatus && !item.active) || (turboMode && turboList.length > 0)}
        >
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}
