defmodule Timesheet2Web.SheetView do
  use Timesheet2Web, :view
  alias Timesheet2Web.SheetView

  def render("index.json", %{sheets: sheets}) do
    %{data: render_many(sheets, SheetView, "sheet.json")}
  end

  def render("show.json", %{sheet: sheet}) do
    %{data: render_one(sheet, SheetView, "sheet.json")}
  end

  def render("sheet.json", %{sheet: sheet}) do
    IO.inspect(sheet)
    %{id: sheet.id,
      approve: sheet.approve,
      date: sheet.date}
  end
end
