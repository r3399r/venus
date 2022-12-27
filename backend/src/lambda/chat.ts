import { WebhookRequestBody } from '@line/bot-sdk';
import { bindings } from 'src/bindings';
import { InternalServerError } from 'src/celestial-service/error';
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
    console.log(event);
    service = bindings.get(ChatService);

    // let res: unknown;

    switch (event.events[0].type) {
      case 'message':
        await service.normalReply(event.events[0]);
        break;
      default:
        throw new InternalServerError('unknown resource');
    }

    // return successOutput(res);
  } catch (e) {
    console.error(e);
    // return errorOutput(e);
  } finally {
    // await service?.cleanup();
  }
}
