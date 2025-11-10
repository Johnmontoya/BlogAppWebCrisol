import Mailgen from 'mailgen';

const mailGenerator = new Mailgen({
    theme: 'salted',
    product: {
        name: 'Crisol de ideas',
        link: 'crisolideas.website.com'
    }
})

export default mailGenerator;