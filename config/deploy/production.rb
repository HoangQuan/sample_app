set :rails_env, "production"
set :deploy_env, "production"
# Directories
set :deploy_to, "/usr/local/rails_apps/sample_app"
set :pid_file, "/tmp/unicorn_sample_app.pid"

role :web, "localhost"
role :app, "localhost"
role :db, "localhost", primary: true