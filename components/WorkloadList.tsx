import type { CancelRequest, Work } from '@/lib/types'
import { WorkloadItem } from './WorkloadItem'
import { CloudWorkService } from '@/lib/mock-service'
import { useToast } from '@/hooks/useToast'

interface WorkloadListProps {
  workloads: Work[]
  cloudWorkService: CloudWorkService
}

export const WorkloadList = ({ workloads, cloudWorkService }: WorkloadListProps) => {
  const { toast } = useToast()

  const handleCancel = async (work: Work) => {
    const cancelRequest: CancelRequest = { id: work.id }
    try {
      await cloudWorkService.cancelWorkload(cancelRequest)
    } catch (error) {
      console.error('Failed to cancel workload', error)
      toast({
        variant: 'danger',
        title: 'Cancelation failed',
        description: 'The workload failed to cancel.',
      })
    }
  }

  return (
    <div className='workload-items'>
      {!workloads.length ? (
        <div className='no-workloads'>No workloads found</div>
      ) : (
      workloads.map((work) => (
        <div key={work.id} className='workload-item'>
          <WorkloadItem
            work={work}
            onCancel={() => handleCancel(work)}
          />
        </div>
      )))}
    </div>
  )
}
