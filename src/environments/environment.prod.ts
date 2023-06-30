const access = 'V1/access/'

export const environment = {
  production: true,
  name: 'production',
  apiUrl: 'https://tcc-commons.bbogcreditocomercial.com/api-ldf/V1/validateInvoice',
  pdfUrl: 'https://tcc-commons.bbogcreditocomercial.com/api-ldf/V1/downloadPdfError',
  agreementsUrl:'https://tcc-commons.bbogcreditocomercial.com/api-ldf/V1/agreements',
  donwloadLiberaFile:'https://tcc-commons.bbogcreditocomercial.com/api-ldf/V1/downloadLiberaFile',
  calculateUrl:'https://tcc-commons.bbogcreditocomercial.com/api-ldf/V1/loaderInvoices',
  apiTasasUrl: 'https://tcc-commons.bbogcreditocomercial.com/api-ldf/V1/validateDate',
  _url: "https://tcc-commons.bbogcreditocomercial.com/api-ldf/",
  pathTasas:'V1/rates',
  pathLoadFiles:'V1/load',
  pathAgreements:'V1/agreements',
  pathDonwload:'V1/download',
  pathForbidden: access + 'forbidden',
  pathUnauthorized: access + 'unauthorized',
  pathNotFound: access + 'notFound'
};
