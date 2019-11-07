defmodule Timesheet2.Repo do
  use Ecto.Repo,
    otp_app: :timesheet2,
    adapter: Ecto.Adapters.Postgres
end
