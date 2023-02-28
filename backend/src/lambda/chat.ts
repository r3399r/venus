import { WebhookRequestBody } from '@line/bot-sdk';
import { bindings } from 'src/bindings';
import { LambdaContext } from 'src/celestial-service/model/Lambda';
import { ChatService } from 'src/logic/ChatService';
import { BindingsHelper } from 'src/util/BindingsHelper';

export async function chat(
  event: WebhookRequestBody,
  _context?: LambdaContext
) {
  let service: ChatService | null = null;
  try {
    BindingsHelper.bindClientConfig({
      channelAccessToken: String(process.env.CHANNEL_TOKEN),
      channelSecret: String(process.env.CHANNEL_SECRET),
    });

    service = bindings.get(ChatService);

    if (event.events[0].type === 'message')
      if (
        event.events[0].message.type === 'text' &&
        event.events[0].message.text === '婚禮尋寶'
      )
        await service.replyTreasure(event.events[0]);

    if (event.events[0].type === 'postback')
      switch (event.events[0].postback.data) {
        case 'location':
          await service.replyMap(event.events[0]);
          break;
        case 'record':
          await service.replyRecord(event.events[0]);
          break;
        case 'print':
          await service.replyPrint(event.events[0]);
          break;
        case 'finish#2':
          await service.replyFinish2(event.events[0]);
          break;
        case 'done1':
          await service.replyDone(event.events[0], 1);
          break;
        case 'done2':
          await service.replyDone(event.events[0], 2);
          break;
        case 'done3':
          await service.replyDone(event.events[0], 3);
          break;
        case 'done4':
          await service.replyDone(event.events[0], 4);
          break;
      }
  } catch (e) {
    console.error(e);
  } finally {
    await service?.cleanup();
  }
}
