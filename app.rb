require 'rubygems'
require 'sinatra'
require 'json'
require 'haml'
require 'uri'
require 'mongoid'

begin
  # Require the preresolved locked set of gems.
  require ::File.expand_path('../.bundle/environment', __FILE__)
rescue LoadError
  # Fallback on doing the resolve at runtime.
  require "rubygems"
  require "bundler"
  Bundler.setup

end

Mongoid.configure do |config|
  config.master = Mongo::Connection.new.db("aarrr")
end



class Website 
  include Mongoid::Document
end


class Aarrrminder < Sinatra::Base

  enable :sessions

  helpers do
    def partial(page)
      haml page, :layout => false
    end
    def erb_partial(page)
      erb page, :layout => false
    end
  end

  set :public, File.join(File.dirname(__FILE__), 'public')
  set :views, File.join(File.dirname(__FILE__), '/app/views')
  configure do
    set :views, "#{File.dirname(__FILE__)}/app/views"
  end

  get '/' do
    haml :index
  end

  get '/thankyou' do
    haml :thankyou
  end

  post '/thankyou' do
    website = Website.create(params)
    if website.save
      haml :thankyou
    else
      erb "There was an error"
    end
  end
end
