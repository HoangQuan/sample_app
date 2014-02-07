require "#{File.dirname(__FILE__)}/"

set :rails_env, "production"
set :deploy_env, "production"
# Directories
set :deploy_to, "/usr/local/rails_apps/sample_app"
set :pid_file, "/tmp/unicorn_sample_app.pid"

set :servers, get_ec2_targets("sample_app-production", !!ENV["OUT_OF_SERVICE"]).keys.to_a
role :web do servers end
role :app do servers end
role :db, primary: true do servers.first end
