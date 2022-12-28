import { inject, injectable } from 'inversify';
import { BadRequestError } from 'src/celestial-service/error';
import { Treasure } from 'src/model/Treasure';
import { TreasureEntity } from 'src/model/TreasureEntity';
import { Database } from 'src/util/Database';

/**
 * Access class for Treasure model.
 */
@injectable()
export class TreasureAccess {
  @inject(Database)
  private readonly database!: Database;

  public async save(input: Treasure) {
    const qr = await this.database.getQueryRunner();
    const entity = new TreasureEntity();
    Object.assign(entity, input);

    return await qr.manager.save(entity);
  }

  public async find() {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.find<Treasure>(TreasureEntity.name, {
      order: { status: 'desc' },
    });
  }

  public async findByUserId(userId: string) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.find<Treasure>(TreasureEntity.name, {
      where: { userId },
    });
  }

  public async update(input: Treasure) {
    const qr = await this.database.getQueryRunner();
    const entity = new TreasureEntity();
    Object.assign(entity, input);

    const res = await qr.manager.update(
      TreasureEntity,
      { id: input.id },
      entity
    );

    if (res.affected === 0) throw new BadRequestError('nothing happened.');
  }
}
