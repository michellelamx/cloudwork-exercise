import CloudworkService from "@/lib/mock-service"
import type { CreateRequest, GetAllResponse, Work } from "@/lib/types"
import { makeAutoObservable } from "mobx"

export class AppController {
  private hasInit = false

  private cloudworkClient = new CloudworkService()

  private fetchedData: GetAllResponse | undefined = undefined

  constructor() {
    makeAutoObservable(this)
  }

  get workloads(): Work[] {
    return this.fetchedData?.workloads || []
  }

  init = () => {
    // react strict-mode in development calls useEffects twice
    if (this.hasInit) return
    this.hasInit = true

    // add some dummy data when app boots to get started
    this.fetchedData = {
      workloads: [
        {
          id: 0,
          status: "WORKING",
          completeDate: new Date(),
          complexity: 1,
        },
        {
          id: 1,
          status: "SUCCESS",
          completeDate: new Date(),
          complexity: 1,
        },
        {
          id: 2,
          status: "FAILURE",
          completeDate: new Date(),
          complexity: 1,
        },
      ],
    }
  }

  createWorkload = async (params: CreateRequest) => {
    console.log("create workload", params)

    // await this.cloudworkClient.create(params)
    // ...
  }
}

export default AppController
