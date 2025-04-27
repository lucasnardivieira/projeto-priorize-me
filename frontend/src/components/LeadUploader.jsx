import Papa from 'papaparse';
import { useState, useRef } from 'react';
import { FiUpload, FiX, FiCheckCircle } from 'react-icons/fi';

export default function LeadUploader({ onUpload, disabled }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleUpload = () => {
    if (!file) {
      setError('Por favor, selecione um arquivo CSV');
      return;
    }

    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      setError('Formato inválido. Por favor, envie um arquivo CSV.');
      return;
    }

    setLoading(true);
    setIsSuccess(false);
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: header => header.trim(),
      complete: (results) => {
        setLoading(false);
        
        if (results.errors.length > 0) {
          const firstError = results.errors[0];
          setError(`Erro na linha ${firstError.row}: ${firstError.message}`);
          return;
        }

        if (results.data.length === 0) {
          setError('O arquivo está vazio ou não contém dados válidos');
          return;
        }

        setError(null);
        setIsSuccess(true);
        onUpload(results.data);
      },
      error: (error) => {
        setLoading(false);
        setError(`Erro ao processar arquivo: ${error.message}`);
      }
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setError(null);
    setIsSuccess(false);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setError(null);
    setIsSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="csv-upload"
          className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer 
            ${error ? 'border-red-300 bg-red-50' : 
              isSuccess ? 'border-green-300 bg-green-50' : 
              disabled ? 'border-gray-200 bg-gray-100' : 
              'border-gray-300 hover:border-blue-400 bg-white'}`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
            <FiUpload className={`w-8 h-8 mb-2 ${isSuccess ? 'text-green-500' : 'text-gray-500'}`} />
            {file ? (
              <div className="flex items-center">
                <p className="font-medium text-sm">{file.name}</p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile();
                  }}
                  className="ml-2 text-gray-500 hover:text-red-500"
                >
                  <FiX />
                </button>
              </div>
            ) : (
              <>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Clique para enviar</span> ou arraste o arquivo
                </p>
                <p className="text-xs text-gray-500">CSV (máx. 10MB)</p>
              </>
            )}
          </div>
          <input
            id="csv-upload"
            type="file"
            ref={fileInputRef}
            accept=".csv, text/csv"
            onChange={handleFileChange}
            className="hidden"
            disabled={disabled || loading}
          />
        </label>
      </div>

      {error && (
        <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg flex items-center">
          <FiX className="flex-shrink-0 mr-2" />
          {error}
        </div>
      )}

      {isSuccess && (
        <div className="p-3 text-sm text-green-700 bg-green-100 rounded-lg flex items-center">
          <FiCheckCircle className="flex-shrink-0 mr-2" />
          Arquivo processado com sucesso!
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleUpload}
          disabled={disabled || loading || !file}
          className={`px-4 py-2 rounded-md font-medium flex items-center
            ${disabled || !file ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 
              'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'}`}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processando...
            </>
          ) : 'Processar Arquivo'}
        </button>
      </div>
    </div>
  );
}