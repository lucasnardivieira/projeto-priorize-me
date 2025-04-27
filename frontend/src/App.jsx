import { useState } from 'react'
import axios from 'axios'
import LeadUploader from './components/LeadUploader'
import LeadList from './components/LeadList'

function App() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleData = async (leads) => {
    if (!leads || leads.length === 0) {
      setError('Por favor, insira dados válidos')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await axios.post('http://localhost:5000/classify', leads, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000 // 10 segundos
      })
      setResults(response.data)
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                         err.message || 
                         'Erro ao processar os leads'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Priorize.me
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Classificador de Leads Inteligente
          </p>
        </div>

        {/* Uploader */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <LeadUploader onUpload={handleData} disabled={loading} />
        </div>

        {/* Feedback de Status */}
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-700">Processando seus leads...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Resultados */}
        {results.length > 0 && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <LeadList results={results} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App