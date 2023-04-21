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

  init = async () => {
    // react strict-mode in development calls useEffects twice
    if (this.hasInit) return
    this.hasInit = true

    // add some dummy data when app boots to get started
    await this.refresh()
  }

  private refresh = async () => {
    this.fetchedData = await this.cloudworkClient.getAllWorkloads()
  }

  createWorkload = async (params: CreateRequest) => {
    console.log("TODO: create workload", params)
  }
}

export default AppController
