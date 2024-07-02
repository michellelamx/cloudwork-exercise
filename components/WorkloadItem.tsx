import type { Work } from '@/lib/types'
import { format } from 'date-fns'
import { cva } from 'class-variance-authority';
import { useEffect, useState } from 'react'

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
  onCancel: (work: Work) => Promise<void>
}

const formatTimeLeft = (milliseconds: number) => {
  const totalSeconds = Math.floor(milliseconds / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}m ${seconds}s remaining...`
}

export const WorkloadItem = ({ work, onCancel }: WorkloadItemProps) => {
  const [isCanceling, setIsCanceling] = useState(false)
  const [timeLeft, setTimeLeft] = useState<number | null>(null)

  useEffect(() => {
    if (work.status === 'WORKING') {
      const updateTimer = () => {
        const now = new Date().getTime()
        const completeDate = new Date(work.completeDate).getTime()
        const remainingTime = completeDate - now
        if (remainingTime > 0) {
          setTimeLeft(remainingTime)
        } else {
          setTimeLeft(0)
        }
      }

      const timerInterval = setInterval(updateTimer, 1000)
      updateTimer() // Initial call to set the timer immediately

      return () => clearInterval(timerInterval)
    }
  }, [work.status, work.completeDate])

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
          <div className='time-remaining'>
            {timeLeft !== null ? formatTimeLeft(timeLeft) : 'Calculating...'}
            {/* <span>Complete date:</span> {format(work.completeDate, 'PPPPp')} */}
          </div>
          <div className='cancel-button'>
            <button
              className={isCanceling ? 'disabled' : 'secondary'}
              onClick={handleCancelClick}
              disabled={isCanceling}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className='time-remaining' />
          <div className={statusClass({ status: work.status })}>
            {work.status.toLowerCase()}
          </div>
        </>
      )}
    </>
  )
}
