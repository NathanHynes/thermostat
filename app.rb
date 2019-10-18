require 'sinatra'
require 'sinatra/base'
require 'json'
require 'data_mapper'
require 'dm-postgres-adapter'
require 'dm-validations'
require 'dm-timestamps'
require_relative 'state.rb'

class Thermostat < Sinatra::Base
  enable :sessions

  get '/temperature' do
    headers 'Access-Control-Allow-Origin' => '*'


    @session = State.get(1)
    p @session
    { temp: @session.temp, power: @session.power }.to_json
  end

  post '/receive' do
    headers 'Access-Control-Allow-Origin' => '*'
    State.update(id: 1, temp:params[:temperature], power:params[:power])
  end

  DataMapper.setup(:default, ENV['DATABASE_URL'] || "postgres://localhost/thermostat")
  DataMapper.finalize
  DataMapper.auto_upgrade!
end
