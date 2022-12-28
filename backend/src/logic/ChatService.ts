import { Client, PostbackEvent } from '@line/bot-sdk';
import { inject, injectable } from 'inversify';

/**
 * Service class for chat
 */
@injectable()
export class ChatService {
  @inject(Client)
  private readonly client!: Client;

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

  public async replyTreasure(event: PostbackEvent) {
    const envr = process.env.ENVR;
    const liffId = process.env.LIFF_ID;
    await this.client.replyMessage(event.replyToken, [
      {
        type: 'template',
        altText: '婚禮尋寶',
        template: {
          type: 'carousel',
          columns: [
            {
              thumbnailImageUrl: `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img/pass.png`,
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
              thumbnailImageUrl: `https://venus-${envr}-y.s3.ap-southeast-1.amazonaws.com/img/welcome.jpg`,
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
