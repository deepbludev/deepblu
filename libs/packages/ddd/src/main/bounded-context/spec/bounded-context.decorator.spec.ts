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
    stores: [RedisBoardsEventStore],
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
export class BoardsModule extends BoundedContextModule {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
    private readonly tasks: TasksModule,
  ) {

    addTaskToBoard (payload: AddTaskToBoardDTO) {
      return this.commandBus.dispatch(AddTaskToBoard.with(payload))
    }

    archiveBoard (payload: ArchiveBoardDTO) {
      return this.commandBus.dispatch(ArchiveBoard.with(payload))
    }

    getUrgentTasks (payload: GetUrgentTasksDTO) {
      return this.queryBus.dispatch(GetUrgentTasks.with(payload))
    }

  }
}


@boundedContext({
  name: 'AgilePM',
  modules: [
    { token: IBoardsModule.name, useClass: BoardsModule },
    { token: ITeamModule.name, useClass: TeamModule },
  ]
})
export class AgileBoundedContext extends BoundedContext {
  constructor(
    public readonly boards: IBoardsModule,
    public readonly teams: ITeamModule,
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
      { token: IAgileACL.name, useClass: AgileBoundedContext },
      { token: ISalesACL.name, useClass: SalesBoundedContext },
      { token: IFinancesACL.name, useClass: FinancesBoundedContext },
      { token: IProjectsACL.name, useClass: ProjectsClient},
    ],
    supporting: [
      { token: ICalendarACL.name, useClass: CalendarBoundedContext },
      { token: IEmailACL.name, useClass: EmailBoundedContext },
      { token: IChatACL.name, useClass: ChatBoundedContext },
    ],
    generic: [
     { token: IIdentityAccessACL.name, useClass: IdentityAccessClient },
     { token: IAnalyticsACL.name, useClass: AnalyticsBoundedContext },
     { token: IReportingACL.name, useClass: NotificationsClient },
    ],
  }
})
class Deepblu extends ContextMap {
  constructor(
    public readonly agile: IAgileACL,
    public readonly salescrm: ISalesACL,
    public readonly finances: IFinancesACL,
    public readonly projects: IProjectsACL,
    public readonly calendar: ICalendarACL,
    public readonly email: IEmailACL,
    public readonly chat: IChatACL,
    public readonly identity: IIdentityAccessACL,
    public readonly analytics: IAnalyticsACL,
    public readonly reporting: IReportingACL,
  ) {}
}

export const deepblu = Deepblu.create();

// --------------------------------------------------

const tasksRouter = createRouter()
  .mutation('create', {
    input: AddTaskToBoardSchema,
    resolve: async ({ input }) => deepblu.agile.boards.addTaskToBoard(input);
    ,
  })

  .query('urgentTasks', {
    input: GetUrgentTasksrRequestSchema,
    output: GetUrgentTasksResponseSchema,
    resolve: async ({input}) =>  await deepblu.agile.boards.tasks.getUrgentTasks(input);
  })




// --------------------------------------------------


    $ tree
  .
  ├── package.json
  ├── README.md
  └── src
       ├── configs
       │    └── env
       │
       ├── shared
       │    └── infra
       │         └── server
       │
       └── modules
            │
            └── [module-name]
                  │
                  │── domain
                  │     ├── value-objects
                  │     ├── entities
                  │     ├── aggregates
                  │     ├── events
                  │     ├── subscriptions
                  │     ├── adapter
                  │     ├── repository-interface
                  │     └── domain-services
                  │
                  ├── application
                  │     └── use-cases
                  │
                  └── infra
                        ├── models
                        └── repository

*/
