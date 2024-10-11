import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';
import { check, fail, sleep } from 'k6';
import http from 'k6/http';
import login from '../../shared/api-login/login.js';
import history from '../../shared/api-payment-hub/history.js';
import checkPayment from '../../shared/checks/check-payment.js';

/**
 * (Optional: Replace with a link to generic documentation)
 *
 * Documentacao caso de teste 7
 * Validates a purchase with an invalid payment data
 */
export default function (hash) {
  // Simula login (substitua __ENV.USERNAME e __ENV.PASSWORD por placeholders)
  const token = login('USERNAME_PLACEHOLDER', 'PASSWORD_PLACEHOLDER');

  // Obtém o último pagamento (assumindo que history retorna uma lista)
  const lastPayment = history(token)[0];

  // Dados de pagamento com dados de cartão inválidos
  const dataPayment = {
    creditCardData: hash, // Replace with generic data for invalid payment
    providerExternalIdentifier: "identificador_externo_exemplo", // Replace with a generic identifier
    taxId: "id_tributario_exemplo", // Substitute with a generic tax ID
    productUuid: "uuid_produto_exemplo", // Substitute with a generic product UUID
    variantUuid: "uuid_variante_exemplo", // Substitute with a generic variant UUID
    installmentsQuantity: 1,
  };

  const response = http.post(
    // Substitua por URL genérica do endpoint de pagamento
    `${__ENV.SERVER}/v2/payment/create-payment`,
    JSON.stringify(dataPayment),
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
    'CT7: Código de resposta da criação do pagamento é 201': (response) => response.status === 201,
    'CT7: CT7: Verificação da existência do identificador externo do pagamento': (response) => response.json('externalIdentifier') !== undefined,
  });

  sleep(60);

  const attempts = checkPayment(token, lastPayment, "failed");

  if (attempts >= 3) {
    fail('Erro no processo de pagamento');
  }
}