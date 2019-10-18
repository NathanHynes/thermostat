# frozen_string_literal: true

source "https://rubygems.org"

git_source(:github) {|repo_name| "https://github.com/#{repo_name}" }

# gem "rails"

ruby '2.6.3'
gem 'rubocop', '0.71.0'
gem 'sinatra'
gem 'rack'
gem 'data_mapper', '1.2.0'
gem 'dm-postgres-adapter'

group :test do
  gem 'rspec'
  gem 'simplecov', require: false
  gem 'simplecov-console', require: false
end
