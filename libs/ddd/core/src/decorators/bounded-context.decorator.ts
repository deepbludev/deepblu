/**

@module({
  submodules: [TasksModule],
  events: {
    store: RedisBoardsEventStore,
    subscribers: [
      TaskAddedToBoard,
      TaskMarkedComplete,
      TaskDeleted
      BoardCreated,
      BoardArchived,
      DeleteUser
    ],
  }
  commands: [
    AddTaskToBoard,
    MarkTaskAsComplete,
    DeleteTask,
    CreateBoard,
    ArchiveBoard
  ],
  queries: [
    GetUrgentTasks,
    GetTasksByBoard,
    GetBoardById,
    GetUsersBoardsId
  ],
  sagas: [BoardArchivedSaga],
  services: [TaskStatsService],
  repositories: [TaskRepository, BoardRepository],
  projections: [TaskStatsProjection, BoardProjection],
  readModelStore: [TasksReadModelStore, BoardsReadModelStore],
})
export class TasksModule {
  constructor(
    private readonly eventBus: IEventBus,
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}
}


@boundedContext({
  name: 'AgilePM',
  modules: [BoardsModule, TeamModule]
})
export class AgilePM extends BoundedContext {
  constructor(
    private readonly eventBus: IEventBus,
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}
}

@boundedContext({
  name: 'IdentityAccess',
  modules: [UsersModule, RolesModule, PermissionsModule],
})
export class IdentityAccess extends BoundedContext {
  constructor(
    private readonly eventBus: IEventBus,
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}
}


//

const map = createContextMap({
  eventBus: KafkaEventBus,
  commandBus: InMemoryCommandBus,
  queryBus: RabbitMQQueryBus,
  boundedContexts: {
    core: [AgilePM, SalesCRM, Finances],
    supporting: [Calendar, Email, Chat],
    generic: [IdentityAccess, Payments, Analytics, Notifications],
  }
})

//

const tasksRouter = createRouter()
  .mutation('create', {
    input: CreateTaskSchema,
    resolve: async ({ input }) => {
      const result = await map.dispatch(
        new CreateTaskCommand(input)
      )
      return result
    },
  })

  .query('all', {
    resolve: async () => {
      const result = await map.dispatch(
        new GetAllTasksQuery()
      )
      return result
    },
  })

*/
