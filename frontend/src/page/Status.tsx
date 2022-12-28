import { useEffect, useState } from 'react';
import treasureEndpoint from '../api/treasureEndpoint';

const Status = () => {
  const [list, setList] = useState();

  useEffect(() => {
    treasureEndpoint.getTreasure().then((r) => console.log(r));
  }, []);

  return <></>;
};

export default Status;
