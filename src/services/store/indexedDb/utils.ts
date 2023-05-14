// TODO: This error was put together without too much thought.
// Analyze necessary changes to improve dev experience.
class DatabaseError extends Error {
  readonly event: Event

  constructor(event: Event) {
    super('Database Error')
    this.event = event
  }
}

const makeDatabaseCall = (db: IDBDatabase | null) => (callback: (...args: any) => Promise<unknown>) => {
  if (!db) return

  callback()
}

export { DatabaseError, makeDatabaseCall }
