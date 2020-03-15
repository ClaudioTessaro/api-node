import Sequelize, { Model } from "sequelize";
import bycrypt from "bcryptjs";

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password_hash: Sequelize.STRING,
                password: Sequelize.VIRTUAL,
                provider: Sequelize.BOOLEAN,
            },
            {
                sequelize,
            }
        );
        // o hook são trechos de codigo que
        // são executados de forma automatica, baseado em ações que acontecem no
        // nosso model
        this.addHook("beforeSave", async user => {
            if (user.password) {
                user.password_hash = await bycrypt.hash(user.password, 8);
            }
        });

        return this;
    }

    static associate(models) {
        this.belongsTo(models.File, { foreignKey: "avatar_id", as: "avatar" });
    }

    checkPassword(password) {
        return bycrypt.compare(password, this.password_hash);
    }
}

export default User;
