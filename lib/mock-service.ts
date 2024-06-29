import { addSeconds } from "date-fns"
import type {
  CancelRequest,
  CancelResponse,
  CreateRequest,
  CreateResponse,
  GetAllRequest,
  GetAllResponse,
  Work,
  WorkId,
  WorkStatus,
} from "./types"

/**
 * This is a pretend backend service.
 * It offers client-side APIs for a front-end app to use
 * but instead of actually talking to a backend, it has an internal implementation.
 */
export class CloudWorkService {
  // the "database" which is just an in-memory object.
  private database: Record<WorkId, DatabaseWorkEntity> = initialData
  private failCounter = 0

  create = async ({ complexity }: CreateRequest): Promise<CreateResponse> => {
    // sleep to act like a network
    await this.sleep()

    // fail 25% of the time
    if (this.failCounter++ % 4 === 0) throw new Error("Random error!")

    // calculate work duration from complexity
    const seconds = complexity * 1000
    const completeDate = addSeconds(new Date(), complexity)

    // build work object
    const id: WorkId = Object.keys(this.database).length + 1
    const status: WorkStatus = "WORKING"
    const work: Work = {
      id,
      complexity,
      status,
      completeDate,
    }

    // "do" the work
    const timer = setTimeout(() => {
      console.log("cloud go brrrrrr")
      databaseEntity.work.status = work.id % 2 ? "FAILURE" : "SUCCESS"
    }, seconds)

    // build internal state
    const databaseEntity: DatabaseWorkEntity = {
      work,
      timer,
    }

    // update the "database"
    this.database[id] = databaseEntity

    return { work }
  }

  getWorkload = async ({ id }: CancelRequest): Promise<CancelResponse> => {
    await this.sleep()
    const databaseEntity = this.database[id]

    if (!databaseEntity) throw new Error("Workload not found")

    return {
      work: databaseEntity.work,
    }
  }

  getAllWorkloads = async (params?: GetAllRequest): Promise<GetAllResponse> => {
    return {
      works: Object.values(this.database).map((workload) => workload.work),
    }
  }

  cancelWorkload = async ({ id }: CancelRequest): Promise<CancelResponse> => {
    await this.sleep()

    const databaseEntity = this.database[id]
    if (!databaseEntity) throw new Error("Workload not found")

    if (databaseEntity.work.status !== "WORKING")
      throw new Error("Workload cannot be canceled")

    clearTimeout(databaseEntity.timer)
    databaseEntity.work.status = "CANCELED"

    return { work: databaseEntity.work }
  }

  private sleep = (durationMs = 500) =>
    new Promise((resolve) => setTimeout(resolve, durationMs))
}

export default CloudWorkService

interface DatabaseWorkEntity {
  work: Work
  timer: NodeJS.Timeout | undefined
}

const initialData: Record<WorkId, DatabaseWorkEntity> = {
  0: {
    timer: undefined,
    work: {
      id: 0,
      status: "FAILURE",
      complexity: 1,
      completeDate: new Date(),
    },
  },
  1: {
    timer: undefined,
    work: {
      id: 1,
      status: "SUCCESS",
      complexity: 5,
      completeDate: new Date(),
    },
  },
  2: {
    timer: undefined,
    work: {
      id: 2,
      status: "CANCELED",
      complexity: 3,
      completeDate: new Date(),
    },
  },
  3: {
    timer: undefined,
    work: {
      id: 3,
      status: "WORKING",
      complexity: 7,
      completeDate: addSeconds(new Date(), 7),
    },
  },
}
