const ipRoutes = {
    "PROD": window.env?.VITE_CLOUD || import.meta.env.VITE_CLOUD,
    "LOCAL": window.env?.VITE_LOCAL ||  import.meta.env.VITE_LOCAL
};




// const baseUrl = ipRoutes[import.meta.env.VITE_ENVIRONMENT];

const baseUrl = ipRoutes[window.env?.VITE_ENVIRONMENT || import.meta.env.VITE_ENVIRONMENT];

const baseUrlMicroComment = ""

const baseUrlS3 = ""

const baseUrlMachineLearningPublication = ""

export {baseUrl,baseUrlMicroComment,baseUrlS3,baseUrlMachineLearningPublication};




