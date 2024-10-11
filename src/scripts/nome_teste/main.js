import { NomeDescritivoPagseguroInstance } from "../libs/pagseguro-mp.js";
import pagSeguroIDCt1 from "./ct1.js";
import pagSeguroIDCt10 from "./ct10.js";
import pagSeguroIDCt11 from "./ct11.js";
import pagSeguroIDCt12 from "./ct12.js";
import pagSeguroIDCt2 from "./ct2.js";
import pagSeguroIDCt3 from "./ct3.js";
import pagSeguroIDCt4 from "./ct4.js";
import pagSeguroIDCt5 from "./ct5.js";
import pagSeguroIDCt6 from "./ct6.js";
import pagSeguroIDCt7 from "./ct7.js";
import pagSeguroIDCt8 from "./ct8.js";
import pagSeguroIDCt9 from "./ct9.js";

export default async function() {

    const publicKey = "keyhere";
    const holder = "Nome Sobrenome";

    const encryptCardData = {
        publicKey: publicKey,
        holder: holder,
        number: "4539620659922097",
        expMonth: 12,
        expYear: 20000,
        securityCode: 123,
    };

    let encryptCard = NomeDescritivoPagseguroInstance.encryptCard(encryptCardData);
    pagSeguroIDCt1(encryptCard.encryptedCard);

    encryptCard = NomeDescritivoPagseguroInstance.encryptCard(encryptCardData);
    pagSeguroIDCt2(encryptCard.encryptedCard);

    encryptCard = NomeDescritivoPagseguroInstance.encryptCard(encryptCardData);
    pagSeguroIDCt3(encryptCard.encryptedCard);
    pagSeguroIDCt4();
    pagSeguroIDCt5();

    encryptCard = NomeDescritivoPagseguroInstance.encryptCard(encryptCardData);
    pagSeguroIDCt6(encryptCard.encryptedCard);

    encryptCard = NomeDescritivoPagseguroInstance.encryptCard(encryptCardData);
    pagSeguroIDCt7(encryptCard.encryptedCard);

    encryptCard = NomeDescritivoPagseguroInstance.encryptCard(encryptCardData);
    pagSeguroIDCt8(encryptCard.encryptedCard);
    pagSeguroIDCt9(encryptCard.encryptedCard);
    pagSeguroIDCt10(encryptCard.encryptedCard);
    pagSeguroIDCt11(encryptCard.encryptedCard);
    pagSeguroIDCt12(encryptCard.encryptedCard);
};
