defmodule Timesheet2.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :email, :string
      add :name, :string
      add :manager_id, references(:users), default: nil
      add :password_hash, :string, default: "", null: false

      timestamps()
    end

  end
end
