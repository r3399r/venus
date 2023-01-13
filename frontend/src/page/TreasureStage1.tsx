import { Profile } from '@liff/get-profile';
import liff from '@line/liff';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import treasureEndpoint from '../api/treasureEndpoint';
import { QuestionForm } from '../model/Form';

const TreasureStage1 = () => {
  const [profile, setProfile] = useState<Profile>();
  const { register, handleSubmit } = useForm<QuestionForm>();
  const [wrong, setWrong] = useState<boolean>(false);
  const [congrat, setCongrat] = useState<boolean>(false);
  const [lock, setLock] = useState<boolean>(false);

  useEffect(() => {
    liff.ready.then(() => liff.getProfile()).then((res) => setProfile(res));
  }, []);

  const onSubmit = (data: QuestionForm) => {
    if (!profile) return;
    setWrong(false);
    setLock(true);
    treasureEndpoint
      .putTreasure({
        userId: profile.userId,
        stage: 1,
        answer: data.answer,
      })
      .then(() => setCongrat(true))
      .catch(() => {
        setWrong(true);
        setLock(false);
      });
  };

  if (!profile) return <></>;

  return (
    <>
      <div className="mx-2">題目：1+1=?</div>
      <div className="text-center mt-2">請輸入您的答案：</div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center flex-col">
        <input
          {...register('answer')}
          className="border-2 border-solid border-black h-10 p-2"
          disabled={lock}
        />
        <button type="submit" className="bg-yellow-200 h-10 p-2" disabled={lock}>
          確定
        </button>
      </form>
      {congrat && <div className="text-center text-green-500">恭喜答對！</div>}
      {wrong && <div className="text-center text-red-500">不對喔！</div>}
    </>
  );
};

export default TreasureStage1;
