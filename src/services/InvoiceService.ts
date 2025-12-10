import ApiService from './ApiService'
import endpointConfig from '@/configs/endpoint.config'


export async function getInvoices(DateFilter) {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.Invoices,
        method: 'post',
        data: DateFilter,
    })
}
export async function getCustomerInvoices(DateFilter) {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.customerInvoices,
        method: 'post',
        data: DateFilter,
    })
}
export async function getSupplierInvoices(DateFilter) {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.supplierInvoices,
        method: 'post',
        data: DateFilter,
    })
}
export async function createCustomerPayment(paymentData) {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.customerPayments,
        method: 'post',
        data: paymentData,
    })
}

export async function createSupplierPayment(paymentData) {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.supplierPayments,
        method: 'post',
        data: paymentData,
    })
}

// services/InvoiceService.ts
export async function DownloadPDFForSupplierInvoice(invoiceId: string) {
  const blob = await ApiService.fetchDataWithAxios({
    url: `${endpointConfig.DownloadPDFForSupplierInvoice}/${invoiceId}`,
    method: 'GET',
    responseType: 'blob', // <= must reach axios
    headers: { Accept: 'application/pdf' },
  });
  // blob should be an actual Blob here if the wrapper returns res.data
  return blob as Blob;
}

export async function downloadCustomerInvoicePdf(invoiceId: string) {
  const blob = await ApiService.fetchDataWithAxios({
    url: `${endpointConfig.DownloadPDFForCustomerInvoice}/${invoiceId}`,
    method: 'GET',
    responseType: 'blob', // <= must reach axios
    headers: { Accept: 'application/pdf' },
  });
  // blob should be an actual Blob here if the wrapper returns res.data
  return blob as Blob;
}
// Customer invoice PDF endpoints
// export async function downloadCustomerInvoicePdf(invoiceId: string) {
//   return ApiService.fetchDataWithAxios({
//     url: `${endpointConfig.DownloadPDFForCustomerInvoice}/${invoiceId}`,
//     method: "GET",
//     responseType: "blob",
//     headers: { Accept: "application/pdf" },
//   });
// }

// export async function fetchCustomerInvoicePdfBlob(invoiceId: string): Promise<Blob> {
//   const res = await downloadCustomerInvoicePdf(invoiceId);
//   // Some axios wrappers put the blob on res.data; others return Blob directly.
//   const blob: Blob = res instanceof Blob ? res : (res?.data as Blob);
//   if (!(blob instanceof Blob)) throw new Error("Invalid PDF response");
//   return blob;
// }