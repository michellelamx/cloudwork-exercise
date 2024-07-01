import { makeAutoObservable, runInAction } from 'mobx'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { Slider } from './primitives/slider'

interface WorkloadFormProps {
  onSubmit: (params: { complexity: number }) => Promise<unknown>
}

export const WorkloadForm = observer<WorkloadFormProps>((props) => {
  const formController = useLocalObservable(
    () => new WorkloadFormController(props.onSubmit)
  )

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        formController.submit()
      }}
    >
      <>
        <div className='form-complexity'>
          Complexity: {formController.complexity}
        </div>
        <div className='complexity-slider'>
          <Slider
            min={1}
            max={10}
            step={1}
            value={[formController.complexity]}
            onValueChange={(value) => {
              runInAction(() => {
                formController.complexity = value[0];
              });
            }}
          />
        </div>
      </>
      <button className='primary' type='submit' disabled={formController.loading}>
        {formController.loading ? 'Starting...' : 'Start work'}
      </button>
    </form>
  )
})

class WorkloadFormController {
  private createWorkload: WorkloadFormProps['onSubmit']
  loading = false
  complexity = 1

  constructor(createWorkload: WorkloadFormProps['onSubmit']) {
    this.createWorkload = createWorkload
    makeAutoObservable(this)
  }

  private reset = () => {
    this.complexity = 1
    this.loading = false
  }

  private startLoading = () => {
    this.loading = true
  }

  private endLoading = () => {
    this.loading = false
  }

  submit = async () => {
    this.startLoading()
    try {
      await this.createWorkload({ complexity: this.complexity })
      this.reset()
    } catch (error) {
      console.error('Failed to submit workload', error);
    }
    this.endLoading()
  }
}
