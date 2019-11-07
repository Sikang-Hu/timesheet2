defmodule Timesheet2.Repo.Migrations.CreateJobs do
  use Ecto.Migration

  def change do
    create table(:jobs) do
      add :budget, :integer
      add :description, :text, default: "N/A"
      add :job_code, :string
      add :name, :string

      timestamps()
    end

  end
end
