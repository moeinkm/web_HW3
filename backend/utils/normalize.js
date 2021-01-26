const Normalize = {
    failedResponse: function (message) {
        return {data: "", message: message, status: "failed"}
    },
    successResponse: function (data, message) {
        return {data: data, message: message || "", status: "succeed"}
    },
};
exports.Normalize = Normalize;