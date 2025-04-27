# Este script treina um modelo de machine learning para prever a conversão de leads
# com base em dados fictícios. O modelo é salvo em um arquivo para uso posterior.

import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import pickle

# Dataset fictício com TODOS os cargos possíveis
data = pd.DataFrame({
    'cargo': (
        ['Analista'] * 20 +
        ['Coordenador'] * 20 +
        ['Diretor'] * 20 +
        ['CEO'] * 20 +
        ['Gerente'] * 20 +
        ['Supervisor'] * 20 +
        ['Desenvolvedor'] * 20
    ),
    'interacoes': [i % 20 + 1 for i in range(140)],
    'empresa_tamanho': (
        ['pequena', 'media', 'grande'] * 46 + ['media', 'pequena']
    ),
    'email_profissional': [1 if i % 2 == 0 else 0 for i in range(140)],
    'conversao': [1 if i % 3 == 0 else 0 for i in range(140)]
})

# Codificação
le_cargo = LabelEncoder()
le_empresa = LabelEncoder()
data['cargo'] = le_cargo.fit_transform(data['cargo'])
data['empresa_tamanho'] = le_empresa.fit_transform(data['empresa_tamanho'])

# Treinamento
X = data.drop('conversao', axis=1)
y = data['conversao']
model = RandomForestClassifier()
model.fit(X, y)

# Salva modelo e codificadores
with open('backend/model.pkl', 'wb') as f:
    pickle.dump((model, le_cargo, le_empresa), f)

print("Modelo treinado e salvo com sucesso!")
