require 'rubygems'
require 'test/unit'
require 'capybara'
require 'capybara/dsl'
require  File.expand_path('app')


class RivieraExperienceTest < Test::Unit::TestCase

  include Capybara

  def setup
    Website.destroy_all
    Capybara.app = RivieraExperience
  end

  def test_homepage
    visit '/'
  end

end
