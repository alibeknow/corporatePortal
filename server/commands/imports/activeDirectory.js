/* Сервис импорта пользователей/групп из Active Directory */
import db from '../../config/sequelize';
import ActiveDirectoryService from '../../services/ActiveDirectory.service';
import logger from '../../config/winston/get-default-logger';
import RoleModel from '../../models/Role.model';

const client = new ActiveDirectoryService();

module.exports = {
  async task() {
    const transaction = await db.sequelize.transaction();
    try {
      const groups = await client.getGroups();
      /* Импортируем группы */
      const groupInstances = [];
      for (const { cn, description } of groups) {
        const [instance] = await RoleModel.upsert({
          name: cn,
          description,
        }, { transaction });
        groupInstances.push(instance);
      }


      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      logger.error(error);
    }
  },
  schedule: '*/5 * * * *', // every 5 minutes
  excludeEnv: ['local'],
};
