import type { Work } from '@/lib/types'
import { format } from 'date-fns'
import { cva } from 'class-variance-authority';
import { useState } from 'react'

export const statusClass = cva('workload-status', {
  variants: {
    status: {
      SUCCESS: 'status-success',
      FAILURE: 'status-failure',
      CANCELED: 'status-canceled',
    },
  },
});

interface WorkloadItemProps {
  work: Work
  onCancel: (work: Work) => Promise<unknown>
}

export const WorkloadItem = ({ work, onCancel }: WorkloadItemProps) => {
  const [isCanceling, setIsCanceling] = useState(false)

  const handleCancelClick = async () => {
    setIsCanceling(true)
    try {
      await onCancel(work)
    } catch (error) {
      console.error('Failed to cancel workload', error)
    } finally {
      setIsCanceling(false)
    }
  }

  return (
    <>
      <div className='workload-info'>
        <h3>Workload #{work.id}</h3>
        <div>Complexity {work.complexity}</div>
      </div>
      {work.status === 'WORKING' ? (
        <>
          <div className='complete-date'>
            <span>Complete date:</span> {format(work.completeDate, 'PPPPp')}
          </div>
          <div className='cancel-button'>
            <button
              className='secondary'
              onClick={handleCancelClick}
              disabled={isCanceling}
            >
              {isCanceling ? 'Canceling...' : 'Cancel'}
            </button>
          </div>
        </>
      ) : (
        <div className={statusClass({ status: work.status })}>
          {work.status.toLowerCase()}
        </div>
      )}
    </>
  )
}
