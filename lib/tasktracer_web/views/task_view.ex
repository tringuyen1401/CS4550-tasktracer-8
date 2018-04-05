defmodule TasktracerWeb.TaskView do
  use TasktracerWeb, :view
  alias TasktracerWeb.TaskView
  alias TasktracerWeb.UserView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      title: task.title,
      description: task.description,
      is_complete: task.is_complete,
      user: render_one(task.user, UserView, "user.json")
    }
  end
end
