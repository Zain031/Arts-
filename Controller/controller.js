const {
    Arts
} = require('../models');
const {
    Op
} = require("sequelize");

class Controller {
    static async readAllUser(req, res) {
        try {

            let title = req.query.title;
            let artist = req.query.artist

            console.log(title, artist);
            let opt = {};
            if (title || artist) {
                opt = {
                    where: {
                        name: {
                            [Op.iLike]: `%${title}%`,
                        },
                        artist: {
                            [Op.iLike]: `%${artist}%`,
                        }
                    }
                }
            }
            let count = await Arts.count({
                where: {
                    id: {
                        [Op.gt]: 0
                    }

                }
            })
            let NewstYear = await Arts.max('date')
            let OldestYear = await Arts.min('date')
            console.log(NewstYear);
            console.log(OldestYear);

            let data = await Arts.findAll(opt);
            res.render('home', {
                data,
                NewstYear,
                OldestYear,
                count
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    static addNewArt(req, res) {
        try {
            res.render('addArt');
        } catch (error) {
            console.log(error);
            res.send(error.message)
        }
    }
    static async submitForm(req, res) {
        try {
            let {
                name,
                artist,
                date,
                photo,
                artOrigin,
                description
            } = req.body;
            await Arts.create({
                name: name,
                artist: artist,
                date: date,
                photo: photo,
                placeOfOrigin: artOrigin,
                description: description

            });
            res.redirect('/');
        } catch (error) {
            res.send(error.message);
        }
    }
    static async update(req, res) {
        try {
            let data = await Arts.findAll({ //
                where: {
                    id: {
                        [Op.eq]: req.params.id
                    }
                }
            });
            data = data[0]
            // console.log(data);
            console.log("ini klik edit");
            res.render("viewDetail", {
                data
            })

        } catch (error) {
            console.log(error);
            res.send(error.message)
        }

    }
    static async deletedById(req, res) {
        try {

            let idParams = req.params.id;
            await Arts.destroy({
                where: {
                    id: idParams
                }
            });
            res.redirect('/');

        } catch (error) {
            res.send(error.message)

        }
    }
    static async submitUpdate(req, res) {
        try {
            console.log(req.body);
            let {
                name,
                artist,
                date,
                photo,
                artOrigin,
                description
            } = req.body;
            console.log("test");

            await Arts.update({
                name,
                artist,
                date,
                photo,
                artOrigin,
                description
            }, {
                where: {
                    id: req.params.id // req param untuk menarik
                }
            });

            console.log("Ini berhasil");
            res.redirect("/")


        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = Controller;