import { check } from 'k6';
import { id } from "../libs/pagseguro-mp.js";

export default async function captureToken() {
    const encryptedCard = id.encryptCard({
        publicKey: "key-publica",
        holder: "Nome Sobrenome",
        number: "4539629959922097",
        expMonth: 12,
        expYear: 2000,
        securityCode: 124,
    });

    check(encryptedCard, {
        'CT-HASH: Created encrypted card error length 0': (encryptCard) => encryptCard.errors.length === 0,
        'CT-HASH: Created encrypted card has errors false': (encryptCard) => encryptCard.hasErrors === false,
        'CT-HASH: Created encrypted card has encryptedCard token': (encryptCard) => encryptCard.encryptedCard !== null,
    });
}
