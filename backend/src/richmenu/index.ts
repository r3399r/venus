import * as fs from 'fs';
import { Client } from '@line/bot-sdk';
import { SSM } from 'aws-sdk';

const main = async () => {
  const ssm = new SSM({ region: 'ap-southeast-1' });

  const res = await ssm
    .getParameter({ Name: `venus-${process.argv[2]}-token` })
    .promise();

  const client = new Client({
    channelAccessToken: res.Parameter?.Value ?? 'xx',
  });

  // delete existing richmenu
  const old = await client.getRichMenuList();
  for (const r of old) await client.deleteRichMenu(r.richMenuId);

  // create new richmenu
  const id = await client.createRichMenu({
    size: {
      width: 1200,
      height: 800,
    },
    selected: true,
    name: 'default',
    chatBarText: '選單',
    areas: [
      {
        bounds: {
          x: 0,
          y: 0,
          width: 600,
          height: 400,
        },
        action: {
          type: 'postback',
          data: 'location',
          displayText: '時間地點',
        },
      },
      {
        bounds: {
          x: 600,
          y: 0,
          width: 600,
          height: 400,
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
          y: 400,
          width: 400,
          height: 400,
        },
        action: {
          type: 'postback',
          data: 'print',
          displayText: '印卡讚',
        },
      },
      {
        bounds: {
          x: 400,
          y: 400,
          width: 400,
          height: 400,
        },
        action: {
          type: 'uri',
          uri: 'https://wedding.celestialstudio.net/album',
        },
      },
      {
        bounds: {
          x: 800,
          y: 400,
          width: 400,
          height: 400,
        },
        action: {
          type: 'postback',
          data: 'record',
          displayText: '婚禮紀錄',
        },
      },
    ],
  });
  await client.setRichMenuImage(
    id,
    fs.createReadStream('./src/richmenu/menu.PNG')
  );
  await client.setDefaultRichMenu(id);
};

main();
