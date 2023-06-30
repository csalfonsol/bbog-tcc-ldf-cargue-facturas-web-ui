const url = "http://localhost:8081"
const access = 'V1/access/'

export const environment = {
  production: false,
  name: 'development',
  apiUrl: url + '/V1/validateInvoice',
  pdfUrl: url + '/V1/downloadPdfError',
  agreementsUrl: url + '/V1/agreements',
  donwloadLiberaFile: url + '/V1/downloadLiberaFile',
  calculateUrl: url + '/V1/loaderInvoices',
  apiTasasUrl: url + '/V1/validateDate',
  _url: url + '/',
  pathTasas:'V1/rates',
  pathLoadFiles:'V1/load',
  pathAgreements:'V1/agreements',
  pathDonwload:'V1/download',
  pathForbidden: access + 'forbidden',
  pathUnauthorized: access + 'unauthorized',
  pathNotFound: access + 'notFound',
  apiKey: 'api_key_dev',
  recaptcha: {
    siteKey: '6LfHswAmAAAAAEaacuDEE5pi0aemqWLLsNd3zUcE'
  }
};
