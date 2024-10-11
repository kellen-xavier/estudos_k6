import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';
import { check, fail, sleep } from 'k6';
import http from 'k6/http';

// Importações para outras funções utilizadas no teste

/**
 * @see [Link para documentação do teste] (se aplicável)
 *
 * Documentacao Caso de teste 2
 * Valida a compra de um pacote com dois créditos
 */
export default function (hash) {
  // Simula login (substitua __ENV.USERNAME e __ENV.PASSWORD por placeholders)
  const token = login('USERNAME_PLACEHOLDER', 'PASSWORD_PLACEHOLDER');

  // Obtém o último pagamento (assumindo que history retorna uma lista)
  const lastPayment = history(token)[0];

  // Obtém o saldo de impulso anterior
  const { balance: lastBoost } = lastBoostBalance(token);

  // Dados para a compra do pacote de impulso
  const paymentData = {
    creditCardData: hash,
    providerExternalIdentifier: "identificador_externo", // Substitua por um identificador genérico
    taxId: "id_tributario_exemplo", // Substitua por um ID tributário genérico
    productUuid: "uuid_produto_exemplo", // Substitua por um UUID genérico
    variantUuid: "uuid_variante_exemplo", // Substitua por um UUID genérico
    installmentsQuantity: 1, // Mantenha a quantidade de parcelas
  };

  const response = http.post(
    // Substitua por URL genérica do endpoint de pagamento
    `${__ENV.SERVER}/v2/payment/create-payment`,
    JSON.stringify(paymentData),
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'content-type': "application/json",
        'accept': "application/json",
        'Idempotency-Key': uuidv4(),
      },
    },
  );

  check(response, {
    'CT2: Código de resposta da criação do pagamento é 201': (response) => response.status === 201,
    'CT2: Verificação do identificador externo do pagamento': (response) => response.json('externalIdentifier') !== undefined,
  });

  const attempts = checkPayment(token, lastPayment, "aprovação"); // Mantenha "aprovação"

  if (attempts >= 3) {
    fail('Erro no processo de pagamento');
  }

  sleep(10);

  checkBoostBalance(token, lastBoost + VALOR_IMPULSO_EXEMPLO); // Substitua por um valor genérico
}