import { Container } from 'inversify';
import 'reflect-metadata';
import { DbAccess } from './access/DbAccess';
import { TreasureAccess } from './access/TreasureAccess';
import { ChatService } from './logic/ChatService';
import { TreasureService } from './logic/TreasureService';
import { TreasureEntity } from './model/TreasureEntity';
import { Database, dbEntitiesBindingId } from './util/Database';

const container: Container = new Container();

container.bind<Database>(Database).toSelf().inSingletonScope();

// bind repeatedly for db entities
container.bind<Function>(dbEntitiesBindingId).toFunction(TreasureEntity);

// db access for tables
container.bind<DbAccess>(DbAccess).toSelf();
container.bind<TreasureAccess>(TreasureAccess).toSelf();

// service
container.bind<ChatService>(ChatService).toSelf();
container.bind<TreasureService>(TreasureService).toSelf();

export { container as bindings };
