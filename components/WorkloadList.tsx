import type { Work } from "@/lib/types"
import WorkloadItem from "./WorkloadItem"

interface WorkloadListProps {
  workloads: Work[]
}

export const WorkloadList = ({ workloads }: WorkloadListProps) => {
  if (!workloads.length) return <div>No workloads</div>

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
}

export default WorkloadList
