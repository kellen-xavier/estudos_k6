import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';
import { check } from 'k6';
import http from 'k6/http';
import login from '../../shared/api-login/login.js';

/**
 * (Optional: Replace with a link to generic documentation)
 *
 * Documentacao caso de teste 12
 * Validar compra de pacote com numero invalido (zero)
 */
export default function (hash) {
  // Simula login (substitua __ENV.USERNAME e __ENV.PASSWORD por placeholders)
  const token = login('USERNAME_PLACEHOLDER', 'PASSWORD_PLACEHOLDER');

  // Dados de pagamento com um número de parcelas inválido (para pacote xx)
  const dataPayment = {
    creditCardData: hash, // Substitua por dados genéricos para pagamento inválido
    providerExternalIdentifier: "identificador_externo_exemplo", // Substitua por um identificador genérico
    taxId: "id_tributario_exemplo", // Substitua por um CPF fictício
    productUuid: "uuid_produto_exemplo", // Substitua por um UUID genérico do produto
    variantUuid: "uuid_variante_exemplo", // Substitua por um UUID genérico da variante
    installmentsQuantity: 0, // Valor inválido para pacote (ajuste para um número válido no teste)
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
    'CT12: Código de resposta da criação do pagamento é 400': (response) => response.status === 400,
    'CT12: CT12: Verificação do erro na criação do pagamento': (response) => response.json('error') === "Bad Request",
    // Check for a non-empty message instead of a specific error code
    'CT12: CT12: Verificação da mensagem de erro': (response) => response.json('message').length > 0,
    'CT12: CT12: Verificação do código de status': (response) => response.json('statusCode') === 400,
  });
}