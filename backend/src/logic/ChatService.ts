import {
  Client,
  MessageEvent,
  PostbackEvent,
  TemplateColumn,
} from '@line/bot-sdk';
import { inject, injectable } from 'inversify';
import { DbAccess } from 'src/access/DbAccess';
import { TreasureAccess } from 'src/access/TreasureAccess';
import { Treasure } from 'src/model/Treasure';

/**
 * Service class for chat
 */
@injectable()
export class ChatService {
  @inject(DbAccess)
  private readonly dbAccess!: DbAccess;

  @inject(TreasureAccess)
  private readonly treasureAccess!: TreasureAccess;

  @inject(Client)
  private readonly client!: Client;

  public async cleanup() {
    await this.dbAccess.cleanup();
  }

  public async replyMap(event: PostbackEvent) {
    const envr = process.env.ENVR;
    await this.client.replyMessage(event.replyToken, [
      {
        type: 'image',
        originalContentUrl: `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img08101622/invitation.jpg`,
        previewImageUrl: `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img08101622/invitation.jpg`,
      },
      {
        type: 'location',
        title: '台中林皇宮',
        address: '台中市西屯區臺灣大道三段 33 號',
        longitude: 120.648341,
        latitude: 24.162702,
      },
      {
        type: 'image',
        originalContentUrl: `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img08101622/map.jpg`,
        previewImageUrl: `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img08101622/map.jpg`,
      },
    ]);
  }

  public async replyRecord(event: PostbackEvent) {
    const envr = process.env.ENVR;
    await this.client.replyMessage(event.replyToken, [
      {
        type: 'imagemap',
        baseUrl: `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img08101622/imagemap`,
        altText: '我們的婚禮紀錄',
        baseSize: {
          width: 1040,
          height: 1040,
        },
        actions: [
          {
            type: 'uri',
            label: '結婚登記',
            linkUri:
              'https://u.pcloud.link/publink/show?code=kZMJINVZJ6MRPB2qpK4WvbmuAa38159b9BJk#folder=18354585007&tpl=publicfoldergrid',
            area: {
              x: 0,
              y: 0,
              width: 520,
              height: 208,
            },
          },
          {
            type: 'uri',
            label: '訂婚',
            linkUri:
              'https://u.pcloud.link/publink/show?code=kZMJINVZJ6MRPB2qpK4WvbmuAa38159b9BJk#folder=18354579608&tpl=publicfoldergrid',
            area: {
              x: 0,
              y: 208,
              width: 520,
              height: 208,
            },
          },
          {
            type: 'uri',
            label: '迎娶',
            linkUri:
              'https://u.pcloud.link/publink/show?code=kZMJINVZJ6MRPB2qpK4WvbmuAa38159b9BJk#folder=18354579153&tpl=publicfoldergrid',
            area: {
              x: 0,
              y: 416,
              width: 520,
              height: 208,
            },
          },
          {
            type: 'uri',
            label: '印卡讚-賓客上傳',
            linkUri:
              'https://u.pcloud.link/publink/show?code=kZMJINVZJ6MRPB2qpK4WvbmuAa38159b9BJk#folder=18354578641&tpl=publicfoldergrid',
            area: {
              x: 0,
              y: 624,
              width: 260,
              height: 416,
            },
          },
          {
            type: 'uri',
            label: '印卡讚-美顏相機',
            linkUri:
              'https://u.pcloud.link/publink/show?code=kZMJINVZJ6MRPB2qpK4WvbmuAa38159b9BJk#folder=18354577635&tpl=publicfoldergrid',
            area: {
              x: 260,
              y: 624,
              width: 260,
              height: 416,
            },
          },
          {
            type: 'uri',
            label: '宴客-迎賓',
            linkUri:
              'https://u.pcloud.link/publink/show?code=kZMJINVZJ6MRPB2qpK4WvbmuAa38159b9BJk#folder=18354580337&tpl=publicfoldergrid',
            area: {
              x: 520,
              y: 0,
              width: 520,
              height: 173,
            },
          },
          {
            type: 'uri',
            label: '宴客-一進',
            linkUri:
              'https://u.pcloud.link/publink/show?code=kZMJINVZJ6MRPB2qpK4WvbmuAa38159b9BJk#folder=18354581051&tpl=publicfoldergrid',
            area: {
              x: 520,
              y: 173,
              width: 520,
              height: 173,
            },
          },
          {
            type: 'uri',
            label: '宴客-二進',
            linkUri:
              'https://u.pcloud.link/publink/show?code=kZMJINVZJ6MRPB2qpK4WvbmuAa38159b9BJk#folder=18354581660&tpl=publicfoldergrid',
            area: {
              x: 520,
              y: 346,
              width: 520,
              height: 174,
            },
          },
          {
            type: 'uri',
            label: '宴客-逐桌敬酒',
            linkUri:
              'https://u.pcloud.link/publink/show?code=kZMJINVZJ6MRPB2qpK4WvbmuAa38159b9BJk#folder=18354582484&tpl=publicfoldergrid',
            area: {
              x: 520,
              y: 520,
              width: 520,
              height: 173,
            },
          },
          {
            type: 'uri',
            label: '宴客-送客',
            linkUri:
              'https://u.pcloud.link/publink/show?code=kZMJINVZJ6MRPB2qpK4WvbmuAa38159b9BJk#folder=18354583217&tpl=publicfoldergrid',
            area: {
              x: 520,
              y: 693,
              width: 520,
              height: 173,
            },
          },
          {
            type: 'uri',
            label: '宴客-新娘房&花園',
            linkUri:
              'https://u.pcloud.link/publink/show?code=kZMJINVZJ6MRPB2qpK4WvbmuAa38159b9BJk#folder=18354584192&tpl=publicfoldergrid',
            area: {
              x: 520,
              y: 866,
              width: 520,
              height: 174,
            },
          },
          {
            type: 'uri',
            label: '全部',
            linkUri:
              'https://u.pcloud.link/publink/show?code=kZMJINVZJ6MRPB2qpK4WvbmuAa38159b9BJk',
            area: {
              x: 454,
              y: 476,
              width: 130,
              height: 84,
            },
          },
        ],
      },
    ]);
  }

