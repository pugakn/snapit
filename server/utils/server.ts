import util from 'https://esm.sh/util'
import axios from 'https://esm.sh/axios'
import chalk from 'https://esm.sh/chalk'
import { GraphQLError } from 'graphql'
import beautify from 'https://esm.sh/json-beautify'

const getMessage = (messages: any[]) => {
  // @ts-ignore
  return beautify(messages, null, 2, 80)
}

export default class extends Error {
  logs: any
  constructor(category: string, ...args: any) {
    super()
    this.name = category
    this.message = getMessage([category, ...args])
    this.logs = args
    console.error(
      chalk.red(`🚨 uncaught:${category}`),
      ...getLogsAsInspects(args)
    )
  }
}

/**
 * An Err is a known error that won't be flagged as a bug.
 * If you throw this on the server, make sure to catch it.
 */
export class Err {
  name: string
  message: string
  logs: any
  constructor(category: string, ...args: any) {
    this.name = category
    this.message = getMessage(['Err', category, ...args])
    this.logs = args
    console.info(chalk.yellow(`🍋 ${category}`), ...getLogsAsInspects(args))
  }
}

export class Info {
  name: string
  message: string
  constructor(category: string, ...args: any) {
    this.name = category
    this.message = category
    console.info(chalk.green(`🧤 ${category}`), ...getLogsAsInspects(args))
  }
}

export class YogaErr extends GraphQLError {
  constructor(category: string, ...args: any) {
    super(category)
    console.info(chalk.yellow(`🍋 ${this.stack}`), ...getLogsAsInspects(args))
  }
}

export class AxiosErr {
  constructor(category: string, error: unknown, ...args: any) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error(
          chalk.red(`🚨 AxiosErr ${category}`),
          error.response.data,
          ...getLogsAsInspects(args)
        )
      } else if (error.request) {
        console.error(
          chalk.red(`🚨 AxiosErr ${category}`),
          error.request,
          ...getLogsAsInspects(args)
        )
      } else {
        console.error(
          chalk.red(`🚨 AxiosErr ${category}`),
          error.message,
          ...getLogsAsInspects(args)
        )
      }
    } else {
      console.error(
        chalk.red(`🚨 ${category}`),
        error,
        ...getLogsAsInspects(args)
      )
    }
  }
}

/**
 * Wraps logged objects in util.inspect so they are readable in the console
 * with colors and infinite depth.
 */
const getLogsAsInspects = (logs: any[]) => {
  return logs.map((log) =>
    util.inspect(log, { showHidden: false, depth: null, colors: true })
  )
}

/**
 * Console.log alternative with infinite depth for objects.
 * Use sparingly as it's slower than console.log.
 */
export const log = (...args: any) => {
  console.log(...getLogsAsInspects(args))
}



