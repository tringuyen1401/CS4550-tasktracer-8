defmodule TasktracerWeb.Router do
  use TasktracerWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", TasktracerWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/users", PageController, :index
    get "/users/:id", PageController, :index
    get "/tasks", PageController, :index
    get "/tasks/:id", PageController, :index
    get "/register", PageController, :index
  end

  # Other scopes may use custom stacks.
  scope "/api/v1", TasktracerWeb do
    pipe_through :api
    resources "/users", UserController, except: [:new, :edit]
    resources "/tasks", TaskController, except: [:new, :edit]        
    post "/token", TokenController, :create
    put "/tasks", TaskController, :update
    delete "/tasks/:id", TaskController, :delete
  end
end
