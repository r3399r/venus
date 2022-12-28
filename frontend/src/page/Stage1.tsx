import { Profile } from '@liff/get-profile';
import liff from '@line/liff';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { QuestionForm } from '../model/Form';

const Stage1 = () => {
  const [profile, setProfile] = useState<Profile>();
  const { register, handleSubmit } = useForm<QuestionForm>();

  const [ans, setAns] = useState<string>();

  useEffect(() => {
    liff.ready.then(() => liff.getProfile()).then((res) => setProfile(res));
  }, []);

  const onSubmit = (data: QuestionForm) => {
    setAns(data.answer);
    liff.sendMessages([{ type: 'text', text: '恭喜通過第一關' }]).then(() => liff.closeWindow());
  };

  if (!profile) return <></>;

  return (
    <>
      <div className="text-center">hello {profile.userId}</div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center flex-col">
        <input {...register('answer')} className="border-2 border-solid border-black h-10 p-2" />
        <button type="submit" className="bg-yellow-200 h-10 p-2">
          確定
        </button>
      </form>
      <div>{ans}</div>
    </>
  );
};

export default Stage1;
