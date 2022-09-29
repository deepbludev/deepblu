/**

- bounded-contexts
  - agile-pm
    - main
      -- agile-pm.bounded-context.ts
    - domain
    - application
    - infrastructure
    - ui
  - sales-crm
    - main
    - domain
    - application
    - infrastructure
    - ui

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


// --------------------------------------------------

@contextMap({
  eventBus: KafkaEventBus,
  commandBus: InMemoryCommandBus,
  queryBus: RabbitMQQueryBus,
  boundedContexts: {
    core: [AgilePM, SalesCRM, Finances],
    supporting: [Calendar, Email, Chat],
    generic: [IdentityAccess, Payments, Analytics, Notifications],
  }
})
class Deepblu extends ContextMap {
  constructor(
    private readonly eventBus: IEventBus,
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}
}

export const deepblu = Deepblu.create();

// --------------------------------------------------

const tasksRouter = createRouter()
  .mutation('create', {
    input: CreateTaskSchema,
    resolve: async ({ input }) => {
      const result = await deepblu.dispatch(
        new CreateTaskCommand(input)
      )
      return result
    },
  })

  .query('all', {
    resolve: async () => {
      const result = await deepblu.dispatch(
        new GetAllTasksQuery()
      )
      return result
    },
  })

*/
