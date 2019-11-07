defmodule Timesheet2.Sheets.Sheet do
  use Ecto.Schema
  import Ecto.Changeset

  schema "sheets" do
    field :approve, :boolean, default: false
    field :date, :date
    
    belongs_to :worker, Timesheet2.Users.User
    has_many :tasks, Timesheet2.Tasks.Task

    timestamps()
  end

  @doc false
  def changeset(sheet, attrs) do
    sheet
    |> cast(attrs, [:approve, :date, :worker_id])
    |> unique_constraint(:worker_id, name: :sheets_worker_id_date_index)
    |> validate_required([:approve, :date, :worker_id])
  end
end
