const access = 'V1/access/'

export const environment = {
    production: false,
    name: 'qa',
    apiUrl: 'https://tcc-commons.bbogcreditocomercialtccqa.com/api-ldf/V1/validateInvoice',
    pdfUrl: 'https://tcc-commons.bbogcreditocomercialtccqa.com/api-ldf/V1/downloadPdfError',
    agreementsUrl:'https://tcc-commons.bbogcreditocomercialtccqa.com/api-ldf/V1/agreements',
    donwloadLiberaFile:'https://tcc-commons.bbogcreditocomercialtccqa.com/api-ldf/V1/downloadLiberaFile',
    calculateUrl:'https://tcc-commons.bbogcreditocomercialtccqa.com/api-ldf/V1/loaderInvoices',
    apiTasasUrl: 'https://tcc-commons.bbogcreditocomercialtccqa.com/api-ldf/V1/validateDate',
    _url: "https://tcc-commons.bbogcreditocomercialtccqa.com/api-ldf/",
    pathTasas:'V1/rates',
    pathLoadFiles:'V1/load',
    pathAgreements:'V1/agreements',
    pathDonwload:'V1/download',
    pathForbidden: access + 'forbidden',
    pathUnauthorized: access + 'unauthorized',
    pathNotFound: access + 'notFound',
    apiKey: 'X3oWP9qfhA2daUR79RfiDaoaOQvlzIEE9rwkS7Y9',
    recaptcha: {
        siteKey: '6LfHswAmAAAAAEaacuDEE5pi0aemqWLLsNd3zUcE'
      }
};
