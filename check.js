const axios = require('axios');
const resultReq = async (d) => {
    try {
        const apiUrl = `http://localhost/wabot/api.php?d=${d}`;

        const response = await axios.get(apiUrl);
        return response.data;
        } catch (error) {
        throw new Error('Error fetching data from API: ' + error.message);
    }
};
module.exports = resultReq;
