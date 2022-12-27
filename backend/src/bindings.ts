import { Container } from 'inversify';
import 'reflect-metadata';
import { ChatService } from './logic/ChatService';

const container: Container = new Container();

// container.bind<Database>(Database).toSelf().inSingletonScope();

// bind repeatedly for db entities
// container.bind<Function>(dbEntitiesBindingId).toFunction(BillEntity);
// container.bind<Function>(dbEntitiesBindingId).toFunction(BillShareEntity);
// container.bind<Function>(dbEntitiesBindingId).toFunction(BookEntity);
// container.bind<Function>(dbEntitiesBindingId).toFunction(MemberEntity);
// container.bind<Function>(dbEntitiesBindingId).toFunction(TransferEntity);
// container.bind<Function>(dbEntitiesBindingId).toFunction(ViewBillShareEntity);
// container.bind<Function>(dbEntitiesBindingId).toFunction(ViewBookEntity);
// container.bind<Function>(dbEntitiesBindingId).toFunction(ViewTransactionEntity);

// db access for tables
// container.bind<DbAccess>(DbAccess).toSelf();
// container.bind<BillAccess>(BillAccess).toSelf();
// container.bind<BillShareAccess>(BillShareAccess).toSelf();
// container.bind<BookAccess>(BookAccess).toSelf();
// container.bind<MemberAccess>(MemberAccess).toSelf();
// container.bind<TransferAccess>(TransferAccess).toSelf();
// container.bind<ViewBillShareAccess>(ViewBillShareAccess).toSelf();
// container.bind<ViewBookAccess>(ViewBookAccess).toSelf();
// container.bind<ViewTransactionAccess>(ViewTransactionAccess).toSelf();

// service
container.bind<ChatService>(ChatService).toSelf();

export { container as bindings };
