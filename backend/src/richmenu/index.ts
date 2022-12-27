import * as fs from 'fs';
import { Client } from '@line/bot-sdk';

const main = async () => {
  const client = new Client({
    channelAccessToken:
      'BftrtYwOjrCnxby1vfHiZo1PXsU+TeL2q2gqHIDXaqKjzCf5ZuBpQmby4MgqYWxLVTjvpehTGZTkP3JND8s96DLpsfOrGlZr4IkbwG/EaA4IcAafBfJwCRTEkjq8yUggSrm7RCgP7wpnRXGWgLbv7wdB04t89/1O/w1cDnyilFU=',
  });

  // delete existing richmenu
  const old = await client.getRichMenuList();
  for (const r of old) await client.deleteRichMenu(r.richMenuId);

  // create new richmenu
  const id = await client.createRichMenu({
    size: {
      width: 800,
      height: 270,
    },
    selected: true,
    name: 'default',
    chatBarText: '選單',
    areas: [
      {
        bounds: {
          x: 0,
          y: 0,
          width: 266,
          height: 135,
        },
        action: {
          type: 'postback',
          data: 'location',
          displayText: '時間地點',
        },
      },
      {
        bounds: {
          x: 266,
          y: 0,
          width: 267,
          height: 135,
        },
        action: {
          type: 'message',
          text: '2',
        },
      },
      {
        bounds: {
          x: 533,
          y: 0,
          width: 267,
          height: 135,
        },
        action: {
          type: 'postback',
          data: 'treasure',
          displayText: '婚禮尋寶',
        },
      },
      {
        bounds: {
          x: 0,
          y: 135,
          width: 266,
          height: 135,
        },
        action: {
          type: 'message',
          text: '4',
        },
      },
      {
        bounds: {
          x: 266,
          y: 135,
          width: 267,
          height: 135,
        },
        action: {
          type: 'message',
          text: '5',
        },
      },
      {
        bounds: {
          x: 533,
          y: 135,
          width: 267,
          height: 135,
        },
        action: {
          type: 'message',
          text: '6',
        },
      },
    ],
  });
  await client.setRichMenuImage(
    id,
    fs.createReadStream('./src/richmenu/menu.png')
  );
  await client.setDefaultRichMenu(id);
};

main();
