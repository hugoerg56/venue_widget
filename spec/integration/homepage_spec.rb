require 'rubygems'
require 'test/unit'
require 'capybara'
require 'capybara/dsl'
require  File.expand_path('app')

class AarrrminderTest < Test::Unit::TestCase

  include Capybara

  def setup
    Website.destroy_all
    Capybara.app = Aarrrminder
  end

  def register_on_the_site
    visit '/'
    page.has_content?("Don't forget to track your metrics over time")
    fill_in "url", :with => "http://www.bakedweb.net"
    fill_in "email", :with => "ivan@bakedweb.net"
    click_on("Start tracking")
    assert_equal true, page.has_content?("THANK YOU")
  end

  def test_homepage
    register_on_the_site
  end

  def test_inserts_new_record_at_registering
    register_on_the_site
    assert_equal 1, Website.all.size
  end

end
