
FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginPdfPreview,
    );

const inputElement = document.querySelector("input[type='file']");
const pond = FilePond.create(inputElement);

pond.setOptions({
    allowPdfPreview: true,
    pdfPreviewHeight: 500,
    pdfComponentExtraParams: 'toolbar=0&view=fit&page=1'  
})