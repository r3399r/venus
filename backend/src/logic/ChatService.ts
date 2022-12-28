import { Client, PostbackEvent } from '@line/bot-sdk';
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
    const liffId = process.env.LIFF_ID;
    const treasures = await this.treasureAccess.findByUserId(
      event.source.userId ?? 'xxx'
    );

    await this.client.replyMessage(event.replyToken, [
      {
        type: 'template',
        altText: '婚禮尋寶',
        template: {
          type: 'carousel',
          columns: [
            {
              thumbnailImageUrl: this.getStageImgUrl(1, treasures),
              title: '第一關',
              text: '1+1=?',
              actions: [
                {
                  type: 'uri',
                  label: '我要答題',
                  uri: `https://liff.line.me/${liffId}/treasure/stage1`,
                },
              ],
            },
            {
              thumbnailImageUrl: this.getStageImgUrl(2, treasures),
              title: '第二關',
              text: '去拍一張照',
              actions: [
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
      },
    ]);
  }

  public async replyFinish2(event: PostbackEvent) {
    const envr = process.env.ENVR;

    const treasure = new TreasureEntity();
    treasure.userId = event.source.userId ?? 'xxx';
    treasure.stage = 2;
    treasure.status = 'pending';

    await this.treasureAccess.save(treasure);
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
}
