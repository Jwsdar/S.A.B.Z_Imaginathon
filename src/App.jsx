import { useEffect, useState } from 'react'

export default function App() {
  const [backendStatus, setBackendStatus] = useState("Connecting...")

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setBackendStatus(data.message))
      .catch(err => setBackendStatus("Backend offline"))
  }, [])

  return (
    <div className="min-h-screen bg-sabz-light flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-sabz-teal text-center">
        <h1 className="text-4xl font-bold text-sabz-dark mb-4">S.A.B.Z. Node</h1>
        <p className="text-xl text-sabz-primary font-semibold">{backendStatus}</p>
      </div>
    </div>
  )
}