  public async replyPrint(event: PostbackEvent) {
    const envr = process.env.ENVR;
    await this.client.replyMessage(event.replyToken, [
      {
        type: 'image',
        originalContentUrl: `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img08101622/tutorial.jpg`,
        previewImageUrl: `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img08101622/tutorial.jpg`,
      },
      {
        type: 'text',
        text: '通關密語：2️⃣5️⃣5️⃣2️⃣3️⃣\n🔰操作步驟:\n1. 點擊下方連結\n2. 輸入「通關密語」\n3. 點選「列印」，上傳照片合成專屬圖框\n4. 稍候片刻，至印卡讚機台領取相片',
      },
      {
        type: 'text',
        text: 'http://p031.inkazan.com/index.php/fblogin',
      },
    ]);
  }

  private getTemplateColumn1 = (treasures: Treasure[]): TemplateColumn => {
    const envr = process.env.ENVR;
    const liffId = process.env.LIFF_ID;
    const isPass = treasures.find((v) => v.stage === 1)?.status === 'pass';
    const title = '菜單1';
    const question = '倒數第二道菜的名字？';

    return isPass
      ? {
          thumbnailImageUrl: `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img08101622/pass1.jpg`,
          title,
          text: question,
          actions: [
            {
              type: 'postback',
              label: '我要看答案',
              data: 'done1',
              displayText: '我要看答案',
            },
          ],
        }
      : {
          thumbnailImageUrl: `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img08101622/stage1.jpg`,
          title,
          text: question,
          actions: [
            {
              type: 'uri',
              label: '我要答題',
              uri: `https://liff.line.me/${liffId}/treasure/stage1`,
            },
          ],
        };
  };

  private getTemplateColumn2 = (treasures: Treasure[]): TemplateColumn => {
    const envr = process.env.ENVR;
    const liffId = process.env.LIFF_ID;
    const isPass = treasures.find((v) => v.stage === 2)?.status === 'pass';
    const title = '菜單2';
    const question = '菜單上的組合字 (點圖可以看放大圖)';

    return isPass
      ? {
          thumbnailImageUrl: `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img08101622/pass2.jpg`,
          title,
          text: question,
          actions: [
            {
              type: 'postback',
              label: '我要看答案',
              data: 'done2',
              displayText: '我要看答案',
            },
          ],
        }
      : {
          thumbnailImageUrl: `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img08101622/stage2.png`,
          title,
          text: question,
          defaultAction: {
            type: 'uri',
            label: '我要看大圖',
            uri: `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img08101622/stage2.png`,
          },
          actions: [
            {
              type: 'uri',
              label: '我要答題',
              uri: `https://liff.line.me/${liffId}/treasure/stage2`,
            },
          ],
        };
  };

  private getTemplateColumn3 = (treasures: Treasure[]): TemplateColumn => {
    const envr = process.env.ENVR;
    const liffId = process.env.LIFF_ID;
    const isPass = treasures.find((v) => v.stage === 3)?.status === 'pass';
    const title = '位上禮';
    const question = '位上禮的餅乾看起來像什麼動物呢？';

    return isPass
      ? {
          thumbnailImageUrl: `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img08101622/pass3.jpg`,
          title,
          text: question,
          actions: [
            {
              type: 'postback',
              label: '我要看答案',
              data: 'done3',
              displayText: '我要看答案',
            },
          ],
        }
      : {
          thumbnailImageUrl: `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img08101622/stage3.jpg`,
          title,
          text: question,
          actions: [
            {
              type: 'uri',
              label: '我要答題',
              uri: `https://liff.line.me/${liffId}/treasure/stage3`,
            },
          ],
        };
  };

