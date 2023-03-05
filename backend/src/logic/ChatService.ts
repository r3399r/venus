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
        originalContentUrl: `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img/invitation.jpg`,
        previewImageUrl: `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img/invitation.jpg`,
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
        originalContentUrl: `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img/map.jpg`,
        previewImageUrl: `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img/map.jpg`,
      },
    ]);
  }

  public async replyRecord(event: PostbackEvent) {
    await this.client.replyMessage(event.replyToken, [
      {
        type: 'text',
        text: '等婚禮結束後，照片蒐集好就會上傳囉！',
      },
    ]);
  }

  public async replyPrint(event: PostbackEvent) {
    await this.client.replyMessage(event.replyToken, [
      {
        type: 'text',
        text: '此功能在婚禮當天會使用到，敬請期待！',
      },
    ]);
    // await this.client.replyMessage(event.replyToken, [
    //   {
    //     type: 'text',
    //     text: 'https://www.google.com',
    //   },
    //   {
    //     type: 'text',
    //     text: '請點擊上面的網址，輸入通行碼: 123456，就可以開始印照片囉！門口印表機處將有熱心的服務人員為您服務。',
    //   },
    // ]);
  }

  private getTemplateColumn1 = (treasures: Treasure[]): TemplateColumn => {
    const envr = process.env.ENVR;
    const liffId = process.env.LIFF_ID;
    const isPass = treasures.find((v) => v.stage === 1)?.status === 'pass';

    return isPass
      ? {
          thumbnailImageUrl: `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img/pass.png`,
          title: '菜單1',
          text: '第六道菜的名字？',
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
          thumbnailImageUrl: `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img/stage1.jpg`,
          title: '菜單1',
          text: '第六道菜的名字？',
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

    return isPass
      ? {
          thumbnailImageUrl: `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img/pass.png`,
          title: '菜單2',
          text: '菜單上的組合字',
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
          thumbnailImageUrl: `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img/welcome.jpg`,
          title: '菜單2',
          text: '菜單上的組合字',
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

    return isPass
      ? {
          thumbnailImageUrl: `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img/pass.png`,
          title: '香檳塔',
          text: '香檳塔的堆疊規則1,3,6,10,15，總共35個杯子，你知道他有幾層嗎？',
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
          thumbnailImageUrl: `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img/stage3.png`,
          title: '香檳塔',
          text: '香檳塔的堆疊規則1,3,6,10,15，總共35個杯子，你知道他有幾層嗎？',
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

    return isPass
      ? {
          thumbnailImageUrl: `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img/pass.png`,
          title: '拍照背板',
          text: '輸入拍照背板上的文字',
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
          thumbnailImageUrl: `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img/stage4.jpg`,
          title: '拍照背板',
          text: '輸入拍照背板上的文字',
          actions: [
            {
              type: 'uri',
              label: '我要答題',
              uri: `https://liff.line.me/${liffId}/treasure/stage4`,
            },
          ],
        };
  };

  private getTemplateColumn5 = (): TemplateColumn => {
    const envr = process.env.ENVR;

    return {
      thumbnailImageUrl: `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img/stage5.jpg`,
      title: '印卡讚',
      text: '用印卡讚洗一張照片吧！',
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
        text: '完成尋寶活動之後會有我們精心準備的禮物可以拿喔！',
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
            this.getTemplateColumn5(),
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
        text: '帶著你的照片去找下面這個人吧！他會讓你過關，他應該坐在最後一排',
      },
      {
        type: 'image',
        originalContentUrl: `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img/mbappe.jpg`,
        previewImageUrl: `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img/mbappe.jpg`,
      },
    ]);
  }

  public async replyDone(event: PostbackEvent, stage: number) {
    let text = '';

    if (stage === 1)
      text = '答案是「翡翠烏參煨花菇」\n這道菜是我們最喜歡的菜！';
    else if (stage === 2)
      text = '答案是「庭岳怡甄干蝦檸」\n庭岳與怡甄感謝您的到來～';
    else if (stage === 3)
      text =
        '答案是「5」\n香檳塔象徵堅不可摧的愛情，彼此互相扶持、永浴愛河，雙雙握住一瓶香檳，慢慢由上而下倒入，代表著源遠流長、細水長流的愛情，藉由一層層的香檳塔，將幸福層層疊起';
    else if (stage === 4)
      text = '答案是「庭岳&怡甄」\n婚宴結束時要來跟我們合影喔！';

    await this.client.replyMessage(event.replyToken, [
      {
        type: 'text',
        text,
      },
    ]);
  }
}
