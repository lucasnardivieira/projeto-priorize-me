from flask import Flask, request, jsonify
import pickle
import pandas as pd
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Debug para mostrar onde o backend está rodando
print("Diretório atual:", os.getcwd())
print("Arquivos no diretório:", os.listdir())

# Carrega modelo e encoders
model, le_cargo, le_empresa = pickle.load(open('model.pkl', 'rb'))

@app.route('/classify', methods=['POST'])
def classify():
    try:
        # Recebe o JSON
        data = request.json  # Espera uma lista de leads
        df = pd.DataFrame(data)

        df = df.dropna()

        df['cargo'] = le_cargo.transform(df['cargo'])
        df['empresa_tamanho'] = le_empresa.transform(df['empresa_tamanho'])

        # Features usadas na previsão
        X = df[['cargo', 'interacoes', 'empresa_tamanho', 'email_profissional']]

        # Predição das probabilidades
        preds = model.predict_proba(X)[:, 1]

        # Monta a resposta
        result = []
        for i, score in enumerate(preds):
            result.append({
                "lead": data[i],
                "score": round(float(score) * 100, 2),
                "classificacao": (
                    "Alta" if score > 0.7 else
                    "Média" if score > 0.4 else
                    "Baixa"
                )
            })

        return jsonify(result)
    
    except Exception as e:
        # Qualquer erro na predição retorna 500
        print("Erro na predição:", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
