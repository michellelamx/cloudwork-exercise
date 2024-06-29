import { observer } from "mobx-react-lite"
import WorkloadForm from "./WorkloadForm"
import WorkloadList from "./WorkloadList"

export const App = observer(() => {
  return (
    <div>
      <h1>CloudWork</h1>
      <hr />
      <div>
        <h2>Create workload</h2>
        <WorkloadForm
          onSubmit={(payload) => {
            console.log({ payload })
            window.alert("all your workloads are belong to us")
            return Promise.reject()
          }}
        />
      </div>
      <hr />
      <div>
        <h2>Workloads</h2>
        <WorkloadList workloads={[]} />
      </div>
    </div>
  )
})

export default App
