import { Client, Message, PostbackEvent } from '@line/bot-sdk';
import { inject, injectable } from 'inversify';
import { DbAccess } from 'src/access/DbAccess';
import { TreasureAccess } from 'src/access/TreasureAccess';
import { Treasure } from 'src/model/Treasure';
import { TreasureEntity } from 'src/model/TreasureEntity';

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
        type: 'text',
        text: '112/3/26 (日) 午宴',
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
        text: 'https://www.google.com',
      },
      {
        type: 'text',
        text: '請點擊上面的網址，輸入通行碼: 123456，就可以開始印照片囉！門口印表機處將有熱心的服務人員為您服務。',
      },
    ]);
  }

  private getStageImgUrl(stage: number, data: Treasure[]) {
    const envr = process.env.ENVR;
    const welcomeUrl = `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img/welcome.jpg`;
    const passUrl = `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img/pass.png`;

    return data.find((v) => v.stage === stage)?.status === 'pass'
      ? passUrl
      : welcomeUrl;
  }

  public async replyTreasure(event: PostbackEvent) {
    const envr = process.env.ENVR;
    const liffId = process.env.LIFF_ID;
    const treasures = await this.treasureAccess.findByUserId(
      event.source.userId ?? 'xxx'
    );
    const isCompleted =
      treasures.filter((v) => v.status === 'pass').length === 5;

    const messageStages: Message = {
      type: 'template',
      altText: '婚禮尋寶',
      template: {
        type: 'carousel',
        columns: [
          {
            thumbnailImageUrl: this.getStageImgUrl(1, treasures),
            title: '菜單1',
            text: '第六道菜的名字？',
            actions:
              treasures.find((v) => v.stage === 1)?.status === 'pass'
                ? [
                    {
                      type: 'postback',
                      label: '我要答題',
                      data: 'done',
                      displayText: '我要答題',
                    },
                  ]
                : [
                    {
                      type: 'uri',
                      label: '我要答題',
                      uri: `https://liff.line.me/${liffId}/treasure/stage1`,
                    },
                  ],
          },
          {
            thumbnailImageUrl: this.getStageImgUrl(2, treasures),
            title: '菜單2',
            text: '菜單上的組合字',
            actions:
              treasures.find((v) => v.stage === 2)?.status === 'pass'
                ? [
                    {
                      type: 'postback',
                      label: '我要答題',
                      data: 'done',
                      displayText: '我要答題',
                    },
                  ]
                : [
                    {
                      type: 'uri',
                      label: '我要答題',
                      uri: `https://liff.line.me/${liffId}/treasure/stage2`,
                    },
                  ],
          },
          {
            thumbnailImageUrl: this.getStageImgUrl(3, treasures),
            title: '香檳塔',
            text: '香檳塔的堆疊規則1,3,6,10,15，總共35個杯子，你知道他有幾層嗎？',
            actions:
              treasures.find((v) => v.stage === 3)?.status === 'pass'
                ? [
                    {
                      type: 'postback',
                      label: '我要答題',
                      data: 'done',
                      displayText: '我要答題',
                    },
                  ]
                : [
                    {
                      type: 'uri',
                      label: '我要答題',
                      uri: `https://liff.line.me/${liffId}/treasure/stage3`,
                    },
                  ],
          },
          {
            thumbnailImageUrl: this.getStageImgUrl(4, treasures),
            title: '拍照背板',
            text: '輸入拍照背板上的文字',
            actions:
              treasures.find((v) => v.stage === 4)?.status === 'pass'
                ? [
                    {
                      type: 'postback',
                      label: '我要答題',
                      data: 'done',
                      displayText: '我要答題',
                    },
                  ]
                : [
                    {
                      type: 'uri',
                      label: '我要答題',
                      uri: `https://liff.line.me/${liffId}/treasure/stage4`,
                    },
                  ],
          },
          {
            thumbnailImageUrl: this.getStageImgUrl(5, treasures),
            title: '印卡讚',
            text: '用印卡讚洗一張照片吧！',
            actions:
              treasures.find((v) => v.stage === 5)?.status === 'pass'
                ? [
                    {
                      type: 'postback',
                      label: '我完成了',
                      data: 'done',
                      displayText: '我完成了',
                    },
                  ]
                : [
                    {
                      type: 'postback',
                      label: '我完成了',
                      data: 'finish#2',
                      displayText: '我完成了',
                    },
                  ],
          },
        ],
      },
    };

    const messageCongrat: Message[] = [
      {
        type: 'text',
        text: '恭喜你完成所有關卡！去找下面這個人拿禮物吧！',
      },
      {
        type: 'image',
        originalContentUrl: `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img/mbappe.jpg`,
        previewImageUrl: `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img/mbappe.jpg`,
      },
    ];

    await this.client.replyMessage(
      event.replyToken,
      isCompleted ? [messageStages, ...messageCongrat] : [messageStages]
    );
  }

  public async replyFinish2(event: PostbackEvent) {
    const envr = process.env.ENVR;

    if (event.source.userId === undefined) {
      await this.client.replyMessage(event.replyToken, [
        {
          type: 'text',
          text: '發生錯誤！你的 LINE 怪怪的...',
        },
      ]);

      return;
    }

    const res = await this.treasureAccess.findByUserId(event.source.userId);

    if (res.find((v) => v.stage === 2) === undefined) {
      const userProfile = await this.client.getProfile(event.source.userId);

      const treasure = new TreasureEntity();
      treasure.userId = event.source.userId;
      treasure.displayName = userProfile.displayName;
      treasure.stage = 2;
      treasure.status = 'pending';

      await this.treasureAccess.save(treasure);
    }
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

  public async replyDone(event: PostbackEvent) {
    await this.client.replyMessage(event.replyToken, [
      {
        type: 'text',
        text: '這關已經通過囉！',
      },
    ]);
  }
}
