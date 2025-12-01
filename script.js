// script.js — integração com Newton API (v2)

const opInput = document.getElementById("operationInput");
const exprInput = document.getElementById("expressionInput");
const btnCalc = document.getElementById("btnCalc");
const output = document.getElementById("output");

const BASE_URL = "https://newton.now.sh/api/v2";

// Função principal
async function callNewton(operation, expression) {
    try {
        const encodedExpr = encodeURIComponent(expression);
        const url = `${BASE_URL}/${operation}/${encodedExpr}`;

        output.innerHTML = "Calculando...";

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();

        output.innerHTML = `
            <p><strong>Operação:</strong> ${data.operation}</p>
            <p><strong>Expressão:</strong> ${data.expression}</p>
            <p><strong>Resultado:</strong> ${data.result}</p>
        `;
    } catch (err) {
        console.error(err);
        output.innerHTML = "Erro ao processar a expressão.";
    }
}

// Evento do botão
btnCalc.addEventListener("click", () => {
    const op = opInput.value.trim();
    const expr = exprInput.value.trim();

    if (op === "" || expr === "") {
        output.innerHTML = "Preencha a operação e a expressão.";
        return;
    }

    callNewton(op, expr);
});
