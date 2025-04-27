# PRIORIZE ME - Classificador de Leads

## Visão Geral
**Priorize Me** é uma aplicação voltada para otimizar o processo de vendas e a priorização de leads para equipes comerciais. O objetivo principal é ajudar as equipes de vendas a focarem nos leads com maior potencial de conversão, utilizando um modelo de machine learning treinado para classificar os leads.

## Problema
Empresas frequentemente têm dificuldades em priorizar leads de maneira eficiente, o que pode resultar em perda de oportunidades e recursos mal alocados.

## Solução
O **Priorize Me** automatiza a classificação dos leads com base em um modelo de machine learning. Ao carregar um arquivo CSV com dados dos leads, o sistema classifica cada um com uma pontuação e uma categoria de prioridade (**Alta**, **Média** ou **Baixa**), permitindo que as equipes comerciais foquem nos leads com maior chance de conversão.

## Funcionalidade
- **Upload de Leads**: O usuário pode enviar um arquivo CSV com os dados dos leads (nome, cargo, interações, tamanho da empresa e email profissional).
- **Classificação Automática**: O modelo classifica os leads com uma pontuação e atribui uma classificação de prioridade (Alta, Média ou Baixa).
- **Interface Simples e Intuitiva**: A interface web permite o envio dos dados e a visualização dos resultados de maneira clara e acessível.

## Melhorias Futuras
Embora o **Priorize Me** seja uma solução eficiente para a classificação de leads, existem várias melhorias que poderiam ser feitas em versões futuras:

A ideia é que o **Priorize Me** seja um módulo de um sistema muito mais completo, um sistema que também utilize modelos de linguagem para criar menssagens ideais para os LEADS.

Melhorar a Precisão do Modelo: O modelo de classificação pode ser aprimorado utilizando mais dados históricos e testando diferentes algoritmos de machine learning, como XGBoost ou redes neurais.

Interface de Análise de Dados: A interface pode ser melhorada com gráficos interativos para visualização das classificações e tendências dos leads, proporcionando insights adicionais para as equipes de vendas.

Notificações de Follow-up: O sistema pode incluir funcionalidades que alertem os vendedores sobre leads classificados como "Alta" ou "Média" para garantir um acompanhamento eficiente.

## Como Rodar o Projeto
### Requisitos
- Node.js (versão 14 ou superior)
- Python (versão 3.7 ou superior)
- pip (gerenciador de pacotes do Python)

### Passo 1: Clonar o repositório (pule este passo se tiver baixado esta pasta)
Primeiro, clone o repositório para a sua máquina local:
```bash
git clone https://github.com/lucasnardivieira/projeto-priorize-me.git
cd projeto-priorize-me
```
### Passo 2: Rodar o Back-end

1. Navegue até a pasta `backend/` e crie um ambiente virtual para Python:

    ```bash
    cd backend
    python -m venv venv
    ```

2. Ative o ambiente virtual:

    - **Windows:**

        ```bash
        venv\Scripts\activate
        ```

3. Instale as dependências do back-end:

    ```bash
    pip install -r requirements.txt
    ```

4. Rode o servidor Flask:

    ```bash
    python app.py
    ```

O servidor estará rodando na URL [http://localhost:5000](http://localhost:5000).

### Passo 3: Rodar o Front-end

1. Navegue até a pasta `frontend/` e instale as dependências do front-end:

    ```bash
    cd ../frontend
    npm install
    ```

2. Execute o front-end:

    ```bash
    npm run dev
    ```

A aplicação React estará acessível na URL [http://localhost:5173](http://localhost:5173).

### Passo 4: Usar a Aplicação

1. Abra o navegador e vá para [http://localhost:5173](http://localhost:5173).

2. Na interface, você verá um botão para enviar um arquivo CSV com os dados dos leads.

O arquivo deve seguir a estrutura abaixo:

```csv
nome,cargo,interacoes,empresa_tamanho,email_profissional
João Silva,Analista,5,pequena,1
Maria Souza,Diretor,15,grande,1
```
