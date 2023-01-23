import type { Work } from "@/lib/types"
import { observer } from "mobx-react-lite"
import WorkloadItem from "./WorkloadItem"

interface WorkloadListProps {
  workloads: Work[]
}

export const WorkloadList = observer<WorkloadListProps>(({ workloads }) => {
  return (
    <ul>
      {workloads.map((work) => (
        <li key={work.id}>
          <WorkloadItem
            work={work}
            onCancel={async (work) => {
              console.log("Cancel workload", { work })
            }}
          />
        </li>
      ))}
    </ul>
  )
})

export default WorkloadList
