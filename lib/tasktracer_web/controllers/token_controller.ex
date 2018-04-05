defmodule TasktracerWeb.TokenController do
  use TasktracerWeb, :controller
  alias Tasktracer.Users.User

  action_fallback TasktracerWeb.FallbackController

  def create(conn, %{"name" => name, "pass" => pass}) do
    with {:ok, %User{} = user} <- Tasktracer.Users.get_and_auth_user(name, pass) do
      token = Phoenix.Token.sign(conn, "auth token", user.id)
      conn
      |> put_status(:created)
      |> render("token.json", user: user, token: token)
    end
  end
end
