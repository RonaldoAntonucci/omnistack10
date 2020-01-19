const github = require('../Services/api_github');
const Dev = require('../Models/Dev');

const parseStringAsArray = require('../Utils/parseStringAsArray');

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();
    return res.json(devs);
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });
    if (!dev) {
      const {
        // eslint-disable-next-line no-undef
        data: { name = login, avatar_url, bio },
      } = await github.get(`/users/${github_username}`);

      const techsArray = parseStringAsArray(techs);

      const location = { type: 'Point', coordinates: [longitude, latitude] };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      });
    }

    return res.json(dev);
  },
};
