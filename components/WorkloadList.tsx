import type { Work, CancelRequest } from '@/lib/types'
import { WorkloadItem } from './WorkloadItem'
import { CloudWorkService } from '../lib/mock-service'

interface WorkloadListProps {
  workloads: Work[]
  cloudWorkService: CloudWorkService
}

export const WorkloadList = ({ workloads, cloudWorkService }: WorkloadListProps) => {
  if (!workloads.length) return <div>No workloads</div>

  const handleCancel = async (work: Work) => {
    const cancelRequest: CancelRequest = { id: work.id }
    try {
      await cloudWorkService.cancelWorkload(cancelRequest)
    } catch (error) {
      console.error('Failed to cancel workload', error)
    }
  }

  return (
    <div className='workload-items'>
      {workloads.map((work) => (
        <div key={work.id} className='workload-item'>
          <WorkloadItem
            work={work}
            onCancel={() => handleCancel(work)}
          />
        </div>
      ))}
    </div>
  )
}
