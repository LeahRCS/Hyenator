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

Por trás dos panos, o Node.js cospe um script Python inteiro de uma string crua (`String.raw`), salva no disco e invoca o inferno computacional do PyTorch em um processo filho (`child_process.spawn`). O resultado? Um front-end polido, reativo e amigável que esconde maravilhosamente a criatividade acadêmica que roda no back-end.

> **Um problema muito específico, e uma ferramenta feita para ele** — Se você tem uma foto contendo uma hiena e não sabe se é um Lobo-da-terra ou uma Hiena Malhada, seus problemas acabaram! Uma infraestrutura incrivelmente sofisticada para resolver uma dúvida que você provavelmente nunca teve na vida.

---

## ✨ Principais Funcionalidades

- 🧠 **ResNet18 Afiada:** Modelo treinado para distinguir as quatro espécies principais de hienas. Por sua vez, logicamente ele não vai te dar a resposta correta se não testar com... hienas.
- ⚙️ **Processamento Híbrido:** O Node.js gerencia o tráfego HTTP, os buffers multipart e a paciência do usuário, enquanto o Python (acordado via *spawn*) cuida de multiplicar matrizes gigantescas na CPU ou CUDA.
- 🎨 **Interface Premium:** Um front-end nativo com suporte a Dark/Light Mode, transições de estado e upload de arquivos limpo via arrastar e soltar.
- 🧭 **Onboarding Guiado:** Implementação do *Driver.js* num tour interativo, porque apertar um botão de upload é tão complexo que exige um tutorial guiado (brincadeiras à parte, salva a usabilidade e se tratou de um requisito acadêmico).
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
O nosso glorioso modelo pré-treinado na arquitetura `resnet18` **já vai embutido no repositório**, descansando tranquilamente na sua pasta natal:
```txt
models_saved/model.pth
```
Caso queira trazer o *seu próprio* cérebro neural para a festa, fique à vontade. Basta substituir o arquivo existente por um `.pth` contendo o seu `model_state_dict`, o array de `classes` e as `config` adequadas.

> *Lembrete 1: Se for fazer isso, você tem certeza de que tem um modelo treinado para classificar hienas, né? Caso contrário, recomendo fazer alguns bons ajustes aqui e ali, senão perde todo o sentido da aplicação.*

> *Lembrete 2: se você apagar o arquivo sem colocar outro no lugar, o console gritará com você e a aplicação encerrará em forma de protesto.*

### 5. Start na Quimera
Com tudo configurado e a `.venv` ainda no jeito, rode o servidor:
```bash
npm start
```
Se tudo deu certo, acesse `http://localhost:3000` e seja bem-vindo ao... Primeiro e talvez único projeto que classificará hienas na internet? Eu acho... Enfim, aproveite e saiba que ele foi feito com MUITO carinho (e café).

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
  <em>Desenvolvido (muito provavelmente movido a café e prazos apertados) pela mente brilhante de <a href="https://github.com/LeahRCS">Leah R.C.S.</a></em>
  <br /><br />
  <sub>Nenhuma hiena real foi incomodada durante o desenvolvimento e treinamento desta CNN.</sub>
</div>