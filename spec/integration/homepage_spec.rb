require 'rubygems'
require 'test/unit'
require 'capybara'
require 'capybara/dsl'
require  File.expand_path('app')


class VenueWidgetTest < Test::Unit::TestCase

  include Capybara

  def setup
    Website.destroy_all
    Capybara.app = VenueWidget
  end

  def test_homepage
    visit '/'
  end

end
