import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';
import { check } from 'k6';
import http from 'k6/http';
import login from '../../shared/api-login/login.js';

/**
 * (Optional: Replace with a link to generic documentation)
 *
 * Documentação caso de teste 6
 * Validates a purchase with an invalid provider
 */
export default function (hash) {
  // Simula login (substitua __ENV.USERNAME e __ENV.PASSWORD por placeholders)
  const token = login('USERNAME_PLACEHOLDER', 'PASSWORD_PLACEHOLDER');

  // Dados de pagamento com identificador de provedor inválido
  const dataPayment = {
    creditCardData: hash,
    providerExternalIdentifier: "identificador_externo_invalido", // Replace with a generic identifier
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
    'CT6: Código de resposta da criação do pagamento é 404': (response) => response.status === 404,
    'CT6: Verificação do erro na criação do pagamento': (response) => response.json('error') === "Not Found",
    'CT6: CT6: Verificação da mensagem de erro': (response) => response.json('message').length > 0, // Check for a non-empty message
    'CT6: CT6: Verificação do código de status': (response) => response.json('statusCode') === 404,
  });
}