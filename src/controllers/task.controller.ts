import { Request, Response } from "express";
import { ErrorCode } from "../utils/error-codes";
import { TaskService } from "../services/task.service";

export class TaskController {
  private taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  get = async (req: Request, res: Response) => {
    const user = JSON.parse(req.headers.user as string);

    const tasks = await this.taskService.get(user);
    res.send(tasks);
  };

  async getById(req: Request, res: Response) {
    res.send("task id");
  }

  add = async (req: Request, res: Response): Promise<void> => {
    const { summary, date } = req.body;
    const user = JSON.parse(req.headers.user as string);

    const task = await this.taskService.add({ summary, date, user });
    res.status(201).send(task);
  };

  update = async (req: Request, res: Response) => {
    const { summary, status, date } = req.body;
    const id = req.params.id;
    const user = JSON.parse(req.headers.user as string);

    const task = await this.taskService.update(user, id, {
      summary,
      status,
      date,
    });

    if (task) {
      res.status(200).send(task);
    } else {
      res
        .status(404)
        .send({ error: ErrorCode.NOT_FOUND_ERROR, message: "not found" });
    }
  };
}
