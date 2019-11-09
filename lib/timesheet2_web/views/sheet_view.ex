defmodule Timesheet2Web.SheetView do
  use Timesheet2Web, :view
  alias Timesheet2Web.SheetView
  alias Timesheet2Web.TaskView
  alias Timesheet2Web.UserView

  def render("index.json", %{sheets: sheets}) do
    %{data: render_many(sheets, SheetView, "sheet.json")}
  end

  def render("show.json", %{sheet: sheet}) do
    %{data: render_one(sheet, SheetView, "sheet.json")}
  end

  def render("sheet.json", %{sheet: sheet}) do
    IO.inspect(sheet)
    %{id: sheet.id,
      worker: UserView.render("user.json", %{user: sheet.worker}),
      approve: sheet.approve,
      tasks: TaskView.render("index.json", %{tasks: sheet.tasks})[:data],
      date: sheet.date}
  end
end
