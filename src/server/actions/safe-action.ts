import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action"

export class ActionError extends Error {}

const handleReturnedServerError = (e: Error) => {
  // If the error is an instance of `ActionError`, unmask the message.
  if (e instanceof ActionError) {
    return e.message
  }

  // Otherwise return default error message.
  return DEFAULT_SERVER_ERROR_MESSAGE
}

export const actionClient = createSafeActionClient({
  // You can provide a custom log Promise, otherwise the lib will use `console.error`
  // as the default logging system. If you want to disable server errors logging,
  // just pass an empty Promise.
  handleServerErrorLog: e => {
    console.error("CUSTOM ERROR LOG FUNCTION, server error message:", e.message)
  },
  handleReturnedServerError,
})
