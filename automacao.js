import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
// Percorrer pelas regras de acesso para inserir
// no loop ter variavel que armazena valor de uuid para usa no insert
// gerar o insert no loop
// com base na regra de acesso atual

let regrasBase = [
    "REGRA",
    "REGRA-UM",
    "REGRA-DOIS",
    "REGRA-TRES",
    "REGRA-QUADTRO",
    "REGRA-CINCO",
    "REGRA-SEIS",
    "REGRA-SETE",
    "REGRA-OITO",
    "REGRA-NOVE",
    "REGRA-DEZ",
    "REGRA-ONZE"
];

function pegaIdPerfilAcessoComBaseNaRegra(regra) {
    if (regra == null || regra === "") return;

    if (regra.includes("REGRA-ONZE")) return "b7008399-38c7-4e4c-91cc-a75ff0451b13"; // Retorna id do perfil de acesso relacionado a regra-onze

    return "e9cc5f9c-ad7f-435e-bf1e-03366481eeba"; // retorno id do perfil de acesso relacionado a convenios
}

function pegaIdModuloComBaseNaRegra(regra) {
    if (regra == null || regra === "") return;

    if (regra.includes("REGRA-ONZE")) return "d6d661f4-f75a-4921-8be8-06e788d2b8f1"; // Retorna id do perfil de acesso relacionado a regra-onze

    return "d6d661f4-f75a-4921-8be8-06e788d2b8f1"; // retorno id do perfil de acesso relacionado a convenios
}

function pegaModuloPorIdPerfilAcesso(idPerfilAcesso) {
    if (idPerfilAcesso == null || idPerfilAcesso === "") return;

    if (idPerfilAcesso == "e9cc5f9c-ad7f-435e-bf1e-03366481eeba") return "d6d661f4-f75a-4921-8be8-06e788d2b8f1"; // Retorna id do perfil de acesso relacionado a regra-onze

    return "d6d661f4-f75a-4921-8be8-06e788d2b8f1";
}

let insertsRegrasSql = [];
let insertsPerfilAcessoRegraAcesso = [];

let regraacessoPerfilacesso = {
};

regrasBase.forEach(regra => {
    for (let i = 0; i <= 4; i++) {
        const idRegra = uuidv4();
        insertsRegrasSql.push(`INSERT INTO regras_acesso (regra_acesso_id, codigo, descricao, modulo_id, usuario_cadastro, usuario_atualizacao, data_cadastro, data_atualizacao) VALUES('${idRegra}', '${regra}-0${i}', '.', '${pegaIdModuloComBaseNaRegra(regra)}', 'test@test.com', 'test@test.com', '2012-12-12 01:00:00.000 -0200', '2012-12-12 01:00:00.000 -0200');`)
        regraacessoPerfilacesso = {
            ...regraacessoPerfilacesso,
            [idRegra]: pegaIdPerfilAcessoComBaseNaRegra(regra)
        }
    }
});

Object.keys(regraacessoPerfilacesso).forEach(idRegra => {
    // console.log(`PERFIL ACESSO ASSOCIAÇÃO`)
    // console.log(`REGRA: ${idRegra} - PERFIL: ${regraacessoPerfilacesso[idRegra]}`);
    insertsPerfilAcessoRegraAcesso.push(`INSERT INTO perfis_regras_acesso(perfil_acesso_id, regra_acesso_id, status, usuario_cadastro, usuario_atualizacao, data_cadastro, data_atualizacao) VALUES('${regraacessoPerfilacesso[idRegra]}', '${idRegra}', 1, 'test@test.com', 'test@test.com', '2012-12-12 01:00:00.000 -0200', '2012-12-12 01:00:00.000 -0200');`);
})

fs.writeFileSync('insereRegrasAcesso.sql', insertsRegrasSql.toString().replaceAll(";,", ";\n"), err => {
    if (err) console.log(err);
    else console.log("Sucesso");
});

fs.writeFileSync('inserePerfilRegrasAcesso.sql', insertsPerfilAcessoRegraAcesso.toString().replaceAll(";,", ";\n"), err => {
    if (err) console.log(err);
    else console.log("Sucesso");
})