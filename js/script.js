// --- Lógica da Máscara de Telefone ---
const telInput = document.getElementById('inputTel');

telInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não é número
    
    if (value.length > 11) value = value.slice(0, 11); // Limita a 11 dígitos

    // Aplica a formatação dinamicamente
    if (value.length > 10) {
        // Formato Celular: (XX) XXXXX-XXXX
        value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (value.length > 6) {
        // Formato Fixo: (XX) XXXX-XXXX
        value = value.replace(/^(\d{2})(\d{4})(\d{4}).*/, "($1) $2-$3");
    } else if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    } else if (value.length > 0) {
        value = value.replace(/^(\d*)/, "($1");
    }

    e.target.value = value;
});

// --- Funções Principais ---

function gerarAssinatura() {
    const nome = document.getElementById('inputNome').value.toUpperCase().trim() || 'NOME DO SERVIDOR';
    const cargo = document.getElementById('inputCargo').value.toUpperCase().trim() || 'CARGO DO SERVIDOR';
    const email = document.getElementById('inputEmail').value.toLowerCase().trim() || 'exemplo@jacarei.sp.gov.br';
    const tel = document.getElementById('inputTel').value.trim() || '(12) 3955-0000';

    const linkLogo = "https://www.jacarei.sp.gov.br/wp-content/uploads/2025/01/Imagem-1.png";
    const linkGrafismo = "https://www.jacarei.sp.gov.br/wp-content/uploads/2025/01/Imagem-2.png";

    const htmlLimpo = `<table>
    <tbody>
        <tr>
            <td>
                <img style="width:280px;height:99px;border-radius:2px" src="${linkLogo}">
            </td>
            <td style="width:auto;height:auto;line-height:13.5px;white-space:nowrap">
                <div style="color:black;font-size:13.5px;font-family:Franklin Gothic,Roboto,sans-serif;font-weight:600;white-space:nowrap">${nome}<br></div>
                <div style="color:black;font-size:13.5px;font-family:Franklin Gothic,Roboto,sans-serif;font-weight:500;white-space:nowrap">${cargo}<br></div>
                <div style="color:black;font-size:13.5px;font-family:Franklin Gothic,Roboto,sans-serif;font-weight:400;white-space:nowrap">
                    <a href="mailto:${email}" target="_blank">${email}</a><br>
                </div>
                <div style="color:black;font-size:13.5px;font-family:Franklin Gothic,Roboto,sans-serif;font-weight:400;white-space:nowrap">tel/ramal.: ${tel}</div>
            </td>
            <td>
                <img style="width:163px;height:107px" src="${linkGrafismo}">
            </td>
        </tr>
    </tbody>
</table>`;

    document.getElementById('assinatura-render').innerHTML = htmlLimpo;
    document.getElementById('preview-box').classList.remove('hidden');
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

async function copiarAssinatura() {
    const tabela = document.querySelector('#assinatura-render table');
    if (!tabela) return;

    try {
        const blob = new Blob([tabela.outerHTML], { type: "text/html" });
        const richText = new ClipboardItem({ "text/html": blob });
        await navigator.clipboard.write([richText]);
        alert("Assinatura copiada com sucesso!");
    } catch (err) {
        alert("Erro ao copiar.");
    }
}