defmodule TasktracerWeb.TaskController do
  use TasktracerWeb, :controller

  alias Tasktracer.Social
  alias Tasktracer.Social.Task
  alias Tasktracer.Users

  action_fallback TasktracerWeb.FallbackController

  def index(conn, _params) do
    tasks = Social.list_tasks()
    render(conn, "index.json", tasks: tasks)
  end

  def create(conn, %{"task" => task_params, "token" => token}) do
    {:ok, user_id} = Phoenix.Token.verify(conn, "auth token", token, max_age: 86400)
    if task_params["user_id"] != user_id do
      IO.inspect({:bad_match, task_params["user_id"], user_id})
      raise "hax!"
    end

    with {:ok, %Task{} = task} <- Social.create_task(task_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", task_path(conn, :show, task))
      |> render("show.json", task: task)
    end
  end

  def show(conn, %{"id" => id}) do
    task = Social.get_task!(id)
    render(conn, "show.json", task: task)
  end

  def update(conn, %{"id" => id, "task" => task_params, "user_id" => user_id}) do
    task = Social.get_task!(id)
    user = Users.get_user!(user_id)
    task_params = Map.put(task_params, "user", user)
    with {:ok, %Task{} = task} <- Social.update_task(task, task_params) do
      render(conn, "show.json", task: task)
    end
  end

  def delete(conn, %{"id" => id}) do
    task = Social.get_task!(id)
    with {:ok, %Task{}} <- Social.delete_task(task) do
      send_resp(conn, :no_content, "")
    end
  end
end
