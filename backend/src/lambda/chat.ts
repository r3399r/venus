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

    if (event.events[0].type === 'postback')
      switch (event.events[0].postback.data) {
        case 'location':
          await service.replyMap(event.events[0]);
          break;
        case 'treasure':
          await service.replyTreasure(event.events[0]);
          break;
        case 'finish#2':
          await service.replyFinish2(event.events[0]);
          break;
      }
  } catch (e) {
    console.error(e);
  } finally {
    await service?.cleanup();
  }
}
