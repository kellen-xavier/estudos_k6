import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';
import { check } from 'k6';
import http from 'k6/http';
import login from '../../shared/api-login/login.js';

/**
 *  @see [Link para documentação do teste] (se aplicável)
 *
 * Documentação caso de teste 5
 * Validates fields types
 */
export default function () {
  // Simula login (substitua __ENV.USERNAME e __ENV.PASSWORD por placeholders)
  const token = login('USERNAME_PLACEHOLDER', 'PASSWORD_PLACEHOLDER');

  // Dados de pagamento com tipos incorretos
  const invalidPaymentData = {
    creditCardData: 1, // Should be a string
    providerExternalIdentifier: 1, // Should be a UUID
    taxId: 1, // Should be a string
    productUuid: 1, // Should be a UUID
    variantUuid: 1, // Should be a UUID
    installmentsQuantity: "abc", // Should be an integer
  };

  const response = http.post(
    // Substitua por URL genérica do endpoint de pagamento
    `${__ENV.SERVER}/v2/payment/create-payment`,
    JSON.stringify(invalidPaymentData),
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
    'CT5: Código de resposta da criação do pagamento é 400': (response) => response.status === 400,
    'CT5: Verificação do erro na criação do pagamento': (response) => response.json('error') === "Bad Request",
    // Check for messages about incorrect types using some function
    'CT5: CT5: Verificação da mensagem de erro - Tipo de dado do cartão de crédito': (response) => response.json('message').some(message => message.includes('tipo de dado do cartão de crédito')),
    'CT5: CT5: Verificação da mensagem de erro - Tipo de dado do identificador externo do provedor': (response) => response.json('message').some(message => message.includes('tipo de dado do identificador externo do provedor')),
    'CT5: CT5: Verificação da mensagem de erro - Tipo de dado do identificador fiscal': (response) => response.json('message').some(message => message.includes('tipo de dado do identificador fiscal')),
    'CT5: CT5: Verificação da mensagem de erro - Tipo de dado do identificador do produto': (response) => response.json('message').some(message => message.includes('tipo de dado do identificador do produto')),
    'CT5: CT5: Verificação da mensagem de erro - Tipo de dado do identificador da variante': (response) => response.json('message').some(message => message.includes('tipo de dado do identificador da variante')),
    'CT5: CT5: Verificação da mensagem de erro - Tipo de dado da quantidade de parcelas': (response) => response.json('message').some(message => message.includes('tipo de dado da quantidade de parcelas')),
    'CT5: CT5: Verificação do código de status': (response) => response.json('statusCode') === 400,
  });
}