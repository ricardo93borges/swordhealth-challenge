import { TaskService } from "../../src/services/task.service";
import { AMQP } from "../../src/amqp/amqp";
import { Role } from "../../src/models/user";
import { Status } from "../../src/models/task";

describe("TaskService", () => {
  describe("update", () => {
    it("should preform task update by a manager", async () => {
      const taskId = "1";
      const user = {
        id: "1",
        role: Role.MANAGER,
      };
      const updateTaskDTO = {
        summary: "summary",
        status: Status.FINISHED,
        date: "2023-01-21T22:42:42.475Z",
      };

      const task = { id: taskId, status: Status.PENDING };

      //@ts-ignore
      const taskRepository = {
        findOne: jest.fn().mockResolvedValue(task),
        update: jest.fn().mockResolvedValue(1),
      };
      //@ts-ignore
      const amqp = new AMQP();
      //@ts-ignore
      const taskService = new TaskService(taskRepository, amqp);

      amqp.send = jest.fn().mockResolvedValue(true);

      //@ts-ignore
      await taskService.update(user, taskId, updateTaskDTO);

      expect(taskRepository.findOne).toBeCalledWith({ where: { id: taskId } });
      expect(taskRepository.update).toBeCalledWith(
        { id: taskId },
        { ...updateTaskDTO }
      );
      expect(amqp.send).toBeCalledTimes(1);
    });

    it("should preform task update by a technician", async () => {
      const taskId = "1";
      const user = {
        id: "1",
        role: Role.TECHNICIAN,
      };
      const updateTaskDTO = {
        summary: "summary",
        status: Status.FINISHED,
        date: "2023-01-21T22:42:42.475Z",
      };

      const task = { id: taskId, status: Status.PENDING };

      //@ts-ignore
      const taskRepository = {
        findOne: jest.fn().mockResolvedValue(task),
        updateWithUser: jest.fn().mockResolvedValue(1),
      };
      //@ts-ignore
      const amqp = new AMQP();
      //@ts-ignore
      const taskService = new TaskService(taskRepository, amqp);

      amqp.send = jest.fn().mockResolvedValue(true);

      //@ts-ignore
      await taskService.update(user, taskId, updateTaskDTO);

      expect(taskRepository.findOne).toBeCalledWith({
        where: {
          id: taskId,
          "user.id": user.id,
        },
      });
      expect(taskRepository.updateWithUser).toBeCalledWith(taskId, user.id, {
        ...updateTaskDTO,
      });
      expect(amqp.send).toBeCalledTimes(1);
    });
  });
});
