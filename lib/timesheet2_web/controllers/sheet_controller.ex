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

  def create(conn, %{"sheet" => %{
      "date" => date,
      "tasks" => tasks
    }}) do
    hours = tasks |> Enum.reduce(0, fn task, acc -> 
      case Integer.parse(task["spend_hours"], 10) do
        :error ->
          acc
        {i, _} -> if i > 0, do: acc + i, else: acc
      end
     end)
    if hours > 8 do 
      resp = %{errors: ["Cannot Exceed 8 Hours!"]}
      conn
      |> put_resp_header("content-type", "application/json; charset=UTF-8")
      |> send_resp(:not_acceptable, Jason.encode!(resp))
    else 
      user = conn.assigns[:current_user]
      if user.manager_id do
        with {:ok, %Sheet{} = sheet} <- Sheets.create_sheet(%{
            worker_id: user.id, 
            date: date,}) do
          tasks |> Enum.each(fn task -> 
            case Integer.parse(task["spend_hours"], 10) do
              {i, _} -> 
                if i > 0 do 
                  n = if task["note"] == "" do
                    "N/A"
                  else
                    task["note"]
                  end
                  Timesheet2.Tasks.create_task(%{
                    spend_hours: i,
                    note: n,
                    job_id: Timesheet2.Jobs.get_job_id_by_jobcode(task["job_code"]),
                    sheet_id: sheet.id
                  })
                end
              :error -> nil
            end
           end)
          sheet = Sheets.get_sheet(sheet.id)
          conn
          |> put_status(:created)
          |> put_resp_header("location", Routes.sheet_path(conn, :show, sheet))
          |> render("show.json", sheet: sheet)
        end
      else 
        resp = %{errors: ["Not a worker!"]}
        conn
        |> put_resp_header("content-type", "application/json; charset=UTF-8")
        |> send_resp(:not_acceptable, Jason.encode!(resp))
      end
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
