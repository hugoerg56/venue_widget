require 'rubygems'
require 'sinatra'
require 'json'
require 'haml'
require 'uri'

begin
  # Require the preresolved locked set of gems.
  require ::File.expand_path('../.bundle/environment', __FILE__)
rescue LoadError
  # Fallback on doing the resolve at runtime.
  require "rubygems"
  require "bundler"
  Bundler.setup
end


  #-->> REQUIRE MODEL FILES
  #models = ['accounts', 'users', 'messages', 'rooms', 'invitacions']
  #models.each do |i|
  #  require File.dirname(__FILE__) + "/app/models/"+i+".rb"
  #end


class Arminder < Sinatra::Base

 #---------------------------- CONFIG ----------------------------  
  helpers do
    def partial(page)
      haml page, :layout => false
    end
  end
    
  set :public, File.join(File.dirname(__FILE__), 'public')
  set :views, File.join(File.dirname(__FILE__), '/app/views')
  
  configure do
    set :views, "#{File.dirname(__FILE__)}/app/views"
  end

  enable :sessions
 # //---------------------------- CONFIG ----------------------------


 #---------------------------- PAGES ----------------------------
 
 
  #-->> INDEX PAGE
  get '/' do 
    haml :index
  end



end #end






