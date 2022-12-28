import { useEffect, useState } from 'react';
import treasureEndpoint from '../api/treasureEndpoint';
import { Treasure } from '../model/Treasure';

const Status = () => {
  const [list, setList] = useState<Treasure[]>();
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    treasureEndpoint.getTreasure().then((res) => setList(res.data));
  }, [refresh]);

  const onUpdate = (userId: string, stage: number) => () => {
    treasureEndpoint.putTreasure({ userId, stage }).then(() => setRefresh(!refresh));
  };

  return (
    <div className="p-3">
      <div className="flex border-b-[1px] border-black p-1 font-bold">
        <div className="w-2/5">名稱</div>
        <div className="w-1/5">關卡</div>
        <div className="w-1/5">狀態</div>
        <div className="w-1/5" />
      </div>
      {list?.map((v) => (
        <div key={v.id} className="flex items-center border-b-[1px] border-black p-1">
          <div className="w-2/5">{v.displayName}</div>
          <div className="w-1/5">{v.stage}</div>
          <div className="w-1/5">{v.status}</div>
          <div className="w-1/5 text-right">
            {v.status === 'pending' && (
              <button className="p-1 bg-slate-300 rounded-xl" onClick={onUpdate(v.userId, v.stage)}>
                過關
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Status;
