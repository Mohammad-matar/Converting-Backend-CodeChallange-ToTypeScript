const axios = require("axios");

exports.validateNumber = async (number) => {
    let response = {};
    await axios
        .get(
            `https://phonevalidation.abstractapi.com/v1/?api_key=${process.env.API_KEY}&phone=${number}`
        )
        .then((res) => {
            if (res.data.valid) {
                response = {
                    status: 200,
                    countryCode: res.data.country.prefix,
                    countryName: res.data.country.name,
                    operatorName: res.data.carrier,
                };
            } else if (!res.data.valid) {
                response = {
                    status: 400,
                };
            }
            //request error
            if (res.error) {
                response = {
                    error: res.error.message,
                };
            }
        })
        //number not exist
        .catch((error) => {
            response = { status: error.status, error: error.message };
        });

    return response;
};
 