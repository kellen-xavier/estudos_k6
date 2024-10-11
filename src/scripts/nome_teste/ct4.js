import { check } from 'k6';
import http from 'k6/http';
import login from '../../shared/api-login/login.js';

/**
 * @see [Link para documentação do teste] (se aplicável)
 *
 * Caso de teste 4
 * Valida campos obrigatórios
 */
export default function () {
  // Simula login (substitua __ENV.USERNAME e __ENV.PASSWORD por placeholders)
  const token = login('USERNAME_PLACEHOLDER', 'PASSWORD_PLACEHOLDER');

  // Dados de pagamento incompletos (faltam dados obrigatórios)
  const incompletePaymentData = {};

  const response = http.post(
    // Substitua por URL genérica do endpoint de pagamento
    `${__ENV.SERVER}/v2/payment/create-payment`,
    JSON.stringify(incompletePaymentData),
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'content-type': "application/json",
        'accept': "application/json",
      },
    },
  );

  check(response, {
    'CT4: Código de resposta da criação do pagamento é 400': (response) => response.status === 400,
    'CT4: Verificação do erro na criação do pagamento': (response) => response.json('error') === "Bad Request",
    'CT4: CT4: Verificação da mensagem de erro - Dados do cartao de credito': (response) => response.json('message').some(message => message.includes('dados do cartao de credito')), // Check for message about credit card data
    'CT4: CT4: Verificação da mensagem de erro - Identificador fiscal': (response) => response.json('message').some(message => message.includes('identificador fiscal')), // Check for message about tax ID
    'CT4: CT4: Verificação da mensagem de erro - Identificador externo do provedor': (response) => response.json('message').some(message => message.includes('identificador externo do provedor')), // Check for message about provider external identifier
    'CT4: CT4: Verificação da mensagem de erro - Identificador do produto': (response) => response.json('message').some(message => message.includes('identificador do produto')), // Check for message about product UUID
    'CT4: CT4: Verificação da mensagem de erro - Identificador da variante': (response) => response.json('message').some(message => message.includes('identificador da variante')), // Check for message about variant UUID
    'CT4: CT4: Verificação da mensagem de erro - Quantidade de parcelas': (response) => response.json('message').some(message => message.includes('quantidade de parcelas')), // Check for message about installments quantity
    'CT4: CT4: Verificação da mensagem de erro - Chave de idempotencia': (response) => response.json('message').some(message => message.includes('chave de idempotencia')), // Check for message about idempotency key
    'CT4: CT4: Verificação do código de status': (response) => response.json('statusCode') === 400,
  });
}