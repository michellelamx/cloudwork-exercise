import moment from "moment"
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

interface InternalWork extends Work {
  timer: NodeJS.Timeout
}

export class CloudworkService {
  private workloads: Record<WorkId, InternalWork> = {}
  private failCounter = 0

  private sleep = (durationMs = 500) =>
    new Promise((resolve) => setTimeout(resolve, durationMs))

  create = async ({ complexity }: CreateRequest): Promise<CreateResponse> => {
    // sleep to act like a network
    await this.sleep()

    // randomly fail 25% of the time
    if (this.failCounter++ % 4 === 0) throw new Error("Random error!")

    // calculate work duration from complexity
    const seconds = complexity * 1000
    const completeDate = moment().add(complexity, "second").toDate()

    // do the work
    const timer = setTimeout(() => {
      work.status = work.id % 2 ? "FAILURE" : "SUCCESS"
    }, seconds)

    // build work object
    const id: WorkId = Object.keys(this.workloads).length + 1
    const status: WorkStatus = "WORKING"
    const work: Work = {
      id,
      complexity,
      status,
      completeDate,
    }

    // build internal state
    const internalWork: InternalWork = {
      ...work,
      timer,
    }
    this.workloads[id] = internalWork

    return { work }
  }

  getWorkload = async ({ id }: CancelRequest): Promise<CancelResponse> => {
    await this.sleep()

    const work = this.workloads[id]
    if (!work) throw new Error("Workload not found")

    if (work.status !== "WORKING")
      throw new Error("Workload cannot be canceled")

    clearTimeout(work.timer)
    work.status = "CANCELED"

    return { work }
  }

  getAllWorkloads = async (): Promise<GetAllResponse> => {
    return { workloads: Object.values(this.workloads) }
  }

  cancelWorkload = async ({ id }: CancelRequest): Promise<CancelResponse> => {
    await this.sleep()
    const work = this.workloads[id]

    if (!work) throw new Error("Workload not found")

    return {
      work,
    }
  }
}

export default CloudworkService
