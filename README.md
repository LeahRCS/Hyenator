<div align="center">
  <h1>🔬 Hyenator 🔬</h1>
  <p><em>Classificador Convolutional de Espécies de Hienas via Node.js e PyTorch</em></p>

  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white" alt="PyTorch" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
  <img src="https://img.shields.io/badge/Driver.js-FFB020?style=for-the-badge&logoColor=white" alt="Driver.js" />
</div>

<br />

## 📖 Sobre o Projeto

O **Hyenator** é um projeto acadêmico que une os mundos — muitas vezes distantes — do Deep Learning e do desenvolvimento Web clássico. Nascido da necessidade de classificar hienas (porque claramente esse é um dos maiores problemas de nossa época), este sistema utiliza uma Rede Neural Convolucional (ResNet18) de respeito, arquitetada dentro de um humilde servidor Node.js.

Por trás dos panos, o Node.js cospe um script Python inteiro de uma string crua (`String.raw`), salva no disco e invoca o inferno computacional do PyTorch em um processo filho (`child_process.spawn`). O resultado? Um front-end polido, reativo e amigável que esconde maravilhosamente a "criatividade" acadêmica que roda no back-end.

> **Satírico, mas implacável** — Se você tem uma foto e não sabe se é um Lobo-da-terra ou uma Hiena Malhada, seus problemas acabaram. Uma infraestrutura incrivelmente sofisticada para resolver uma dúvida que você provavelmente nunca teve na vida.

---

## ✨ Principais Funcionalidades

- 🧠 **ResNet18 Afiada:** Modelo treinado para distinguir as quatro espécies principais de hienas. Não jogue fotos de gatos, os resultados podem ofender a IA.
- ⚙️ **Processamento Híbrido:** O Node.js gerencia o tráfego HTTP, os buffers multipart e a paciência do usuário, enquanto o Python (acordado via *spawn*) cuida de multiplicar matrizes gigantescas na CPU ou CUDA.
- 🎨 **Interface Premium:** Um front-end nativo com suporte a Dark/Light Mode, transições de estado e upload de arquivos limpo via arrastar e soltar.
- 🧭 **Onboarding Guiado:** Implementação do *Driver.js* num tour interativo, porque apertar um botão de upload é tão complexo que exige um tutorial guiado (brincadeiras à parte, salva a usabilidade).
- 🔗 **Integração Desacoplada:** API via endpoint RESTful `POST /infer` aceitando `multipart/form-data`, pronto para integrações externas de procedência duvidosa.

| Funcionalidade | O que faz na prática |
| --- | --- |
| **Worker Python Contínuo** | Fica vivo aguardando requisições JSON via `stdin` e respondendo em `stdout`, driblando o custo de carregamento do PyTorch. |
| **Classificação Dinâmica** | Lê as classes diretamente do checkpoint; acabou a era do *hardcode* no JavaScript. |
| **Tour da Aplicação** | Salva a vergonha do usuário em `localStorage` para não ficar enchendo a tela em cada visita. |
| **Interface Responsiva** | Não importa o tamanho da tela, a Hiena será perfeitamente enquadrada. |

---

## 🛠️ Arquitetura e Tecnologias

O ecossistema escolhido prova que Node.js e Python conseguem conviver no mesmo servidor, mesmo que conversem por debaixo da porta através de I/O padrão.

| Camada | Tecnologia |
| --- | --- |
| **Frontend** | Vanilla JS, CSS3 Moderno, HTML5 (Zero dependências obesas de build) |
| **UX / Onboarding** | Driver.js (Tours guiados que não parecem de 2012) |
| **Backend API** | Node.js + Express + Multer (gerência de uploads) |
| **Inferência de IA** | Python 3 + PyTorch + Torchvision |
| **Modelo da CNN** | ResNet18 (Arquitetura pré-treinada modificada) |

---

## 🚀 Guia de Instalação (Sem Enrolação)

Siga os passos e levante a infraestrutura classificatória na sua máquina.

**Pré-requisitos:** Node.js (v18+) e Python 3 instalados.

### 1. Clonar e Instalar o Node
```bash
git clone https://github.com/LeahRCS/Hyenator.git
cd Hyenator
npm install
```

### 2. O Ambiente Virtual do Python
Sem `venv`, a chance de quebrar o seu sistema operacional com pacotes de ML é alta. Crie o ambiente:

**Linux / macOS:**
```bash
python3 -m venv .venv
source .venv/bin/activate
```
**Windows PowerShell:**
```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
```

### 3. Instale o Poder de Fogo
Com o `.venv` ativado, instale as dependências pesadas do ML:
```bash
pip install -r requirements.txt
```

### 4. A Essência da Aplicação (`model.pth`)
Nenhum software funciona sem cérebros. Traga seu arquivo `.pth` contendo o `model_state_dict`, o array de `classes` e a `config` (diga-se de passagem, treinada na `resnet18`).
Copie e renomeie o arquivo para bater exatamente neste caminho:
```txt
models_saved/model.pth
```
> *Se essa pasta e o arquivo não existirem, o console gritará com você e encerrará a aplicação.*

### 5. Start na Quimera
Com tudo configurado e a `.venv` ainda no jeito, rode o servidor:
```bash
npm start
```
Se tudo deu certo, acesse `http://localhost:3000` e seja bem-vindo ao Esgoto... digo, ao sistema de classificação animal.

---

## 📁 Estrutura do Repositório

```
Hyenator/
├── server.js             # O maestro que levanta a API, serve o HTML e acorda o Python
├── requirements.txt      # PyTorch, Torchvision, Pillow e companhia limitada
├── models_saved/         # Lar oficial do model.pth
├── frontend/             
│   ├── index.html        # A face do sistema
│   ├── css/styles.css    # Paleta caprichada e responsividade
│   └── js/app.js         # Lógica da interface, Tour Guiado e chamadas REST
```

---

## 📜 Licença

MIT — Porque até uma rede neural julgaradora de hienas merece ser open-source.

---

<div align="center">
  <br />
  <em>Desenvolvido (muito provavelmente movido a café e prazos apertados) por <a href="https://github.com/LeahRCS">Leah R.C.S.</a></em>
  <br /><br />
  <sub>Nenhuma hiena real foi incomodada durante o treinamento desta CNN. Os desenvolvedores, no entanto, ainda se recuperam dos tensores com shape inválido.</sub>
</div>