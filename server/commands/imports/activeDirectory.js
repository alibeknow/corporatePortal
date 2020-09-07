/* Сервис импорта пользователей/групп из Active Directory */
import db from '../../config/sequelize';
import ActiveDirectoryService from '../../services/ActiveDirectory.service';
import logger from '../../config/winston/get-default-logger';
import RoleModel from '../../models/Role.model';
import UserModel from '../../models/User.model';
import HelperService from '../../services/HelperService';

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
      /* Создаем карту для быстрого доступа к группе по имени */
      const groupsMap = HelperService.createMapFromArray(groupInstances, 'name');

      /* Получаем всех пользователей группы ВКП Пользователи и импортируем их */
      const users = await client.getUsers();
      const userInstances = [];
      for (const { cn, sAMAccountName, mail } of users) {
        const [instance] = await UserModel.upsert({
          login: sAMAccountName,
          fio: cn,
          email: mail,
        }, { transaction });
        userInstances.push(instance);
      }

      /* Проходим по каждому пользователю и устанавливаем ему роли */
      for (const user of userInstances) {
        const userGroups = await client.getUserGroups(user.login);
        await user.setRoles(userGroups.map(({ cn }) => groupsMap[cn]?.id).filter(Boolean), { transaction });
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      logger.error(error);
    }
  },
  schedule: '*/5 * * * *', // every 5 minutes
  excludeEnv: ['development'],
};
