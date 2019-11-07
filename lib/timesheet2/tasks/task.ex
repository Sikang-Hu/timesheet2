defmodule Timesheet2.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset

  schema "tasks" do
    field :note, :string
    field :spend_hours, :integer
    
    belongs_to :sheet, Timesheet2.Sheets.Sheet
    belongs_to :job, Timesheet2.Jobs.Job

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:note, :spend_hours, :sheet_id, :job_id])
    |> validate_required([:note, :spend_hours, :sheet_id, :job_id])
  end
end
