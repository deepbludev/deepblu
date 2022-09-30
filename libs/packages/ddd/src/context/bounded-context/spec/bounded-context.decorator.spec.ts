describe('BoundedContext', () => {
  it.todo('should be defined')
  it.todo('should inject modules')
})

/**

- bounded-contexts
  - shared
    - infrastructure
      - persistence
        + event-store
          - redis
          - cassandra
        + read-model-store
          - cassandra
          - mongodb
          - elasticsearch
      - messaging
        + event-bus
          - kafka
          - rabbitmq
        + command-bus
          - in-memory
        + query-bus
          - in-memory
  - agilepm
    + main
      -- agilepm.bounded.ts
    - domain
      + shared
        agilepm.domain.shared.module.ts
      - boards
        + messages
          - events
          - commands
          - queries
          agilepm.domain.boards.messages.ts
        + module
          - model
          - projections
          - repositories
          - services
          agilepm.domain.boards.module.ts
        - submodules
          - tasks
            + messages
              - events
              - commands
              - queries
              agilepm.domain.boards.tasks.messages.ts
            + module
              - model
              - projections
              - repositories
              - services
              agilepm.domain.boards.tasks.module.ts
      - teams
        + messages
          - events
          - commands
          - queries
          agilepm.domain.teams.messages.ts
       + module
          - model
          - projections
          - repositories
          - services
          agilepm.domain.teams.module.ts
        - submodules
          - members
            + messages
              - events
              - commands
              - queries
              agilepm.domain.teams.members.messages.ts
            + module
              - model
              - projections
              - repositories
              - services
              agilepm.domain.teams.members.module.ts
    - application
      - common
        + services
          agilepm.app.common.services.ts
        + subscriptions
          - events
          - queries
          - commands
          agilepm.app.common.messages.ts
    - infrastructure
      - http
        - trpc
          + commands
            agilepm.trpc.commands.ts
              - modules
                boards.commands.trpc.ts
                boards.tasks.commands.trpc.ts
                teams.commands.trpc.ts
                teams.members.commands.trpc.ts
          + queries
              agilepm.trpc.queries.ts
              - modules
                boards.queries.trpc.ts
                boards.tasks.queries.trpc.ts
                teams.queries.trpc.ts
                teams.members.queries.trpc.ts
      - persistence
        - boards
          + event-store
            - redis
          + read-model-store
            - cassandra
            - mongodb
            - elasticsearch
          + repositories
            - cassandra
            - mongodb

    - ui
  - salescrm
    - main
    - domain
    - application
    - infrastructure
    - ui


@module({
  name: 'boards',
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
export class BoardsModule {
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
  messagging: {
    eventBus: KafkaEventBus,
    commandBus: InMemoryCommandBus,
    queryBus: RabbitMQQueryBus
  },
  boundedContexts: {
    core: [
      AgilePM,
      SalesCRM,
      Finances
    ],
    supporting: [
      Calendar,
      Email,
      Chat
    ],
    generic: [
      IdentityAccess,
      Payments,
      Analytics,
      Notifications
    ],
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
      deepblu.dispatch(CreateTask.with(input))
    },
  })

  .query('all', {
    resolve: async ({input}) => {
      return await deepblu.fetch(AllTasks.with(input))
    },
  })

*/
