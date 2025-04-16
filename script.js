const menuOptions = ["WIFI", "INSTAGRAM", "GOOGLE", "BUSCA SEGA"];
let selectedIndex = 0;

const fakeWiFis = [
  "VIVO-FIBRA-8743", "NET-CLARO-2G", "TP-LINK_5G", "HACKED_WIFI", "BrizollaZone"
];

document.addEventListener("keydown", handleKeyPress);
updateMenuHighlight();

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

function updateMenuHighlight() {
  document.querySelectorAll(".menu-option").forEach((el, idx) => {
    el.classList.toggle("selected", idx === selectedIndex);
  });
}

function runSelectedOption(option) {
  clearOutput();
  simulateHacking(option);
}

function clearOutput() {
  document.getElementById("output").textContent = "";
}

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
      // Abrir 3 janelas simulando terminal
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

      // Fechar janelas e redirecionar após 5 segundos
      setTimeout(() => {
        terminals.forEach(w => {
          if (w && !w.closed) w.close();
        });

        window.location.href = "https://accounts.google.com/v3/signin/identifier?authuser=0&continue=https%3A%2F%2Fwww.google.com%2Fsearch%3Fq%3Dsite%2Bhacker%26sca_esv%3Da7528baf20b27cbb%26sxsrf%3DAHTn8zoP5CbaSZls-qVraHc-afCzK1FhzA%253A1744805486558%26ei%3Dbp7_Z-DuIYOQ5OUPnfDioAM%26ved%3D0ahUKEwjg3en5wtyMAxUDCLkGHR24GDQQ4dUDCBE%26uact%3D5%26oq%3Dsite%2Bhacker%26gs_lp%3DEgxnd3Mtd2l6LXNlcnAiC3NpdGUgaGFja2VyMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMggQABiABBjLAUiKJ1DkDljzJHACeACQAQCYAbwBoAG7DqoBBDAuMTK4AQPIAQD4AQGYAg2gAqoOwgIKEAAYsAMY1gQYR8ICBBAjGCfCAgoQIxiABBgnGIoFwgINEC4YgAQYQxjUAhiKBcICFhAuGIAEGLEDGNEDGEMYgwEYxwEYigXCAggQLhiABBixA8ICEBAAGIAEGLEDGEMYgwEYigXCAhEQLhiABBixAxjRAxiDARjHAcICChAAGIAEGEMYigXCAgUQLhiABMICCxAAGIAEGLEDGIMBwgIOEC4YgAQYxwEYjgUYrwHCAgoQABiABBgUGIcCwgIIEAAYgAQYsQPCAh0QLhiABBjHARiOBRivARiXBRjcBBjeBBjgBNgBAcICBxAAGIAEGAqYAwCIBgGQBgi6BgYIARABGBSSBwYyLjEwLjGgB-ZZsgcGMC4xMC4xuAeXDg%26sclient%3Dgws-wiz-serp&ec=GAlAAQ&hl=pt-BR&flowName=GlifWebSignIn&flowEntry=AddSession&dsh=S-1574117385%3A1744805744117859";
      }, 5000);
    });

  } else if (option === "BUSCA SEGA") {
    simulateHackSequence(() => {
      appendOutput("Parabéns, você acabou de hackear a geladeira da sua vó! 😎");
    });
  }
}

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

function appendOutput(text) {
  const out = document.getElementById("output");
  out.textContent += text + "\n";
}

function createPopup(content) {
  const popup = document.createElement("div");
  popup.className = "popup";
  popup.textContent = content;

  popup.style.top = Math.random() * window.innerHeight + "px";
  popup.style.left = Math.random() * window.innerWidth + "px";

  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 4000);
}

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

function generatePassword() {
  return Math.random().toString(36).slice(-10);
}
