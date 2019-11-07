defmodule Timesheet2Web.PageController do
  use Timesheet2Web, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
