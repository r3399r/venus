import { Client, MessageEvent } from '@line/bot-sdk';
import { inject, injectable } from 'inversify';

/**
 * Service class for chat
 */
@injectable()
export class ChatService {
  @inject(Client)
  private readonly client!: Client;

  public async normalReply(event: MessageEvent) {
    await this.client.replyMessage(event.replyToken, [
      {
        type: 'text',
        text: '測試！',
      },
    ]);
  }
}
