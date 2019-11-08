defmodule Timesheet2Web.Router do
  use Timesheet2Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end
  
  pipeline :ajax do
    plug :accepts, ["json"]
    plug :fetch_session
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end
  
  scope "/ajax", Timesheet2Web do
    pipe_through :ajax
    
    resources "/users", UserController, except: [:new, :edit]
    resources "/sheets", SheetController, except: [:new, :edit]
    resources "/tasks", TaskController, except: [:new, :edit]
    resources "/jobs", JobController, except: [:new, :edit]
    resources "/sessions", SessionController, only: [:create], singleton: true
  end

  scope "/", Timesheet2Web do
    pipe_through :browser
    
    get "/", PageController, :index
    get "/*path", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", Timesheet2Web do
  #   pipe_through :api
  # end
end
