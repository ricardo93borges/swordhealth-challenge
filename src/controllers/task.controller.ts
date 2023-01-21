import { Request, Response } from "express";
import { TaskService } from "../services/task.service";

export class TaskController {
  private taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  async get(req: Request, res: Response) {
    res.send("task");
  }

  async getById(req: Request, res: Response) {
    res.send("task id");
  }

  add = async (req: Request, res: Response): Promise<void> => {
    const { summary, date } = req.body;
    const user = JSON.parse(req.headers.user as string);

    const task = await this.taskService.add({ summary, date, user });
    res.send(task);
  };

  async update(req: Request, res: Response) {
    res.send("task");
  }
}
