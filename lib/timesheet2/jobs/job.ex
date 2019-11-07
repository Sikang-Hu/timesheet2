defmodule Timesheet2.Jobs.Job do
  use Ecto.Schema
  import Ecto.Changeset

  schema "jobs" do
    field :budget, :integer
    field :description, :string
    field :job_code, :string
    field :name, :string

    timestamps()
  end

  @doc false
  def changeset(job, attrs) do
    job
    |> cast(attrs, [:budget, :description, :job_code, :name])
    |> validate_required([:budget, :description, :job_code, :name])
  end
end
