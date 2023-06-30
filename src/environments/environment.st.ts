const access = 'V1/access/'

export const environment = {
    production: false,
    name: 'stage',
    apiUrl: 'https://tcc-commons.bbogcreditocomercialtccstg.com/api-ldf/V1/validateInvoice',
    pdfUrl: 'https://tcc-commons.bbogcreditocomercialtccstg.com/api-ldf/V1/downloadPdfError',
    agreementsUrl:'https://tcc-commons.bbogcreditocomercialtccstg.com/api-ldf/V1/agreements',
    donwloadLiberaFile:'https://tcc-commons.bbogcreditocomercialtccstg.com/api-ldf/V1/downloadLiberaFile',
    calculateUrl:'https://tcc-commons.bbogcreditocomercialtccstg.com/api-ldf/V1/loaderInvoices',
    apiTasasUrl: 'https://tcc-commons.bbogcreditocomercialtccstg.com/api-ldf/V1/validateDate',
    _url: "https://tcc-commons.bbogcreditocomercialtccstg.com/api-ldf/",
    pathTasas:'V1/rates',
    pathLoadFiles:'V1/load',
    pathAgreements:'V1/agreements',
    pathDonwload:'V1/download',
    pathForbidden: access + 'forbidden',
    pathUnauthorized: access + 'unauthorized',
    pathNotFound: access + 'notFound',
    apiKey: 'foXwwPbi7y9GSHqfdXa97177ZWiGHtd14CtDvtj0',
    recaptcha: {
        siteKey: '6LfHswAmAAAAAEaacuDEE5pi0aemqWLLsNd3zUcE'
      }
};

