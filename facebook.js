/*eslint valid-jsdoc: "off"*/
/*eslint-env es6*/
'use strict';

const request = require('request-promise-native');

module.exports = (app) => {
  const userFieldSet = 'name, link, is_verified, picture';
  const pageFieldSet = 'name, category, link, picture, is_verified';

  app.post('/facebook-search', (req, resp) => {
    const { queryTerm, searchType } = req.body;
    const options = {
      method: 'GET',
      uri: 'https://graph.facebook.com/search',
      qs: {
        access_token: 'EAAB5ZBueStrkBAFtGV8oLj8621UZCSa8al0ZCwD6qvMCLzdiJBeZA6j7OLj0eZAhW6UpzxSfDshHsbx2q5EmZAyWnp3u74IK6gR6e4EpUBEX5tdgNCIuYZCleavd8Dsj1VBbu7MyWYedt1OjZCeiL6lw4cuopLBBpAsTN8l9rA89hVlzcwIWpobOy1suCHSStPECcgB4PhTgaQZDZD',
        q: queryTerm,
        type: searchType,
        fields: searchType === 'page' ? pageFieldSet : userFieldSet
      }
    };

    request(options)
      .then(fbRes => {
        const parsedRes = JSON.parse(fbRes).data;
        resp.json(parsedRes);
      });
  });
};
