const menuOptions = ["WIFI", "INSTAGRAM", "GOOGLE", "BUSCA SEGA", "APPLE"];
let selectedIndex = 0;

const fakeWiFis = [
  "VIVO-FIBRA-8743", "NET-CLARO-2G", "TP-LINK_5G", "HACKED_WIFI", "BrizollaZone"
];

document.addEventListener("keydown", handleKeyPress);
updateMenuHighlight();

// Manipula as teclas pressionadas
function handleKeyPress(e) {
  if (e.key === "ArrowDown") {
    selectedIndex = (selectedIndex + 1) % menuOptions.length;
    updateMenuHighlight();
  } else if (e.key === "ArrowUp") {
    selectedIndex = (selectedIndex - 1 + menuOptions.length) % menuOptions.length;
    updateMenuHighlight();
  } else if (e.key === "Enter" || e.key === " ") {
    runSelectedOption(menuOptions[selectedIndex]);
  }
}

// Atualiza destaque no menu
function updateMenuHighlight() {
  document.querySelectorAll(".menu-option").forEach((el, idx) => {
    el.classList.toggle("selected", idx === selectedIndex);
  });
}

// Executa a opção selecionada
function runSelectedOption(option) {
  clearOutput();
  simulateHacking(option);
}

// Limpa a saída
function clearOutput() {
  document.getElementById("output").textContent = "";
}

// Simula o comportamento de cada opção
function simulateHacking(option) {
  let output = document.getElementById("output");

  if (option === "WIFI") {
    printWithDelay(output, "Buscando redes Wi-Fi próximas...\n", () => {
      fakeWiFis.forEach((wifi, i) => {
        setTimeout(() => {
          appendOutput(`${i + 1}. ${wifi}`);
          createPopup(`Rede detectada: ${wifi}`);
        }, i * 400);
      });
    });

  } else if (option === "INSTAGRAM") {
    const user = prompt("Digite o nome de usuário do INSTAGRAM:") || "anonymous";
    appendOutput(`Usuario: ${user}`);
    printWithDelay(output, `Conectando ao INSTAGRAM como ${user}...\n`, () => {
      simulateHackSequence(() => {
        appendOutput("Redirecionando para o perfil...");
        setTimeout(() => {
          window.location.href = "https://www.instagram.com/brizolladev/";
        }, 2000);
      });
    });

  } else if (option === "GOOGLE") {
    const user = prompt("Digite o nome de usuário do GOOGLE:") || "anonymous";
    appendOutput(`Usuario: ${user}`);
    printWithDelay(output, `Conectando ao GOOGLE como ${user}...\n`, () => {
      const terminals = [];

      for (let i = 0; i < 3; i++) {
        const win = window.open("", "_blank", "width=400,height=300");
        if (win) {
          win.document.write(`
            <body style="background:black;color:lime;font-family:monospace;padding:10px;">
              <pre id="terminal${i}">C:\\Users\\${user}> color a\n</pre>
              <script>
                const terminal = document.getElementById("terminal${i}");
                const cmds = ["dir /s", "ipconfig", "netstat -a", "tracert google.com", "ping 127.0.0.1", "hydra -l root -P passlist.txt ssh://192.168.0.1"];
                let line = 1;
                let interval = setInterval(() => {
                  terminal.textContent += "\\nC:\\\\Users\\\\${user}> " + cmds[Math.floor(Math.random() * cmds.length)];
                  line++;
                  if (line > 10) clearInterval(interval);
                }, 300);
              <\/script>
            </body>
          `);
          terminals.push(win);
        }
      }

      setTimeout(() => {
        terminals.forEach(w => {
          if (w && !w.closed) w.close();
        });
        window.location.href = "https://www.youtube.com/watch?v=qL9Hkc4xjs8&list=PLoWWB6PTe6TA-kj_h5DGobBrGlDdyAuTm";
      }, 5000);
    });

  } else if (option === "BUSCA SEGA") {
    simulateHackSequence(() => {
      appendOutput("Parabéns, você acabou de hackear a geladeira da sua vó! 😎");
    });

  } else if (option === "APPLE") {
    appendOutput("Acessando loja da Apple...");

    // Abre a loja oficial em nova aba
    window.open("https://www.apple.com/br/shop/buy-iphone/iphone-16-pro/tela-de-6,9-polegadas-256gb-tit%C3%A2nio-deserto", "_blank");

    // Simula a alteração e abre o arquivo local
    setTimeout(() => {
      appendOutput("Injetando exploit na página...");
      createPopup("Preço alterado com sucesso! 🎯");

      const localFilePath = "apple.com.br.html";

      fetch(localFilePath)
        .then(response => {
          if (!response.ok) throw new Error("Arquivo não encontrado.");
          return response.text();
        })
        .then(html => {
          const newWindow = window.open("", "_blank");
          newWindow.document.write(html);
        })
        .catch(err => {
          appendOutput("Erro ao abrir a página local da Apple.");
          createPopup("Arquivo apple.com.br.html não encontrado!");
          console.error(err);
        });

    }, 3000);
  }
}

// Função que imprime texto com delay
function printWithDelay(element, text, callback) {
  let i = 0;
  let interval = setInterval(() => {
    element.textContent += text[i++];
    if (i >= text.length) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, 50);
}

// Adiciona texto à saída
function appendOutput(text) {
  const out = document.getElementById("output");
  out.textContent += text + "\n";
}

// Cria popups falsos na tela
function createPopup(content) {
  const popup = document.createElement("div");
  popup.className = "popup";
  popup.textContent = content;

  popup.style.top = Math.random() * window.innerHeight + "px";
  popup.style.left = Math.random() * window.innerWidth + "px";

  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 4000);
}

// Simula sequência de "hack"
function simulateHackSequence(callback) {
  const lines = [
    "Acessando servidores...",
    "Modificando registros...",
    "Interceptando pacotes...",
    "Decodificando tokens...",
    "Extraindo metadados...",
    "Injetando scripts maliciosos...",
    "Finalizando operação...",
    `Password: ${generatePassword()}`
  ];

  lines.forEach((line, i) => {
    setTimeout(() => {
      appendOutput(line);
      createPopup(line);
      if (i === lines.length - 1 && callback) callback();
    }, i * 500);
  });
}

// Gera senha falsa
function generatePassword() {
  return Math.random().toString(36).slice(-10);
}
