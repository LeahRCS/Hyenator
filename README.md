# Hyenator — Classificador de Espécies de Hienas

O Hyenator é uma aplicação web completa (Frontend + Backend Node.js + Inferência em PyTorch) projetada para identificar espécies de hienas a partir de fotos. Utilizando uma arquitetura **ResNet18**, o modelo é capaz de distinguir quatro espécies diferentes de hienas: Lobo-da-terra, Hiena Marrom, Hiena Malhada e Hiena Listrada.

A interface possui um design moderno, conta com modo claro/escuro e um **tour guiado interativo** para facilitar a navegação de novos usuários.

---

## 🛠 Pré-requisitos e Estrutura

- **Node.js** (v18+)
- **Python 3**
- Modelo treinado `model.pth` no formato suportado (veja mais abaixo).

```txt
Hyenator/
├── frontend/             # Arquivos da interface de usuário (HTML/CSS/JS)
├── models_saved/         # Pasta onde o arquivo model.pth deve ser salvo
│   └── model.pth
├── server.js             # Backend Node.js que gerencia a API e o worker Python
├── package.json
└── requirements.txt
```

---

## 🚀 Como Iniciar o Projeto

### 1. Instalar dependências do Node.js
```bash
npm install
```

### 2. Criar ambiente Python e instalar dependências
**Linux/macOS:**
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```
**Windows:**
```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### 3. Configurar o Modelo (`model.pth`)
O sistema espera um arquivo de pesos treinado com a arquitetura `resnet18`. Ele deve ser copiado para a pasta `models_saved/` e renomeado para `model.pth`.
O checkpoint (salvo via `torch.save`) obrigatoriamente deve ser um dicionário contendo:
- `model_state_dict`: Os pesos da ResNet18.
- `classes`: Lista com o nome das classes.
- `config`: Dicionário com configurações (ex: `{"arch": "resnet18", "input_size": 224}`).

### 4. Rodar a Aplicação
Execute o comando abaixo na raiz do projeto:
```bash
npm start
```
Após o servidor inicializar e carregar o modelo PyTorch em memória, acesse a interface web através do seu navegador:
**http://localhost:3000**

---

## 🖥 Interface Web (Frontend)

O frontend foi desenhado para ser totalmente interativo e robusto. 
- Arraste ou selecione uma imagem na área de upload.
- Clique em **Classificar** e a API fará o processamento.
- **Tour Guiado:** O botão "i" no cabeçalho da página (ou no card para acessos primários) ativará um guia interativo explicando cada componente da interface.

## 📡 API (Endpoint)

Se você desejar utilizar apenas a API sem o frontend via requisições HTTP, o endpoint de inferência é:
`POST /infer`

**Formato esperado:** `multipart/form-data` com o campo `image`.

Exemplo usando cURL:
```bash
curl -X POST http://localhost:3000/infer -F "image=@./foto_hiena.jpg"
```

## 📝 Tecnologias Utilizadas
- **Node.js & Express:** Servidor e roteamento.
- **PyTorch & torchvision:** Inferência de rede neural via worker dedicado em Python.
- **Driver.js:** Para a criação do tour guiado de onboarding do usuário.