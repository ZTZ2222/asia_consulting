"use client"

// Inspired by react-hot-toast library
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

/**
 * Generates a unique identifier by incrementing a counter.
 * @returns {string} A string representation of the next unique identifier.
 */
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

/**
 * Adds a toast notification to the remove queue after a specified delay
 * @param {string} toastId - The unique identifier of the toast to be removed
 * @returns {void} This function doesn't return a value
 */
const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  /**
   * Sets a timeout to remove a toast notification after a specified delay
   * @param {number} toastId - The unique identifier of the toast to be removed
   * @returns {number} The timeout ID returned by setTimeout
   */
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  /**
   * Reducer function for managing toast notifications state
   * @param {State} state - The current state of the application
   * @param {Action} action - The action object describing the state change
   * @returns {State} The new state after applying the action
   */
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

/**
 * Maps over the toasts array and updates a specific toast if its ID matches the action's toast ID
 * @param {Object[]} state.toasts - The current array of toast objects in the state
 * @param {Object} action.toast - The toast object containing updates
 * @param {string} action.toast.id - The ID of the toast to be updated
 * @returns {Object[]} A new array of toast objects with the specified toast updated
 */
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        /**
         * Adds all toast IDs to the remove queue
         * @param {Array} state.toasts - An array of toast objects
         * @returns {void} This function does not return a value
         */
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        /**
         * Maps over an array of toasts and closes a specific toast or all toasts
         * @param {Array} state.toasts - The current array of toast objects
         * @param {string|undefined} toastId - The ID of the toast to close, or undefined to close all toasts
         * @returns {Array} A new array of toast objects with the specified toast(s) closed
         */
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        ```
        /**
         * Filters out a specific toast from the state's toast array
         * @param {Object} state - The current state object containing the toasts array
         /**
          * Dispatches an action to update the memory state and notifies all listeners.
          * @param {Action} action - The action object to be dispatched.
          * @returns {void} This function doesn't return a value.
          */
         * @param {Object} action - The action object containing the toastId to filter out
         * @returns {Array} A new array of toasts with the specified toast removed
         */
        ```
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  /**
   * Executes each listener function in the listeners array with the current memory state.
   * @param {Array<Function>} listeners - An array of listener functions to be called.
   * @param {Object} memoryState - The current state of memory to be passed to each listener.
   * @returns {void} This function does not return a value.
   */
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

/**
 * Creates and manages a toast notification
 * @param {Toast} props - The properties for the toast notification
 * @returns {Object} An object containing the toast id, dismiss function, and update function
 */
function toast({ ...props }: Toast) {
  const id = genId()

  /**
   * Updates a toast notification with new properties
   * @param {ToasterToast} props - The properties to update the toast with
   * @returns {void} This function doesn't return a value
   */
  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  /**
   * Dispatches an action to dismiss a toast notification
   * @param {void} - This function doesn't take any parameters
   * @returns {void} Dispatches a DISMISS_TOAST action with the toast ID
   */
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      /**
       * Handles the change in open state of a component.
       * @param {boolean} open - Indicates whether the component is open or closed.
       * @returns {void} This function doesn't return a value.
       */
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    /**
     * Custom React hook for managing toast notifications
     * @returns {Object} An object containing the current toast state and methods to control toasts
     * @returns {Object} state - The current state of toast notifications
     * @returns {Function} toast - Function to create a new toast notification
     * @returns {Function} dismiss - Function to dismiss a specific toast or all toasts
     */
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  ```
  /**
   * Sets up a listener for state changes and cleans up on unmount
   * @param {function} setState - The state setter function to be added to listeners
   * @param {any} state - The current state value
   * @returns {function} Cleanup function to remove the listener when the component unmounts
   */
  ```
  React.useEffect(() => {
    listeners.push(setState)
    /**
     * Returns a cleanup function that removes a specific setState listener from an array of listeners.
     * @param {Function} setState - The setState function to be removed from the listeners array.
     * @returns {Function} A cleanup function that removes the specified setState listener when called.
     */
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  /**
   * Dismisses a toast notification
   * @param {string} [toastId] - The unique identifier of the toast to dismiss. If not provided, it may dismiss the most recent or all toasts depending on implementation.
   * @returns {void} This function doesn't return a value
   */
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }
