export default function LeadList({ results }) {
  // Ordena os resultados pelo score (do maior para o menor)
  const sortedResults = [...results].sort((a, b) => b.score - a.score)

  return (
    <div className="mt-4 space-y-2">
      {sortedResults.map((item, index) => (
        <div
          key={index}
          className={`p-4 border rounded-lg shadow ${
            item.classificacao === 'Alta'
              ? 'bg-green-50 border-green-200'
              : item.classificacao === 'Média'
              ? 'bg-yellow-50 border-yellow-200'
              : 'bg-red-50 border-red-200'
          } flex justify-between items-center`}
        >
          <div>
            <p className="font-semibold">{item.lead.nome}</p>
            <p className="text-sm text-gray-600">
              {item.lead.cargo} - {item.lead.empresa_tamanho}
            </p>
          </div>
          <div className="text-right">
            <p 
              className={`font-bold text-lg ${
                item.classificacao === 'Alta'
                  ? 'text-green-700'
                  : item.classificacao === 'Média'
                  ? 'text-yellow-700'
                  : 'text-red-700'
              }`}
            >
              {item.score}%
            </p>
            <p
              className={`font-medium ${
                item.classificacao === 'Alta'
                  ? 'text-green-600'
                  : item.classificacao === 'Média'
                  ? 'text-yellow-600'
                  : 'text-red-600'
              }`}
            >
              {item.classificacao}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}