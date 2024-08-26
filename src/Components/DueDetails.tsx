import { useParams } from "react-router-dom"


export default function DueDetails() {
    // Collect the params from current url
    const {dueId}  = useParams();

  return (
    <div>DueDetails</div>
  )
}
