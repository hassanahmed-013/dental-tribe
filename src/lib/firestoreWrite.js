const DEFAULT_TIMEOUT_MS = 8000

export class FirestoreWriteTimeoutError extends Error {
  constructor() {
    super('Save is taking longer than expected. Your changes were likely saved — please refresh if unsure.')
    this.name = 'FirestoreWriteTimeoutError'
  }
}

/** Firestore writes can hang waiting for the server; cap wait time so admin UI never sticks on Save. */
export async function commitFirestoreWrite(operation, timeoutMs = DEFAULT_TIMEOUT_MS) {
  let timeoutId

  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = window.setTimeout(() => reject(new FirestoreWriteTimeoutError()), timeoutMs)
  })

  try {
    return await Promise.race([operation(), timeoutPromise])
  } finally {
    window.clearTimeout(timeoutId)
  }
}
