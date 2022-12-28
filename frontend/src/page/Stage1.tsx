import { Profile } from '@liff/get-profile';
import liff from '@line/liff';
import { useEffect, useState } from 'react';

const Stage1 = () => {
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    liff.ready.then(liff.getProfile).then((res) => setProfile(res));
  }, []);

  return <>{profile?.displayName}</>;
};

export default Stage1;
