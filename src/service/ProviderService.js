const Provider = require('../model/ProviderModel');
const AppError = require('../utils/AppError');
const {Op} = require('sequelize');

class ProviderService {

    static async store({ name, cnpj, email, phone, notes }) {
        try {
            const provider = await Provider.create({ name, cnpj, email, phone, notes });

            if (!provider) {
                throw new AppError('Error creating provider register: aborted', 500);
            }

            return provider;
        } catch (error) {
            console.log(error);
            throw error;
        }

    }

    static async index() {

        try {
            const providers = await Provider.findAll({
                attributes: ['id', 'name', 'cnpj', 'email', 'phone', 'notes'],
                order: [['createdAt', 'DESC']]
            });

            return providers;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async show(id) {

        try {

            const provider = await Provider.findByPk(id);

            if (!provider) {
                throw new AppError('Error: Provider not found', 404);
            }

            return provider;

        } catch (error) {
            console.log(error);
            throw error;
        }

    }

    static async update(id, providerToUpdate) {
        try {
            const provider = await Provider.findByPk(id);

            if (!provider) {
                throw new AppError('Error: Provider not found', 404);
            }

            const updated = await provider.update(providerToUpdate);

            return updated;

        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    //soft deletion using sequelize paranoid;
    static async softDelete(id) {

        try {
            const provider = await Provider.findByPk(id);

            if (!Provider) {
                throw new AppError('Provider not found', 404);
            }

            await provider.destroy();

            return true;

        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    static async deletedIndex() {
        try {
            const deleteds = await Provider.findAll({
                where: {
                    deletedAt: {
                        [Op.not]: null
                    }
                },
                paranoid: false
            });

            return deleteds;

        } catch (error) {
            throw error;
        }

    }

    static async restore(id) {

        try {
            const provider = await Provider.findByPk(id, { paranoid: false });

            if (!provider) {
                throw new AppError('Provider not found', 404);
            }

            await provider.restore();

            return provider;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}

module.exports = ProviderService;