defmodule Timesheet2Web.SheetController do
  use Timesheet2Web, :controller

  alias Timesheet2.Sheets
  alias Timesheet2.Sheets.Sheet

  action_fallback Timesheet2Web.FallbackController

  plug Timesheet2Web.Plugs.RequireAuth when action in [:index, :create, :show, :approve]

  def index(conn, _params) do
    user = conn.assigns[:current_user]
    if user.manager_id do
      sheets = Sheets.list_sheets_worker(user.id)
      render(conn, "index.json", sheets: sheets)
    else
      sheets = Sheets.list_sheets_manager(user.id)
      render(conn, "index.json", sheets: sheets)
    end
  end

  def create(conn, %{"sheet" => sheet_params}) do
    with {:ok, %Sheet{} = sheet} <- Sheets.create_sheet(sheet_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.sheet_path(conn, :show, sheet))
      |> render("show.json", sheet: sheet)
    end
  end

  def show(conn, %{"id" => id}) do
    sheet = Sheets.get_sheet!(id)
    |> IO.inspect
    render(conn, "show.json", sheet: sheet)
  end

  def approve(conn, %{"id" => id}) do
    user = conn.assigns[:current_user]
    if !user.manager_id do
      sheet = Sheets.get_sheet!(id)
      with {:ok, %Sheet{} = sheet} <- Sheets.update_sheet(sheet, %{approve: true}) do
          render(conn, "show.json", sheet: sheet)
      end
    end
  end
end
