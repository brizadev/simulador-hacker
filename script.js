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

    } else if (option === "INSTAGRAM" || option === "GOOGLE") {
        const user = prompt(`Digite o nome de usuário do ${option}:`) || "anonymous";
        appendOutput(`Usuario: ${user}`);
        printWithDelay(output, `Conectando ao ${option} como ${user}...\n`, () => {
          simulateHackSequence(() => {
            if (option === "INSTAGRAM") {
              appendOutput("Redirecionando para o perfil...");
              setTimeout(() => {
                window.location.href = "https://www.instagram.com/brizolladev/";
              }, 2000);
            }
          });
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
