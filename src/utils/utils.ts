import { UnwrapArray } from '../types'

export const toString = (x: any) => Object.prototype.toString.call(x)

export function isPlainObject(x: unknown): x is Record<any, any> {
  return !!x && toString(x) === '[object Object]'
}

export function hasOwn(obj: Object, key: string): boolean {
  return Object.hasOwnProperty.call(obj, key)
}

export function isEmptyObject(obj: Record<any, any>): boolean {
  // noinspection LoopStatementThatDoesntLoopJS
  for (let _ in obj) {
    return false
  }
  return true
}

export const getUid = (() => {
  let id = 0
  return () => id++
})()

export const noopFn = () => {}

export function dependOn(..._: any[]): void
export function dependOn() {}

let isBreak = false
const breakLoop = () => {
  isBreak = true
}

export function each<T>(
  val: T,
  callback: (
    item: UnwrapArray<NonNullable<T>>,
    idx: number,
    breakLoop: () => void
  ) => void
) {
  isBreak = false
  if (Array.isArray(val)) {
    for (let i = 0, length = val.length; i < length; i += 1) {
      const item = val[i]
      callback(item, i, breakLoop)
      if (isBreak) {
        break
      }
    }
  } else if (val != null) {
    callback(val as any, 0, breakLoop)
  }
}

export function normalizeToArray<T>(value: T): UnwrapArray<NonNullable<T>>[] {
  return (Array.isArray(value) ? value : value == null ? [] : [value]) as any
}

type FN = (this: any, ...args: any[]) => void

export function microtaskDebounce<F extends FN>(func: F): F {
  let promise: Promise<void> | undefined
  let lock = false
  let newestArgs: any[] | undefined
  let newestCtx: any

  return function newFn(this: any, ...args: any[]) {
    newestCtx = this
    newestArgs = args

    if (!lock) {
      if (!promise) {
        promise = Promise.resolve()
      }
      lock = true
      promise.then(() => {
        const ctx = newestCtx
        const args = newestArgs

        lock = false
        newestCtx = undefined
        newestArgs = undefined

        func.apply(ctx, args!)
      })
    }
  } as F
}

export function debounce<F extends FN>(func: F, ms = 0): F {
  let timeoutId: any
  let newestCtx: any
  let newestArgs: any[] | undefined

  return function newFn(this: any, ...args: any[]) {
    newestCtx = this
    newestArgs = args

    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      const ctx = newestCtx
      const args = newestArgs

      newestCtx = undefined
      newestArgs = undefined

      func.apply(ctx, args!)
    }, ms)
  } as F
}

export function throttle<F extends FN>(func: F, ms = 0): F {
  let flag = false
  let newestCtx: any
  let newestArgs: any[] | undefined

  const callFn = () => {
    const ctx = newestCtx
    const args = newestArgs

    newestCtx = undefined
    newestArgs = undefined

    func.apply(ctx, args!)
  }

  const resetFlag = () => {
    if (newestArgs) {
      setTimeout(resetFlag, ms)
      callFn()
    } else {
      flag = false
    }
  }

  return function newFn(this: any, ...args: any[]) {
    newestCtx = this
    newestArgs = args

    if (!flag) {
      flag = true
      setTimeout(resetFlag, ms)
      callFn()
    }
  } as F
}
