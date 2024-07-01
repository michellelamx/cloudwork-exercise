import { WorkloadForm } from './WorkloadForm'
import { WorkloadList } from './WorkloadList'
import { useToast } from '../hooks/useToast'
import { CloudWorkService } from '../lib/mock-service'
import { observer } from 'mobx-react-lite'
import { useQuery, useQueryClient } from '@tanstack/react-query'

const App = observer(() => {
  const cloudWorkService = new CloudWorkService()
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const { data: workloads, isLoading, isError } = useQuery({
    queryKey: ['workloads'],
    queryFn: () => cloudWorkService.getAllWorkloads().then(res => res.works)
  })

  const handleSubmit = async (params: { complexity: number }) => {
    try {
      await cloudWorkService.create(params)
      queryClient.invalidateQueries({ queryKey: ['workloads'] })
      toast({
        variant: 'success',
        title: 'Submission successful',
        description: 'The workload was successfully created.',
      })
    } catch (error) {
      toast({
        variant: 'danger',
        title: 'Submission failed',
        description: 'The workload failed to submit.',
      })
      console.error('Failed to submit workload', error)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading workloads</div>

  return (
    <div className='component-container'>
      <div className='component-header'>
        <div className='notch' />
      </div>
      <div className='workload-container'>
        <h1>CloudWork</h1>
        <hr />
        <div className='workload-content'>
          <div className='workload-list'>
            <h2 className='section-header'>Workloads</h2>
            <WorkloadList workloads={workloads || []} cloudWorkService={cloudWorkService} />
          </div>
          <div className='workload-create'>
            <h2>Create a workload</h2>
            <WorkloadForm
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  )
})

export default App
