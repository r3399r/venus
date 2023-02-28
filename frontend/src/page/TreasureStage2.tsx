import { Profile } from '@liff/get-profile';
import liff from '@line/liff';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import treasureEndpoint from '../api/treasureEndpoint';
import Loader from '../component/Loader';
import { QuestionForm } from '../model/Form';

const TreasureStage2 = () => {
  const [profile, setProfile] = useState<Profile>();
  const { register, handleSubmit } = useForm<QuestionForm>();
  const [wrong, setWrong] = useState<boolean>(false);
  const [congrat, setCongrat] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    liff.ready.then(() => liff.getProfile()).then((res) => setProfile(res));
  }, []);

  const onSubmit = (data: QuestionForm) => {
    if (!profile) return;
    setWrong(false);
    setLoading(true);
    treasureEndpoint
      .putTreasure({
        userId: profile.userId,
        stage: 2,
        answer: data.answer,
      })
      .then(async () => {
        setCongrat(true);
        await liff.sendMessages([
          {
            type: 'text',
            text: '婚禮尋寶',
          },
        ]);
        setTimeout(() => {
          liff.closeWindow();
        }, 800);
      })
      .catch(() => {
        setWrong(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (!profile) return <></>;

  return (
    <>
      <div className="mx-2">請輸入答案</div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center flex-col">
        <input {...register('answer')} className="border-2 border-solid border-black h-10 p-2" />
        <button type="submit" className="bg-yellow-200 h-10 p-2">
          確定
        </button>
      </form>
      {congrat && <div className="text-center text-green-500">恭喜答對！</div>}
      {wrong && <div className="text-center text-red-500">不對喔！</div>}
      <Loader open={loading} />
    </>
  );
};

export default TreasureStage2;
