import { Client } from '@line/bot-sdk';
import { inject, injectable } from 'inversify';
import { DbAccess } from 'src/access/DbAccess';
import { TreasureAccess } from 'src/access/TreasureAccess';
import { BadRequestError } from 'src/celestial-service/error';
import { GetTreasureResponse, PutTreasureRequest } from 'src/model/Api';
import { TreasureEntity } from 'src/model/TreasureEntity';

/**
 * Service class for treasure
 */
@injectable()
export class TreasureService {
  @inject(DbAccess)
  private readonly dbAccess!: DbAccess;

  @inject(TreasureAccess)
  private readonly treasureAccess!: TreasureAccess;

  @inject(Client)
  private readonly client!: Client;

  public async cleanup() {
    await this.dbAccess.cleanup();
  }

  public async getTreasureList(): Promise<GetTreasureResponse> {
    return await this.treasureAccess.find();
  }

  public async reviseTreasureStatus(data: PutTreasureRequest) {
    const res = await this.treasureAccess.findByUserIdAndStage(
      data.userId,
      data.stage
    );
    if (res !== null && res.status === 'pass') return;

    if (data.stage === 1)
      if (
        data.answer &&
        ['西檸雞球拼腐皮捲', '西檸雞球拚腐皮捲'].includes(data.answer)
      ) {
        const userProfile = await this.client.getProfile(data.userId);

        const treasure = new TreasureEntity();
        treasure.userId = data.userId;
        treasure.displayName = userProfile.displayName;
        treasure.stage = data.stage;
        treasure.status = 'pass';

        await this.treasureAccess.save(treasure);
      } else throw new BadRequestError('wrong!');
    else if (data.stage === 2)
      if (data.answer === '庭岳怡甄干蝦檸') {
        const userProfile = await this.client.getProfile(data.userId);

        const treasure = new TreasureEntity();
        treasure.userId = data.userId;
        treasure.displayName = userProfile.displayName;
        treasure.stage = data.stage;
        treasure.status = 'pass';

        await this.treasureAccess.save(treasure);
      } else throw new BadRequestError('wrong!');
    else if (data.stage === 3)
      if (data.answer && ['兔子', '黑輪'].includes(data.answer)) {
        const userProfile = await this.client.getProfile(data.userId);

        const treasure = new TreasureEntity();
        treasure.userId = data.userId;
        treasure.displayName = userProfile.displayName;
        treasure.stage = data.stage;
        treasure.status = 'pass';

        await this.treasureAccess.save(treasure);
      } else throw new BadRequestError('wrong!');
    else if (data.stage === 4)
      if (data.answer && ['5', '五', '５'].includes(data.answer)) {
        const userProfile = await this.client.getProfile(data.userId);

        const treasure = new TreasureEntity();
        treasure.userId = data.userId;
        treasure.displayName = userProfile.displayName;
        treasure.stage = data.stage;
        treasure.status = 'pass';

        await this.treasureAccess.save(treasure);
      } else throw new BadRequestError('wrong!');
    else if (data.stage === 5)
      if (
        data.answer &&
        ['庭岳&怡甄', '庭岳 & 怡甄', '庭岳＆怡甄'].includes(data.answer)
      ) {
        const userProfile = await this.client.getProfile(data.userId);

        const treasure = new TreasureEntity();
        treasure.userId = data.userId;
        treasure.displayName = userProfile.displayName;
        treasure.stage = data.stage;
        treasure.status = 'pass';

        await this.treasureAccess.save(treasure);
      } else throw new BadRequestError('wrong!');
    else if (data.stage === 6) {
      if (res === null) return;
      await this.treasureAccess.update({ ...res, status: 'pass' });

      return await this.treasureAccess.find();
    }

    return;
  }
}