  private getTemplateColumn4 = (treasures: Treasure[]): TemplateColumn => {
    const envr = process.env.ENVR;
    const liffId = process.env.LIFF_ID;
    const isPass = treasures.find((v) => v.stage === 4)?.status === 'pass';
    const title = '香檳塔';
    const question =
      '香檳塔的堆疊規則1,3,6,10，總共20個杯子，你知道他有幾層嗎？';

    return isPass
      ? {
          thumbnailImageUrl: `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img08101622/pass4.jpg`,
          title,
          text: question,
          actions: [
            {
              type: 'postback',
              label: '我要看答案',
              data: 'done4',
              displayText: '我要看答案',
            },
          ],
        }
      : {
          thumbnailImageUrl: `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img08101622/stage4.png`,
          title,
          text: question,
          actions: [
            {
              type: 'uri',
              label: '我要答題',
              uri: `https://liff.line.me/${liffId}/treasure/stage4`,
            },
          ],
        };
  };

  private getTemplateColumn5 = (treasures: Treasure[]): TemplateColumn => {
    const envr = process.env.ENVR;
    const liffId = process.env.LIFF_ID;
    const title = '拍照背板';
    const isPass = treasures.find((v) => v.stage === 5)?.status === 'pass';
    const question = '拍照背板上有什麼文字呢？';

    return isPass
      ? {
          thumbnailImageUrl: `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img08101622/pass5.jpg`,
          title,
          text: question,
          actions: [
            {
              type: 'postback',
              label: '我要看答案',
              data: 'done5',
              displayText: '我要看答案',
            },
          ],
        }
      : {
          thumbnailImageUrl: `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img08101622/stage5.jpg`,
          title,
          text: question,
          actions: [
            {
              type: 'uri',
              label: '我要答題',
              uri: `https://liff.line.me/${liffId}/treasure/stage5`,
            },
          ],
        };
  };

  private getTemplateColumn6 = (): TemplateColumn => {
    const envr = process.env.ENVR;

    return {
      thumbnailImageUrl: `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img08101622/stage6.jpg`,
      title: '印卡讚',
      text: '點擊選單左下角的「印卡讚」，用印卡讚洗一張照片吧！',
      actions: [
        {
          type: 'postback',
          label: '我完成了',
          data: 'finish#2',
          displayText: '我完成了',
        },
      ],
    };
  };

  public async replyTreasure(event: MessageEvent) {
    const treasures = await this.treasureAccess.findByUserId(
      event.source.userId ?? 'xxx'
    );

    await this.client.replyMessage(event.replyToken, [
      {
        type: 'text',
        text: '我們設計了尋寶活動，希望您可以好好享受這場婚宴！完成尋寶活動會有驚喜喔！',
      },
      {
        type: 'template',
        altText: '婚禮尋寶',
        template: {
          type: 'carousel',
          columns: [
            this.getTemplateColumn1(treasures),
            this.getTemplateColumn2(treasures),
            this.getTemplateColumn3(treasures),
            this.getTemplateColumn4(treasures),
            this.getTemplateColumn5(treasures),
            this.getTemplateColumn6(),
          ],
        },
      },
    ]);
  }

  public async replyFinish2(event: PostbackEvent) {
    const envr = process.env.ENVR;
    await this.client.replyMessage(event.replyToken, [
      {
        type: 'text',
        text: '帶著你的照片去找榮恩衛斯立耘吧！他會告訴你接下來該怎麼做',
      },
      {
        type: 'image',
        originalContentUrl: `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img08101622/liyun.jpg`,
        previewImageUrl: `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img08101622/liyun.jpg`,
      },
    ]);
  }

  public async replyDone(event: PostbackEvent, stage: number) {
    let text = '';

    if (stage === 1)
      text =
        '答案是「西檸雞球拼腐皮捲」\n這道菜是我們很喜歡的菜，您一定要嚐嚐！';
    else if (stage === 2)
      text = '答案是「庭岳怡甄干蝦檸」\n庭岳與怡甄感謝您的到來～';
    else if (stage === 3)
      text = '答案是「兔子」或「黑輪」\n我們有養一隻兔子叫做黑輪喔！';
    else if (stage === 4)
      text =
        '答案是「4」\n香檳塔象徵堅不可摧的愛情，彼此互相扶持、永浴愛河，雙雙握住一瓶香檳，慢慢由上而下倒入，代表著源遠流長、細水長流的愛情，藉由一層層的香檳塔，將幸福層層疊起';
    else if (stage === 5)
      text = '答案是「庭岳&怡甄」\n婚宴結束時要來跟我們合影喔！';

    await this.client.replyMessage(event.replyToken, [
      {
        type: 'text',
        text,
      },
    ]);
  }
}
